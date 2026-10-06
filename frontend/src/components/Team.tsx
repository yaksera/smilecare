import Image from "next/image";
import { Container, Eyebrow } from "./ui";

const TEAM = [
  { name: "Dr. Marcus Chen, DDS", role: "Lead Dentist", image: "/images/dr-marcus.jpg", lead: true },
  { name: "Dr. Priyan Diah", role: "Dental Hygenist", image: "/images/dr-priyan.jpg", lead: false },
  { name: "Dr. Amar Bhosal", role: "General Dentist", image: "/images/dr-amar.jpg", lead: false },
  { name: "Dr. Sofia Dawkins", role: "Coordinator", image: "/images/dr-sofia.jpg", lead: false },
];

export function Team() {
  return (
    <section className="bg-mist pb-[114px] pt-24">
      <Container>
        <Eyebrow>THE PEOPLE WHO’LL TREAT YOU</Eyebrow>
        <h2 data-split className="mt-[13px] text-[40px] font-medium leading-[1.25] text-ink sm:text-[56px] sm:leading-[74px]">
          Experienced hands behind every treatment.
        </h2>
        <p data-reveal className="mt-[18px] text-[18px] leading-[26px] text-muted sm:text-[20px]">
          Our team combines clinical experience with modern techniques to make every treatment precise, comfortable,
          and considered.
        </p>

        <div data-stagger className="mt-[17px] grid grid-cols-2 items-end gap-6 lg:flex">
          {TEAM.map((m) => (
            <figure key={m.name} className={`group ${m.lead ? "col-span-2 lg:w-[384px]" : "lg:w-[244px]"}`}>
              <div
                data-clip
                className={`relative overflow-hidden ${m.lead ? "aspect-[384/431]" : "aspect-[244/288]"}`}
              >
                <Image quality={90}
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes={m.lead ? "(min-width: 1024px) 384px, 100vw" : "(min-width: 1024px) 244px, 50vw"}
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-[14px]">
                <p className="text-[16px] font-medium leading-5 text-ink">{m.name}</p>
                <p className="mt-[7px] text-[14px] leading-[17px] text-muted">{m.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
