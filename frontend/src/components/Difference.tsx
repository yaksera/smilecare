import Image from "next/image";
import { CameraSparkle, Chat, Clipboard, Scan } from "./icons";
import { Eyebrow } from "./ui";

const STEPS = [
  { icon: <Chat className="h-[18px] w-5" />, label: "01 — Initial consultation" },
  { icon: <Scan className="size-[23px]" />, label: "02 — Digital diagnostics" },
  { icon: <Clipboard className="h-[22px] w-5" />, label: "03 — Personalized treatment plans" },
  { icon: <CameraSparkle className="h-[22px] w-[22px]" />, label: "04 — Natural-looking results" },
];

export function Difference() {
  return (
    <section id="why-us" className="bg-ink py-20 lg:py-[120px]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 lg:grid-cols-[588px_588px] lg:gap-6 xl:px-0">
        <div data-clip data-parallax className="relative aspect-[588/690] overflow-hidden">
          <Image quality={90}
            src="/images/difference.jpg"
            alt="Smiling patient talking with her dentist"
            fill
            sizes="(min-width: 1024px) 588px, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <Eyebrow tone="dark">THE DIFFERENCE</Eyebrow>
          <h2 data-split className="mt-[13px] text-[40px] font-medium leading-[1.25] text-ivory sm:text-[56px] sm:leading-[74px]">
            Modern treatments,
            <br />
            thoughtful care.
          </h2>
          <p data-reveal className="mt-[17px] max-w-[580px] text-[18px] leading-[26px] text-silver sm:text-[20px]">
            From a simple filling to a complete smile restoration, every treatment starts with understanding what your
            teeth need and what you want to achieve.
          </p>
          <ul data-stagger data-stagger-from="left" className="mt-[19px] space-y-5">
            {STEPS.map((s) => (
              <li key={s.label} className="flex h-5 items-center text-[14px] font-medium leading-[17px] text-white">
                <span className="flex w-6 justify-center text-ivory">{s.icon}</span>
                <span className="ml-[43px]">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
