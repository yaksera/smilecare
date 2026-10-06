"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

const EASE = "power3.out";
const ANCHOR_OFFSET = 80;

/**
 * Smooth scrolling plus every animation on the page, declared through data attributes:
 * data-preloader, data-hero*, data-eyebrow, data-split, data-reveal, data-stagger, data-clip,
 * data-parallax, data-compare, data-marquee, data-tilt, data-magnetic, data-count, data-progress.
 * All of it is skipped for prefers-reduced-motion.
 */
export function Motion({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", (ctx) => {
        const smoother = ScrollSmoother.create({
          wrapper: wrapper.current!,
          content: content.current!,
          smooth: 1.1,
          smoothTouch: 0.1,
        });
        smoother.paused(true); // locked until the preloader lifts

        const onClick = (e: MouseEvent) => {
          const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
          if (!link || link.hasAttribute("data-book")) return;
          const target = link.hash.length > 1 ? document.querySelector(link.hash) : null;
          if (!target) return;
          e.preventDefault();
          smoother.scrollTo(target, true, link.hash === "#top" ? "top top" : `top ${ANCHOR_OFFSET}px`);
        };
        document.addEventListener("click", onClick);

        document.fonts.ready.then(() => ctx.add(() => build(content.current!, smoother)));

        return () => document.removeEventListener("click", onClick);
      });
    },
    { scope: wrapper },
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}

const all = <T extends HTMLElement = HTMLElement>(root: ParentNode, sel: string) =>
  gsap.utils.toArray<T>(root.querySelectorAll(sel));

const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function build(root: HTMLElement, smoother: ScrollSmoother) {
  const intro = preloader(() => smoother.paused(false));
  intro.add(heroIntro(root), "-=0.55");

  headerOnScroll();
  progressBar();
  marquee(root);
  eyebrows(root);
  splitHeadings(root);
  reveals(root);
  clips(root);
  compareWipes(root);
  tilt(root);
  magnetic();

  ScrollTrigger.refresh();
}

/* ---------- intro ---------- */

function preloader(onDone: () => void) {
  const el = document.querySelector<HTMLElement>("[data-preloader]");
  const tl = gsap.timeline();
  if (!el) {
    onDone();
    return tl;
  }
  const count = el.querySelector<HTMLElement>("[data-preloader-count]");
  const bar = el.querySelector<HTMLElement>("[data-preloader-bar]");
  const logo = el.querySelector<HTMLElement>("[data-preloader-logo]");
  const n = { v: 0 };

  tl.fromTo(logo, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE })
    .to(n, {
      v: 100,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count) count.textContent = String(Math.round(n.v)).padStart(3, "0");
      },
    }, 0.1)
    .fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.1)
    .to([logo, count, bar], { autoAlpha: 0, y: -20, duration: 0.4, ease: "power2.in", stagger: 0.05 })
    .to(el, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
      onComplete: () => {
        el.style.display = "none";
        onDone();
      },
    });
  return tl;
}

function heroIntro(root: HTMLElement) {
  const tl = gsap.timeline({ defaults: { ease: EASE } });
  const header = document.querySelector("[data-site-header]");
  const title = root.querySelector<HTMLElement>("[data-hero-title]");

  tl.fromTo(root.querySelector("[data-hero-bg]"), { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power3.out" }, 0);
  if (header) tl.fromTo(header, { autoAlpha: 0, yPercent: -100 }, { autoAlpha: 1, yPercent: 0, duration: 1 }, 0.3);

  const [eyebrow, ...rest] = all(root, "[data-hero]");
  tl.fromTo(eyebrow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.35);
  tl.fromTo(root.querySelector("[data-hero-line]"), { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, 0.35);

  if (title) {
    gsap.set(title, { autoAlpha: 1 });
    const split = SplitText.create(title, { type: "lines,chars", mask: "lines" });
    tl.from(
      split.chars,
      { yPercent: 120, rotate: 6, duration: 1.1, stagger: 0.018, ease: "power4.out", onComplete: () => split.revert() },
      0.45,
    );
  }

  tl.fromTo(rest, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.15 }, 0.9);

  const [buttons, avatars, stars] = all(root, "[data-hero-group]");
  tl.fromTo(buttons.children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 1.05);
  tl.fromTo(avatars.children, { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.09, ease: "back.out(2.2)" }, 1.25);
  tl.fromTo(stars.children, { autoAlpha: 0, scale: 0, rotate: -120 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.6, stagger: 0.07, ease: "back.out(2.5)" }, 1.35);

  all(root, "[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    const comma = el.dataset.format === "comma";
    const n = { v: 0 };
    tl.to(
      n,
      {
        v: end,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          const v = decimals ? n.v.toFixed(decimals) : Math.round(n.v);
          el.textContent = comma ? Number(v).toLocaleString("en-US") : String(v);
        },
      },
      1.4,
    );
  });
  return tl;
}

