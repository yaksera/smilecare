/** Label that rolls up on hover, revealing an identical copy (designed in the Figma as stacked text). */
export function RollText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`roll ${className}`}>
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

/** Section eyebrow: short bronze rule followed by a small caps label. */
export function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      data-eyebrow
      className={`flex items-center gap-2 text-[14px] font-medium leading-[17px] ${tone === "dark" ? "text-ivory" : "text-muted"}`}
    >
      <span data-eyebrow-line className="h-px w-6 origin-left bg-bronze" aria-hidden />
      {children}
    </p>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 xl:px-0 ${className}`}>{children}</div>;
}
