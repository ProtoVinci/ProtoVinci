import { useLocation, useNavigate } from "react-router-dom";
import { scrollToTarget } from "@/lib/scroll";

export const CONTACT_FORM_ID = "contact-form";

/**
 * CTA handler for "Book a call" / "Get started" buttons.
 * Already on /contact → glide to the form. Elsewhere → open /contact scrolled to the form
 * (the router's ScrollManager resolves the hash once the lazy page mounts).
 */
export function useGoToContactForm() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return () => {
    if (pathname === "/contact") scrollToTarget(`#${CONTACT_FORM_ID}`);
    else navigate(`/contact#${CONTACT_FORM_ID}`);
  };
}
