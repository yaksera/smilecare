"use client";

import Image from "next/image";
import { useState } from "react";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/content";
import { ArrowRight, Phone } from "./icons";
import { RollText } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header data-site-header className="fixed inset-x-0 top-0 z-50 border-b border-transparent">
      <div className="mx-auto flex h-[92px] max-w-[1200px] items-center px-4 xl:px-0">
        <a href="#top" aria-label="Smile Care home" className="shrink-0 xl:-ml-[13px]">
          <Image quality={90} src="/images/logo.png" alt="Smile Care" width={120} height={60} preload />
        </a>

        <nav aria-label="Primary" className="hidden lg:ml-[254px] lg:block">
          <ul className="flex gap-[46.5px] text-[12px] font-medium leading-[17px] text-ivory">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group block">
                  <RollText>{l.label}</RollText>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center xl:-mr-[14px]">
          <a href={PHONE_HREF} className="group hidden items-center gap-[9px] text-[12px] font-medium leading-[17px] text-ivory md:flex">
            <Phone className="size-[22px] text-ivory" />
            <RollText>{PHONE_DISPLAY}</RollText>
          </a>
          <a
            href="#book"
            data-book
            data-magnetic
            className="group ml-3 hidden h-12 items-center gap-[11px] border line-dark pl-3 pr-[14px] text-[14px] font-medium leading-5 text-ivory transition-colors hover:bg-ivory/10 sm:flex"
          >
            <RollText>Book a visit</RollText>
            <ArrowRight className="h-4 w-[21px] transition-transform duration-500 group-hover:translate-x-1" />
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="ml-3 flex size-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className="h-px w-6 bg-ivory" />
            <span className="h-px w-6 bg-ivory" />
            <span className="h-px w-6 bg-ivory" />
          </button>
        </div>
      </div>

      {open && (
        <ul className="flex flex-col gap-4 bg-ink/95 px-4 py-6 text-[16px] font-medium text-ivory backdrop-blur lg:hidden">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          </li>
        </ul>
      )}
    </header>
  );
}
