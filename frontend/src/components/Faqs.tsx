"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { EMAIL, type Faq } from "@/lib/content";
import { ArrowRight, Minus, Plus } from "./icons";
import { Container, Eyebrow, RollText } from "./ui";

function FaqItem({ faq, first, defaultOpen }: { faq: Faq; first: boolean; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panel = useRef<HTMLDivElement>(null);
  const icon = useRef<HTMLSpanElement>(null);
  const mounted = useRef(false);

  useGSAP(
    () => {
      if (!mounted.current) {
        mounted.current = true;
        return; // first render matches the design: no animation
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.to(panel.current, {
        height: open ? "auto" : 0,
        duration: reduce ? 0 : 0.6,
        ease: "power3.inOut",
        onComplete: () => window.dispatchEvent(new Event("resize")), // let ScrollTrigger re-measure
      });
      gsap.fromTo(icon.current, { rotate: open ? -90 : 90 }, { rotate: 0, duration: reduce ? 0 : 0.5, ease: "back.out(2)" });
    },
    { dependencies: [open], revertOnUpdate: false },
  );

  const id = faq.question.replace(/\W+/g, "-").toLowerCase();

  return (
    <div className={`border-b line-light pb-[42px] ${first ? "" : "pt-10"}`}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-6 text-left text-[18px] leading-6 text-ink transition-colors hover:text-bronze sm:text-[20px]"
        >
          {faq.question}
          <span ref={icon} className="mr-[5px] flex size-4 shrink-0 items-center justify-center">
            {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
          </span>
        </button>
      </h3>
      <div id={id} ref={panel} className="overflow-hidden" style={{ height: defaultOpen ? "auto" : 0 }}>
        <p className="pt-6 text-[16px] leading-[23px] text-muted sm:text-[18px]">{faq.answer}</p>
      </div>
    </div>
  );
}

export function Faqs({ faqs }: { faqs: Faq[] }) {
  return (
    <section id="faqs" className="bg-mist pb-[114px] pt-24">
      <Container className="grid gap-12 lg:grid-cols-[460px_690px] lg:justify-between">
        <div>
          <Eyebrow>COMMON QUESTIONS</Eyebrow>
          <h2 data-split className="mt-[13px] text-[40px] font-medium leading-[1.25] text-ink sm:text-[56px] sm:leading-[74px]">
            Questions before
            <br />
            you book?
          </h2>
          <p data-reveal className="mt-[17px] text-[18px] leading-[26px] text-muted sm:text-[20px]">
            Still have a question? Reach out and a real person from our front desk will get back to you the same day.
          </p>
          <a
            data-reveal
            data-magnetic
            href={`mailto:${EMAIL}`}
            className="group -ml-px mt-4 inline-flex h-[52px] items-center gap-3 border line-light pl-[13px] pr-[17px] text-[16px] font-medium leading-[21px] text-ink transition-colors hover:bg-ink hover:text-ivory"
          >
            <RollText>Ask Us Anything</RollText>
            <ArrowRight className="h-[14px] w-[18px] transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>

        <div data-stagger className="lg:pt-10">
          {faqs.map((f, i) => (
            <FaqItem key={f.question} faq={f} first={i === 0} defaultOpen={f.openByDefault} />
          ))}
        </div>
      </Container>
    </section>
  );
}
