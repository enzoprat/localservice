"use client";

import { useEffect, useRef, useState } from "react";
import {
  IconCalendar, IconShield, IconCheck, IconBolt, IconPhone, IconInvoice,
} from "@/components/icons";

const steps = [
  { icon: IconCalendar, title: "Rendez-vous de 15 min", desc: "On fait le point sur votre métier, votre zone et le budget que vous êtes prêt à mettre." },
  { icon: IconShield, title: "Vos documents", desc: "Kbis, assurance décennale, pièce d'identité. Je monte le dossier à votre place." },
  { icon: IconCheck, title: "Vérification par Google", desc: "Google contrôle tout et vous décerne son badge de confiance. Comptez quelques semaines." },
  { icon: IconBolt, title: "Activation de votre zone", desc: "Votre annonce passe en ligne. C'est ici que démarrent les 30 jours de gestion offerte." },
  { icon: IconPhone, title: "Les premiers appels", desc: "Les prospects vous appellent directement depuis Google, sans passer par un site." },
  { icon: IconInvoice, title: "Facturation", desc: "Vous ne payez que les appels reçus. Je conteste les faux appels chaque semaine." },
];

export function JourneyTimeline() {
  const wrapRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1, remplit le rail
  const [active, setActive] = useState<number[]>([]);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Rail qui se dessine au scroll : progression du haut de la timeline
  // jusqu'au centre du viewport.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      setActive(steps.map((_, i) => i));
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mid = window.innerHeight * 0.55;
        const p = (mid - rect.top) / rect.height;
        setProgress(Math.max(0, Math.min(1, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Chaque nœud s'active quand il franchit le centre du viewport.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (e.isIntersecting) setActive((a) => (a.includes(idx) ? a : [...a, idx]));
        });
      },
      { threshold: 0.6, rootMargin: "0px 0px -35% 0px" },
    );
    nodeRefs.current.forEach((n) => n && obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <ol ref={wrapRef} className="relative mx-auto max-w-2xl pl-2">
      {/* Rail de fond */}
      <span className="absolute left-[27px] top-4 bottom-4 w-0.5 rounded bg-line sm:left-[31px]" aria-hidden />
      {/* Rail rempli (se dessine au scroll) */}
      <span
        className="absolute left-[27px] top-4 w-0.5 origin-top rounded bg-terre transition-[height] duration-150 ease-out sm:left-[31px]"
        style={{ height: `calc((100% - 2rem) * ${progress})` }}
        aria-hidden
      />

      {steps.map((s, i) => {
        const on = active.includes(i);
        const Icon = s.icon;
        return (
          <li
            key={s.title}
            data-idx={i}
            ref={(el) => { nodeRefs.current[i] = el; }}
            className="relative flex gap-5 pb-8 last:pb-0"
          >
            {/* Nœud numéroté animé */}
            <div className="relative z-10 shrink-0">
              <span
                className={`grid size-14 place-items-center rounded-2xl border-2 transition-all duration-500 sm:size-16 ${
                  on
                    ? "border-terre bg-terre text-white shadow-lg shadow-terre/30"
                    : "border-line bg-white text-stone-dim"
                }`}
                style={{ transform: on ? "scale(1)" : "scale(0.9)" }}
              >
                <Icon width={22} height={22} />
              </span>
              {/* Badge numéro */}
              <span
                className={`absolute -right-1 -top-1 grid size-6 place-items-center rounded-full text-xs font-bold transition-all duration-500 ${
                  on ? "bg-navy text-white" : "bg-sand text-stone-dim"
                }`}
                style={{ transform: on ? "scale(1)" : "scale(0)" }}
              >
                {i + 1}
              </span>
            </div>

            {/* Contenu */}
            <div
              className="flex-1 pt-1 transition-all duration-500"
              style={{
                opacity: on ? 1 : 0.35,
                transform: on ? "translateX(0)" : "translateX(8px)",
              }}
            >
              <h3 className="text-lg font-semibold text-stone">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-soft">{s.desc}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
