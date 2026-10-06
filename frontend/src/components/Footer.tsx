import Image from "next/image";
import { ADDRESS, EMAIL, PHONE_DISPLAY_ALT, PHONE_HREF } from "@/lib/content";
import { Container, RollText } from "./ui";

const COLUMNS = [
  {
    title: "Services",
    gap: "gap-[18px]",
    first: "mt-[18px]",
    width: "lg:w-[166px]",
    links: [
      { label: "Teeth Whitening", href: "#services" },
      { label: "Dental Implants", href: "#services" },
      { label: "Tooth Fillings", href: "#services" },
      { label: "Tartar Removal", href: "#services" },
      { label: "Crowns & Bridges", href: "#services" },
      { label: "Veneers", href: "#services" },
    ],
  },
  {
    title: "Studio",
    gap: "gap-[19px]",
    first: "mt-[19px]",
    width: "lg:w-[166px]",
    links: [
      { label: "Services", href: "#services" },
      { label: "Why US", href: "#why-us" },
      { label: "Reviews", href: "#reviews" },
      { label: "Book Appointment", href: "#book" },
      { label: "FAQ", href: "#faqs" },
    ],
  },
  {
    title: "Contact Us",
    gap: "gap-[17px]",
    first: "mt-[17px]",
    width: "lg:w-[170px]",
    links: [
      { label: PHONE_DISPLAY_ALT, href: PHONE_HREF },
      { label: EMAIL, href: `mailto:${EMAIL}` },
      { label: ADDRESS, href: "https://maps.google.com/?q=Newroad,Kathmandu" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t line-dark bg-ink pb-[62px] pt-16">
      <Container>
        <div data-stagger className="flex flex-col gap-10 lg:flex-row lg:gap-0">
          <div className="lg:flex-1">
            <Image quality={90} src="/images/logo.png" alt="Smile Care" width={176} height={88} className="-ml-8 -mt-4" />
            <p className="-mt-[18px] max-w-[310px] text-[12px] leading-4 text-silver">
              A boutique dental studio delivering gentle, modern care since 2025.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className={col.width}>
              <h3 className="text-[16px] font-medium leading-5 text-[#fbfbfb]">{col.title}</h3>
              <ul className={`${col.first} flex flex-col ${col.gap}`}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="group block w-fit text-[14px] leading-[17px] text-silver hover:text-ivory">
                      <RollText>{l.label}</RollText>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t line-dark pt-[27px] text-center text-[14px] leading-[17px] text-ivory">
          © 2026 Smile Care. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
