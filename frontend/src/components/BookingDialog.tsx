"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/api";

const TREATMENTS = [
  "Teeth Whitening",
  "Dental Implants",
  "Tooth Fillings",
  "Tartar Removal",
  "Crowns & Bridges",
  "Veneers",
  "Not sure yet",
];

type Status = { kind: "idle" | "sending" | "sent" } | { kind: "error"; message: string };

const field =
  "mt-2 block w-full border line-light bg-white px-3 py-[11px] text-[16px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-bronze";
const label = "block text-[14px] font-medium text-ink";

/** Appointment request form. Opens from any element with [data-book]. */
export function BookingDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest("[data-book]");
      if (!trigger || !dialog.current) return;
      e.preventDefault();
      e.stopPropagation();
      setStatus({ kind: "idle" });
      dialog.current.showModal();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(dialog.current, { autoAlpha: 0, y: 40, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" });
        gsap.fromTo(dialog.current.querySelectorAll("[data-field]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, delay: 0.15, ease: "power3.out" });
      }
    };
    // Capture phase so the smooth-scroll anchor handler never sees these clicks.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(`${API_URL}/api/appointments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const first = Object.values(body)[0];
        throw new Error(Array.isArray(first) ? String(first[0]) : "Please check your details and try again.");
      }
      form.reset();
      setStatus({ kind: "sent" });
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof TypeError ? "We couldn’t reach the clinic right now. Please call us instead." : (err as Error).message,
      });
    }
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="booking-title"
      className="m-auto w-[min(560px,calc(100vw-32px))] bg-paper p-0 text-ink backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[14px] font-medium text-muted">
              <span className="h-px w-6 bg-bronze" aria-hidden />
              BOOK A VISIT
            </p>
            <h2 id="booking-title" className="mt-3 text-[32px] font-medium leading-[40px]">
              Request an appointment
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close"
            className="flex size-10 items-center justify-center border line-light text-[20px] transition-colors hover:bg-ink hover:text-ivory"
          >
            ×
          </button>
        </div>

        {status.kind === "sent" ? (
          <div className="mt-8">
            <p className="text-[18px] leading-[26px] text-muted">
              Thank you — your request has been received. Our front desk will call you to confirm a time.
            </p>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="mt-6 h-12 bg-ink px-5 text-[16px] font-medium text-ivory"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label data-field className={`${label} sm:col-span-2`}>
              Full name
              <input name="full_name" required autoComplete="name" className={field} />
            </label>
            <label data-field className={label}>
              Phone
              <input name="phone" type="tel" required autoComplete="tel" className={field} />
            </label>
            <label data-field className={label}>
              Email
              <input name="email" type="email" autoComplete="email" className={field} />
            </label>
            <label data-field className={label}>
              Treatment
              <select name="treatment" defaultValue="Not sure yet" className={field}>
                {TREATMENTS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label data-field className={label}>
              Preferred date
              <input name="preferred_date" type="date" className={field} />
            </label>
            <label data-field className={`${label} sm:col-span-2`}>
              Anything we should know?
              <textarea name="message" rows={3} className={`${field} resize-none`} />
            </label>
            <div data-field className="sm:col-span-2">
              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="h-12 w-full bg-ink text-[16px] font-medium text-ivory transition-colors hover:bg-bronze disabled:opacity-70"
              >
                {status.kind === "sending" ? "Sending…" : "Request appointment"}
              </button>
              <p aria-live="polite" className="mt-3 min-h-5 text-[14px] text-muted">
                {status.kind === "error" ? <span className="text-[#a33a2b]">{status.message}</span> : "We’ll call you to confirm a time."}
              </p>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
