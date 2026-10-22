/** Single source of truth for ProtoVinci's public contact details. */
export const CONTACT = {
  email: "protovincistudio@gmail.com",
  location: "Mumbai, India",
  /**
   * WhatsApp number in international format, digits only - no "+", spaces or dashes
   * (e.g. "919876543210" for +91 98765 43210). Leave empty to disable WhatsApp.
   */
  whatsapp: "",
} as const;

export interface EnquiryForm {
  name: string;
  email: string;
  alternativeContact: string;
  budget: string;
  description: string;
}

/** Budget ranges (INR). The contact form's dropdown and the enquiry message both read from this list. */
export const BUDGET_OPTIONS = [
  { value: "5000-7000", label: "₹5,000 - ₹7,000" },
  { value: "7000-10000", label: "₹7,000 - ₹10,000" },
  { value: "10000-15000", label: "₹10,000 - ₹15,000" },
  { value: "15000-20000", label: "₹15,000 - ₹20,000" },
  { value: "20000-above", label: "₹20,000+" },
] as const;

const BUDGET_LABELS: Record<string, string> = Object.fromEntries(
  BUDGET_OPTIONS.map(({ value, label }) => [value, label]),
);

/** Plain-text enquiry, shared by both channels so the team sees identical details. */
export function buildEnquiryText(form: EnquiryForm): string {
  return [
    "Hello ProtoVinci Team,",
    "",
    "I'd like to start a project:",
    "",
    `• Name: ${form.name}`,
    `• Email: ${form.email}`,
    `• Alternative contact: ${form.alternativeContact || "Not provided"}`,
    `• Budget: ${BUDGET_LABELS[form.budget] ?? "Not specified"}`,
    "",
    "Project description:",
    form.description.trim() || "N/A",
  ].join("\n");
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(form: EnquiryForm): string {
  const subject = `Project Request from ${form.name || "Client"}`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `${buildEnquiryText(form)}\n\nBest regards,\n${form.name}`,
  )}`;
}

/** How the enquiry left the site: delivered by us, or handed to the visitor's mail app. */
export type SendResult = "sent" | "draft";

/*
 * Delivered through FormSubmit (https://formsubmit.co): a free, keyless form-to-email relay,
 * so enquiries arrive even when the visitor has no mail app set up (mailto: silently does
 * nothing on most Windows/Brave/Chrome machines).
 *
 * One-time setup: the very first submission makes FormSubmit email an activation link to
 * CONTACT.email - click it once and every later enquiry is delivered straight to the inbox.
 */
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`;

export async function sendEnquiry(form: EnquiryForm, honeypot = ""): Promise<SendResult> {
  try {
    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      // Never leave the visitor stuck on "Sending…" if the relay stalls.
      signal: AbortSignal.timeout(15000),
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `New project request - ${form.name}`,
        _template: "table",
        _captcha: "false",
        _honey: honeypot, // bots fill hidden fields; FormSubmit drops those submissions
        Name: form.name,
        email: form.email, // lowercase "email" → FormSubmit sets it as Reply-To
        "Alternative contact": form.alternativeContact || "Not provided",
        Budget: BUDGET_LABELS[form.budget] ?? "Not specified",
        "Project description": form.description.trim() || "N/A",
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    if (res.ok && String(data.success) === "true") return "sent";
  } catch {
    // network error / blocked request → fall through to the mail-app draft
  }

  window.location.href = mailtoUrl(form);
  return "draft";
}
