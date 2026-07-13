"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck } from "@/components/icons";

function useCountUp(target: number, run: boolean, ms = 900) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return n;
}

export function PricingReceipt() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const gestion = useCountUp(400, run);
  const low = useCountUp(25, run);
  const high = useCountUp(50, run);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRun(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lines = [
    { label: "Gestion mensuelle", value: `${gestion} €`, note: "mon forfait, tout compris", delay: 0 },
    { label: "Coût par appel reçu", value: `${low}–${high} €`, note: "facturé en direct par Google", delay: 150 },
  ];

  return (
    <div ref={ref} className="mx-auto mt-12 max-w-md">
      {/* Ticket de caisse */}
      <div
        className="relative rounded-t-3xl bg-white p-7 shadow-[0_30px_70px_-30px_rgba(15,30,51,0.35)] transition-all duration-700 sm:p-8"
        style={{
          opacity: run ? 1 : 0,
          transform: run ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <div className="flex items-center justify-between border-b border-dashed border-line pb-4">
          <span className="text-sm font-semibold uppercase tracking-widest text-stone-dim">
            Votre facture
          </span>
          <span className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-navy">
            Sans surprise
          </span>
        </div>

        <div className="divide-y divide-dashed divide-line">
          {lines.map((l) => (
            <div
              key={l.label}
              className="flex items-center justify-between py-4 transition-all duration-500"
              style={{
                opacity: run ? 1 : 0,
                transform: run ? "translateX(0)" : "translateX(-10px)",
                transitionDelay: `${300 + l.delay}ms`,
              }}
            >
              <div>
                <p className="font-medium text-stone">{l.label}</p>
                <p className="mt-0.5 text-xs text-stone-soft">{l.note}</p>
              </div>
              <span className="font-mono text-xl font-bold tracking-tight text-navy tabular-nums">
                {l.value}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div
          className="mt-2 flex items-center justify-between gap-4 rounded-2xl bg-navy px-5 py-4 text-white transition-all duration-500"
          style={{ opacity: run ? 1 : 0, transform: run ? "scale(1)" : "scale(0.96)", transitionDelay: "600ms" }}
        >
          <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium">
            <IconCheck width={16} height={16} className="shrink-0" /> Sans engagement
          </span>
          <span className="text-right text-sm font-semibold leading-tight">
            400 € de gestion + les appels.<br />
            <span className="text-white/70">Vous arrêtez quand vous voulez.</span>
          </span>
        </div>

        <p className="mt-4 text-center text-xs text-stone-soft">
          Vous fixez le budget maximum : il n&apos;est jamais dépassé.
        </p>
      </div>

      {/* Bord déchiré du ticket */}
      <div
        className="h-4 w-full transition-opacity duration-700"
        style={{
          opacity: run ? 1 : 0,
          transitionDelay: "400ms",
          background: "#fff",
          maskImage:
            "radial-gradient(9px at 12px bottom, transparent 98%, #000) repeat-x",
          WebkitMaskImage:
            "radial-gradient(9px at 12px bottom, transparent 98%, #000) repeat-x",
          maskSize: "24px 16px",
          WebkitMaskSize: "24px 16px",
          filter: "drop-shadow(0 20px 30px rgba(15,30,51,0.12))",
        }}
        aria-hidden
      />
    </div>
  );
}
