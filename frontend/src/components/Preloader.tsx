import Image from "next/image";

/** Intro curtain. Only shown when JS runs with motion allowed; Motion.tsx counts it up and lifts it. */
export function Preloader() {
  return (
    <div data-preloader className="fixed inset-0 z-[100] hidden flex-col items-center justify-center bg-ink" aria-hidden>
      <Image quality={90} data-preloader-logo src="/images/logo.png" alt="" width={224} height={112} preload />
      <div className="mt-6 h-px w-40 overflow-hidden bg-ivory/15">
        <div data-preloader-bar className="h-full origin-left bg-bronze" />
      </div>
      <span data-preloader-count className="mt-4 text-[12px] font-medium tracking-[0.3em] text-silver tabular-nums">
        000
      </span>
    </div>
  );
}

/** Thin bronze reading-progress line along the top edge. */
export function ProgressBar() {
  return <div data-progress className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-bronze" aria-hidden />;
}
