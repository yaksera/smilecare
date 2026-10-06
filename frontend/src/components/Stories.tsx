"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Testimonial } from "@/lib/content";
import { ChevronCircleLeft, ChevronCircleRight, Star } from "./icons";
import { Container, Eyebrow } from "./ui";

export function Stories({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const slide = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const mounted = useRef(false);
  const current = testimonials[index];

  // Slide the new testimonial in from the side it was requested from (not on first render).
  useGSAP(
    () => {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      if (!slide.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const d = direction.current;
      gsap.fromTo(
        slide.current.children,
        { autoAlpha: 0, x: 40 * d },
        { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.06, ease: "power3.out" },
      );
      gsap.fromTo(photo.current, { clipPath: d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0%)", duration: 1, ease: "power4.inOut" });
    },
    { dependencies: [index], revertOnUpdate: false },
  );

  const go = (step: number) => {
    if (testimonials.length < 2) {
      // Only one story published: acknowledge the click with a small nudge.
      gsap.fromTo(slide.current, { x: step * 10 }, { x: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      return;
    }
    direction.current = step;
    setIndex((i) => (i + step + testimonials.length) % testimonials.length);
  };

  return (
    <section id="reviews" className="border-t line-light bg-paper pb-[113px] pt-24">
      <Container className="grid gap-10 lg:grid-cols-[588px_588px] lg:gap-6">
        <div>
          <Eyebrow>Patient Stories</Eyebrow>
          <h2 data-split className="mt-[13px] text-[40px] font-medium leading-[1.25] text-ink sm:text-[56px] sm:leading-[74px]">
            Results patients feel
            <br />
            good about.
          </h2>

          <div ref={slide} aria-live="polite">
            <p className="mt-[66px] text-[14px] font-medium leading-[17px] text-muted">{current.treatment}</p>
            <div className="mt-[38px] flex items-center gap-[17px]">
              <div className="flex gap-[3.4px] text-bronze" aria-label={`${current.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`h-[21.5px] w-[22.6px] ${i < current.rating ? "" : "opacity-25"}`} />
                ))}
              </div>
              <span className="text-[18px] leading-[22px] text-muted">{current.rating.toFixed(1)} / 5.0</span>
            </div>
            <blockquote className="mt-[37px] max-w-[600px] text-[18px] leading-[26px] text-ink sm:text-[20px]">
              {current.quote}
            </blockquote>
            <p className="mt-[37px] text-[18px] font-medium leading-[22px] text-ink">{current.name}</p>
            <p className="mt-[5px] text-[16px] leading-5 text-muted">{current.role}</p>
          </div>

          <div className="mt-[39px] flex gap-[18px] text-bronze">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous story"
              className="transition-transform duration-300 hover:-translate-x-1"
            >
              <ChevronCircleLeft className="size-[34px]" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next story"
              className="transition-transform duration-300 hover:translate-x-1"
            >
              <ChevronCircleRight className="size-[34px]" />
            </button>
          </div>
        </div>

        <div data-clip data-parallax className="relative aspect-[588/690] overflow-hidden">
          <div ref={photo} className="absolute inset-0">
            <Image quality={90}
              src={current.image}
              alt={current.name}
              fill
              sizes="(min-width: 1024px) 588px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
