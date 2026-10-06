import Image from "next/image";
import { PHONE_HREF } from "@/lib/content";
import { Calendar, PhoneRing, StarBurst } from "./icons";
import { Container, RollText } from "./ui";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink lg:h-[985px]">
      <div data-hero-bg className="absolute inset-0">
        <Image quality={90}
          src="/images/hero.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-[70%_center] lg:object-center"
        />
        {/* Phones crop away the photo's built-in left gradient, so darken it for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink/85 lg:hidden" />
      </div>

      <Container className="relative pb-24 pt-[180px] lg:pb-0 lg:pt-[265px]">
        <p data-hero className="flex items-center gap-2 text-[14px] font-medium leading-[17px] text-silver">
          <span data-hero-line className="h-px w-6 origin-left bg-bronze" aria-hidden />
          DENTAL TREATMENTS
        </p>

        <h1 data-hero-title className="mt-[20px] text-[40px] font-medium leading-[1.25] text-white sm:text-[56px] sm:leading-[74px]">
          Repair your smile.
          <br />
          Restore your confidence.
        </h1>

        <p data-hero className="mt-[25px] max-w-[520px] text-[18px] leading-[26px] text-silver sm:text-[20px]">
          From whitening and fillings to implants, veneers, and crowns, we provide modern dental treatments designed
          around the result you want.
        </p>

        <div data-hero-group className="mt-[25px] flex flex-wrap items-start gap-[15px]">
          <a
            href="#book"
            data-book
            data-magnetic
            className="group flex h-12 w-[214px] items-center gap-[11px] bg-paper pl-3 text-[16px] font-medium leading-[21px] text-ink"
          >
            <RollText>Book an appoinment</RollText>
            <Calendar className="ml-auto mr-[15px] h-5 w-[18px] transition-transform duration-500 group-hover:-rotate-12" />
          </a>
          <div className="flex flex-col items-center">
            <a
              href={PHONE_HREF}
              data-magnetic
              className="group flex h-[52px] w-[180px] items-center gap-[9px] border line-dark pl-[14px] text-[16px] font-medium leading-[21px] text-ivory transition-colors hover:bg-ivory/10"
            >
              <RollText>Emergency Call</RollText>
              <PhoneRing className="size-[23.5px] group-hover:animate-[ring_0.6s_ease-in-out]" />
            </a>
            <p className="mt-[3px] text-[14px] leading-[17px] text-silver">Emergency Call Available</p>
          </div>
        </div>

        <div className="mt-[23px] flex items-center gap-[25px]">
          <div data-hero-group className="flex">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`relative size-[46px] overflow-hidden rounded-full border-2 border-paper ${i > 0 ? "-ml-3" : ""}`}
              >
                <Image quality={90} src="/images/avatar.jpg" alt="" fill sizes="46px" className="object-cover" />
              </span>
            ))}
          </div>
          <div>
            <div data-hero-group className="flex gap-[5.4px] text-bronze" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarBurst key={i} className="size-[21px]" />
              ))}
            </div>
            <p data-hero className="mt-[6px] text-[14px] leading-[17px] text-silver">
              <span data-count="4.9" data-decimals="1">4.9</span> average rating from{" "}
              <span data-count="1200" data-format="comma">1,200</span>+ patients
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
