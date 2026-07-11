"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck, IconX } from "@/components/icons";

const oldWay = [
  "Vous payez d'avance.",
  "Vous attendez, sans savoir si ça marche.",
  "Vous ne savez pas ce que ça rapporte.",
];
const newWay = [
  "Vous payez quand le téléphone sonne.",
  "Vous êtes en ligne en quelques semaines.",
  "Chaque appel est traçable.",
];

export function ComparatorCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mt-12 grid gap-4 md:grid-cols-2">
      {/* Ancienne façon — désaturée, en retrait */}
      <div
        className="rounded-3xl border border-line bg-sand/70 p-7 transition-all duration-700"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateX(0)" : "translateX(-18px)",
          filter: shown ? "grayscale(0.35)" : "grayscale(1)",
        }}
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-stone-dim">
          Un site internet classique
        </p>
        <ul className="mt-5 space-y-4">
          {oldWay.map((t, i) => (
            <li
              key={t}
              className="flex items-start gap-3 text-stone-soft transition-all duration-500"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(10px)",
                transitionDelay: `${200 + i * 120}ms`,
              }}
            >
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-stone-dim/15 text-stone-dim">
                <IconX width={14} height={14} />
              </span>
              <span className="line-through decoration-stone-dim/40">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Nouvelle façon — vivante, accent terre cuite */}
      <div
        className="relative rounded-3xl border border-terre/25 bg-white p-7 shadow-[0_20px_50px_-24px_rgba(200,84,46,0.4)] ring-1 ring-terre/5 transition-all duration-700"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateX(0)" : "translateX(18px)",
          transitionDelay: "120ms",
        }}
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-terre">Les Local Services</p>
        <ul className="mt-5 space-y-4">
          {newWay.map((t, i) => (
            <li
              key={t}
              className="flex items-start gap-3 font-medium text-stone transition-all duration-500"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(10px)",
                transitionDelay: `${400 + i * 150}ms`,
              }}
            >
              <span
                className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gg text-white transition-transform duration-500"
                style={{ transform: shown ? "scale(1)" : "scale(0)", transitionDelay: `${500 + i * 150}ms` }}
              >
                <IconCheck width={14} height={14} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Pastille VS au centre */}
      <span
        className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-navy text-sm font-bold text-white shadow-lg transition-all duration-500 md:grid md:size-12"
        style={{ opacity: shown ? 1 : 0, transform: `translate(-50%,-50%) scale(${shown ? 1 : 0.5})`, transitionDelay: "300ms" }}
        aria-hidden
      >
        VS
      </span>
    </div>
  );
}
