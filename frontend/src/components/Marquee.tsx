import { Crown, Drop, Filling, Implant, Tooth } from "./icons";

const ITEMS = [
  { icon: Tooth, label: "Teeth Whitening", size: "size-6" },
  { icon: Implant, label: "Dental Impacts", size: "size-[22px]" },
  { icon: Filling, label: "Tooth Fillings", size: "h-[23px] w-[23px]" },
  { icon: Drop, label: "Tartar Removal", size: "h-[22px] w-[17px]" },
  { icon: Crown, label: "Crown and Bridges", size: "h-5 w-[23px]" },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-[60.5px] pr-[60.5px]" aria-hidden={hidden || undefined}>
      {ITEMS.map(({ icon: Icon, label, size }) => (
        <li key={label} className="flex items-center gap-2 whitespace-nowrap text-[20px] leading-6 text-ink-soft">
          <span className="flex size-6 items-center justify-center text-bronze">
            <Icon className={size} />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}

/** Endless strip of treatments. Motion.tsx loops it and lets scroll velocity push it along. */
export function Marquee() {
  return (
    <section aria-label="Treatments" className="overflow-hidden border-b line-light bg-paper">
      <div className="mx-auto max-w-[1200px] px-4 xl:px-0">
        <div data-marquee className="flex h-[116px] w-max items-center">
          <Row />
          <Row hidden />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
