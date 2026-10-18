import React from "react";

/** Small uppercase eyebrow (▪ LABEL) used above section headlines. */
export const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 select-none">
    <span className="w-1.5 h-1.5 rounded-[1px] bg-black inline-block" aria-hidden="true" />
    <span className="text-[11.5px] sm:text-[12px] uppercase font-[650] tracking-[0.22em] text-black">{children}</span>
  </div>
);

export default SectionLabel;
