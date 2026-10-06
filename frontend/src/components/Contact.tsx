import Image from "next/image";
import { ADDRESS, EMAIL, HOURS, PHONE_DISPLAY_ALT, PHONE_HREF } from "@/lib/content";
import { ArrowRight, CalendarCheck, Clock, Mail, PhoneOutline, Pin } from "./icons";
import { Eyebrow, RollText } from "./ui";

const CHIPS = ["Teeth Whitening", "Dental Implants", "Tooth Fillings", "Veeners", "Tartar Removals", "Crowns & Bridges"];

const DETAILS = [
  { icon: <PhoneOutline className="size-6" />, text: PHONE_DISPLAY_ALT, href: PHONE_HREF, strong: false },
  { icon: <Mail className="h-5 w-[22px]" />, text: EMAIL, href: `mailto:${EMAIL}`, strong: false },
  { icon: <Pin className="size-6" />, text: ADDRESS, href: "https://maps.google.com/?q=Newroad,Kathmandu", strong: false },
  { icon: <Clock className="size-6" />, text: HOURS, href: null, strong: true },
];

export function Contact() {
  return (
    <section id="contact" className="bg-ink py-20 lg:py-[120px]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 lg:grid-cols-[588px_588px] lg:gap-6 xl:px-0">
        <div>
          <Eyebrow tone="dark">GET IN TOUCH</Eyebrow>
          <h2 data-split className="mt-[13px] text-[40px] font-medium leading-[1.25] text-ivory sm:text-[56px] sm:leading-[74px]">
            Ready to improve
            <br />
            your smile?
          </h2>
          <p data-reveal className="mt-[17px] max-w-[580px] text-[18px] leading-[26px] text-silver sm:text-[20px]">
            Whether you need a simple repair, want to brighten your smile, or are considering a more complete
            restoration, we’re here to help you find the right treatment.
          </p>

          <ul data-stagger data-stagger-from="left" className="mt-[18px] space-y-5">
            {DETAILS.map((d) => {
              const label = (
                <span className={`ml-[43px] text-[14px] leading-[17px] ${d.strong ? "text-ivory" : "text-silver"}`}>{d.text}</span>
              );
              return (
                <li key={d.text} className="flex h-5 items-center">
                  <span className="flex w-6 justify-center text-ivory">{d.icon}</span>
                  {d.href ? (
                    <a href={d.href} className="transition-colors hover:text-ivory [&>span]:hover:text-ivory">
                      {label}
                    </a>
                  ) : (
                    label
                  )}
                </li>
              );
            })}
          </ul>

          <div data-reveal className="mt-4 flex flex-wrap items-center gap-[23px]">
            <a
              href="#book"
              data-book
              data-magnetic
              className="group flex h-11 w-[196px] items-center gap-[11px] bg-paper pl-[10px] text-[14px] font-medium leading-5 text-ink"
            >
              <RollText>Book an appointment</RollText>
              <CalendarCheck className="ml-auto mr-[13px] h-5 w-[18px] transition-transform duration-500 group-hover:-rotate-12" />
            </a>
            <a
              href={PHONE_HREF}
              data-magnetic
              className="group flex h-12 items-center gap-3 border line-dark pl-3 pr-[15px] text-[14px] font-medium leading-5 text-ivory transition-colors hover:bg-ivory/10"
            >
              <RollText>Emergency Call</RollText>
              <ArrowRight className="h-[14px] w-[18px] transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>

          <ul data-stagger className="-ml-px mt-[14px] flex max-w-[540px] flex-wrap gap-[6px]">
            {CHIPS.map((c) => (
              <li key={c}>
                <a
                  href="#services"
                  className="group flex h-[38px] items-center rounded-full border line-dark px-[10px] text-[12px] font-medium leading-[18px] text-ivory transition-colors hover:border-bronze hover:bg-bronze/15"
                >
                  <RollText>{c}</RollText>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div data-clip data-parallax className="relative aspect-[588/690] overflow-hidden">
          <Image quality={90}
            src="/images/clinic.jpg"
            alt="Smile Care clinic entrance at dusk"
            fill
            sizes="(min-width: 1024px) 588px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
