import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Color =
  | "default"
  | "white"
  | "black"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "cyan"
  | "indigo"
  | "violet"
  | "rose"
  | "amber"
  | "lime"
  | "sky"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "fuchsia"
  | "emerald";

type SizeVariant = "sm" | "default" | "lg";

export interface PopButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  size?: SizeVariant;
  children: React.ReactNode;
  asChild?: boolean;
  /** Whether to roll string text up letter-by-letter on hover (default true) */
  roll?: boolean;
}

/** Standalone component for letter-by-letter roll effect on hover */
export const RollingText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => (
  <span className={cn("inline-flex items-center", className)}>
    <span className="sr-only">{text}</span>
    <span className="relative inline-flex overflow-hidden" aria-hidden="true">
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          className="hero-roll-letter relative inline-block whitespace-pre"
          style={{ transitionDelay: `${i * 18}ms` }}
        >
          <span className="block">{char}</span>
          <span className="absolute left-0 top-full block">{char}</span>
        </span>
      ))}
    </span>
  </span>
);

function transformRollChildren(node: React.ReactNode): React.ReactNode {
  if (typeof node === "string") {
    if (!node.trim()) return node;
    return <RollingText text={node} />;
  }
  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <React.Fragment key={i}>{transformRollChildren(child)}</React.Fragment>
    ));
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode; className?: string };
    if (typeof props?.children === "string" && !props.className?.includes("no-roll")) {
      return React.cloneElement(node, {
        ...props,
        children: <RollingText text={props.children} />,
      } as any);
    }
  }
  return node;
}

const PopButton = React.forwardRef<HTMLButtonElement, PopButtonProps>(
  (
    {
      className,
      color = "default",
      size = "default",
      children,
      asChild = false,
      roll = true,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const baseClasses =
      "font-pop pop-button group inline-flex select-none transition-all items-center justify-center whitespace-nowrap rounded-xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:border-b-2 active:scale-y-95 border-x-2 border-t-2 border-b-4 origin-bottom";

    const colors: Record<Color, string> = {
      default:
        "bg-white hover:bg-gray-50 border-neutral-300 text-neutral-900",
      white:
        "bg-white hover:bg-neutral-100 border-neutral-300 text-black shadow-sm",
      black:
        "bg-neutral-950 hover:bg-neutral-900 border-neutral-800 text-white shadow-sm",
      blue: "bg-blue-500 hover:bg-blue-600 border-blue-800 text-white",
      purple: "bg-purple-500 hover:bg-purple-600 border-purple-800 text-white",
      pink: "bg-pink-500 hover:bg-pink-600 border-pink-800 text-white",
      red: "bg-red-500 hover:bg-red-600 border-red-800 text-white",
      orange: "bg-orange-500 hover:bg-orange-600 border-orange-800 text-white",
      yellow: "bg-yellow-500 hover:bg-yellow-600 border-yellow-800 text-white",
      green: "bg-green-500 hover:bg-green-600 border-green-800 text-white",
      teal: "bg-teal-500 hover:bg-teal-600 border-teal-800 text-white",
      cyan: "bg-cyan-500 hover:bg-cyan-600 border-cyan-800 text-white",
      indigo: "bg-indigo-500 hover:bg-indigo-600 border-indigo-800 text-white",
      violet: "bg-violet-500 hover:bg-violet-600 border-violet-800 text-white",
      rose: "bg-rose-500 hover:bg-rose-600 border-rose-800 text-white",
      amber: "bg-amber-500 hover:bg-amber-600 border-amber-800 text-white",
      lime: "bg-lime-500 hover:bg-lime-600 border-lime-800 text-white",
      sky: "bg-sky-500 hover:bg-sky-600 border-sky-800 text-white",
      slate: "bg-slate-500 hover:bg-slate-600 border-slate-800 text-white",
      gray: "bg-gray-500 hover:bg-gray-600 border-gray-800 text-white",
      zinc: "bg-zinc-500 hover:bg-zinc-600 border-zinc-800 text-white",
      neutral:
        "bg-neutral-500 hover:bg-neutral-600 border-neutral-800 text-white",
      stone: "bg-stone-500 hover:bg-stone-600 border-stone-800 text-white",
      fuchsia:
        "bg-fuchsia-500 hover:bg-fuchsia-600 border-fuchsia-800 text-white",
      emerald:
        "bg-emerald-500 hover:bg-emerald-600 border-emerald-800 text-white",
    };

    const sizes = {
      sm: "h-9 px-2 py-1 text-sm",
      default: "h-10 px-4 py-2",
      lg: "h-14 px-8 py-3 text-lg",
    };

    const content = asChild || !roll ? children : transformRollChildren(children);

    return (
      <Comp
        ref={ref}
        className={cn(
          baseClasses,
          colors[color],
          sizes[size],
          className,
        )}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);

PopButton.displayName = "PopButton";

export { PopButton };