/* ---------- chrome ---------- */

function headerOnScroll() {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const hero = document.querySelector<HTMLElement>("#top");
  if (!header) return;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      header.classList.toggle("is-solid", y > (hero ? hero.offsetHeight - 92 : 400));
      const hide = y > 600 && self.direction === 1;
      gsap.to(header, { yPercent: hide ? -100 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    },
  });
}

function progressBar() {
  const bar = document.querySelector("[data-progress]");
  if (!bar) return;
  gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
}

/* ---------- sections ---------- */

function marquee(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>("[data-marquee]");
  if (!track) return;
  const rows = track.children.length;
  const rowWidth = track.scrollWidth / rows;
  const loop = gsap.to(track, { x: -rowWidth, duration: rowWidth / 55, ease: "none", repeat: -1 });

  // Scrolling pushes the strip along faster; it eases back to its cruising speed afterwards.
  let settle: gsap.core.Tween | null = null;
  ScrollTrigger.create({
    trigger: track,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 220, 6);
      settle?.kill();
      gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
      settle = gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2, ease: "power2.out" });
    },
  });
  track.addEventListener("mouseenter", () => gsap.to(loop, { timeScale: 0.15, duration: 0.6, overwrite: true }));
  track.addEventListener("mouseleave", () => gsap.to(loop, { timeScale: 1, duration: 0.8, overwrite: true }));

  gsap.fromTo(
    track.querySelectorAll("li"),
    { autoAlpha: 0, y: 30 },
    { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.05, ease: EASE, scrollTrigger: { trigger: track, start: "top 95%", once: true } },
  );
}

function eyebrows(root: HTMLElement) {
  all(root, "[data-eyebrow]").forEach((el) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    tl.fromTo(el, { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: EASE });
    tl.fromTo(el.querySelector("[data-eyebrow-line]"), { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, 0);
  });
}

function splitHeadings(root: HTMLElement) {
  all(root, "[data-split]").forEach((el) => {
    gsap.set(el, { autoAlpha: 1 });
    const split = SplitText.create(el, { type: "lines", mask: "lines" });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.1,
      stagger: 0.12,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onComplete: () => split.revert(),
    });
  });
}

function reveals(root: HTMLElement) {
  all(root, "[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 1, ease: EASE, scrollTrigger: { trigger: el, start: "top 88%", once: true } },
    );
  });

  all(root, "[data-stagger]").forEach((group) => {
    const fromLeft = group.dataset.staggerFrom === "left";
    gsap.fromTo(
      group.children,
      fromLeft ? { autoAlpha: 0, x: -30 } : { autoAlpha: 0, y: 60 },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: fromLeft ? 0.8 : 1.1,
        stagger: fromLeft ? 0.08 : 0.12,
        ease: EASE,
        scrollTrigger: { trigger: group, start: "top 88%", once: true },
      },
    );
  });
}

function clips(root: HTMLElement) {
  all(root, "[data-clip]").forEach((el) => {
    const parallax = el.hasAttribute("data-parallax");
    const img = el.querySelector("img");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    tl.fromTo(
      el,
      { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut", clearProps: "clipPath" },
    );
    if (img && !parallax) tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "power3.out", clearProps: "scale" }, 0);
  });

  all(root, "[data-parallax]").forEach((el) => {
    const img = el.querySelector("img");
    if (!img) return;
    gsap.fromTo(
      img,
      { yPercent: -3.5, scale: 1.08 },
      { yPercent: 3.5, scale: 1.08, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
    );
  });
}

/** Before/after cards: the result half is veiled, then the veil wipes off from the divider. */
function compareWipes(root: HTMLElement) {
  all(root, "[data-compare]").forEach((el) => {
    const cover = el.querySelector("[data-compare-cover]");
    const img = el.querySelector("img");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%", once: true } });
    tl.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: "power3.out", clearProps: "scale" }, 0);
    tl.fromTo(cover, { scaleX: 1 }, { scaleX: 0, duration: 1.3, ease: "power4.inOut" }, 0.35);
  });
}

/* ---------- pointer ---------- */

function tilt(root: HTMLElement) {
  if (!canHover()) return;
  all(root, "[data-tilt]").forEach((card) => {
    gsap.set(card, { transformPerspective: 1100 });
    const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 6);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
    });
    card.addEventListener("pointerleave", () => {
      rx(0);
      ry(0);
    });
  });
}

function magnetic() {
  if (!canHover()) return;
  all(document, "[data-magnetic]").forEach((el) => {
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.25);
      y((e.clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener("pointerleave", () => {
      x(0);
      y(0);
    });
  });
}
