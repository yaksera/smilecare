import Image from "next/image";
import { ArrowRight, Drop, Filling, Implant, Tooth } from "./icons";
import { Container, Eyebrow, RollText } from "./ui";

type Service = {
  index: string;
  title: string;
  body: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  icon: React.ReactNode;
};

const ROW_ONE: Service[] = [
  {
    index: "01",
    title: "Teeth Whitening",
    body: "Professional whitening that safely lifts stains and reveals a brighter, more confident smile.",
    image: "/images/whitening.jpg",
    imageWidth: 588,
    imageHeight: 442,
    icon: <Tooth className="size-5" />,
  },
  {
    index: "02",
    title: "Dental Implants",
    body: "Replace missing teeth with durable, natural-looking implants designed for everyday life.",
    image: "/images/implants.jpg",
    imageWidth: 614,
    imageHeight: 298,
    icon: <Implant className="size-5" />,
  },
];

const ROW_TWO: Service[] = [
  {
    index: "03",
    title: "Tooth Fillings",
    body: "Repair cavities and minor damage with tooth-colored fillings that restore strength and blend naturally.",
    image: "/images/fillings.jpg",
    imageWidth: 588,
    imageHeight: 442,
    icon: <Filling className="size-5" />,
  },
  {
    index: "04",
    title: "Tartar Removal",
    body: "Remove built-up plaque and tartar to support healthier gums and a cleaner smile.",
    image: "/images/tartar.jpg",
    imageWidth: 588,
    imageHeight: 285,
    icon: <Drop className="h-5 w-[15px]" />,
  },
];

function ServiceCard({ s }: { s: Service }) {
  return (
    <article data-tilt className="group bg-white will-change-transform [transform-style:preserve-3d]">
      {/* Before/after comparison: Motion.tsx wipes the cover away from the divider to reveal the result */}
      <div
        data-compare
        className="relative overflow-hidden"
        style={{ aspectRatio: `${s.imageWidth} / ${s.imageHeight}` }}
      >
        <Image quality={90}
          src={s.image}
          alt={`${s.title} before and after`}
          fill
          sizes={`(min-width: 1280px) ${s.imageWidth}px, (min-width: 768px) 50vw, 100vw`}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span data-compare-cover className="absolute inset-y-0 right-0 w-1/2 origin-right bg-white" aria-hidden />
      </div>

      <div className="px-6 pb-6 pt-[11px]">
        <div className="flex items-center gap-[7px]">
          <span className="flex size-5 items-center justify-center text-bronze">{s.icon}</span>
          <span className="flex size-[38px] items-center justify-center border line-light text-[20px] leading-6 text-bronze">
            {s.index}
          </span>
        </div>
        <h3 className="mt-2 text-[22px] font-medium leading-[28px] text-ink-soft">{s.title}</h3>
        <p className="mt-[11px] text-[14px] leading-[18px] text-muted">{s.body}</p>
        <a href="#book" data-book className="mt-[23px] flex w-fit items-center gap-3 text-[14px] font-medium leading-5 text-bronze">
          <RollText>Learn More</RollText>
          <ArrowRight className="h-[14px] w-[18px] transition-transform duration-500 group-hover:translate-x-1.5" />
        </a>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-paper pb-6 pt-6">
      <Container>
        <Eyebrow>OUR SERVICES</Eyebrow>
        <div className="mt-[21px] flex flex-col gap-6 lg:flex-row lg:justify-between">
          <h2 data-split className="max-w-[770px] text-[40px] font-medium leading-[1.25] text-ink sm:text-[56px] sm:leading-[74px]">
            Treatments designed around your smile.
          </h2>
          <p data-reveal className="max-w-[413px] text-[18px] leading-[26px] text-muted sm:text-[20px] lg:mt-[24px] lg:shrink-0">
            From everyday repairs to complete smile improvements, our treatments are designed to restore function,
            improve appearance, and help you feel confident again.
          </p>
        </div>

        <div data-stagger className="mt-[25px] grid items-start gap-6 md:grid-cols-2 xl:-ml-[13px] xl:grid-cols-[588px_614px]">
          {ROW_ONE.map((s) => (
            <ServiceCard key={s.index} s={s} />
          ))}
        </div>
        <div data-stagger className="mt-6 grid items-start gap-6 md:grid-cols-2 xl:grid-cols-[588px_588px]">
          {ROW_TWO.map((s) => (
            <ServiceCard key={s.index} s={s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
