"use client";

import { useEffect, useState } from "react";
import { IconPhone } from "@/components/icons";
import { EligibilityChecker } from "./EligibilityChecker";
import { TrustBadges } from "./TrustBadges";

// Le titre s'écrit mot par mot. Les mots "accent" passent en terre cuite.
const words = [
  { t: "Vous", accent: false },
  { t: "ne", accent: false },
  { t: "payez", accent: false },
  { t: "pas", accent: false },
  { t: "un", accent: false },
  { t: "site", accent: false },
  { t: "internet.", accent: false, br: true },
  { t: "Vous", accent: true },
  { t: "payez", accent: true },
  { t: "des", accent: true },
  { t: "appels.", accent: true },
];

export function AnimatedHero() {
  const [count, setCount] = useState(0);
  const done = count >= words.length;

  useEffect(() => {
    // Respecte prefers-reduced-motion : tout apparaît d'emblée.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(words.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= words.length) clearInterval(id);
    }, 110);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Fond : trame de points + halos de lumière qui dérivent lentement */}
      <div className="dot-grid absolute inset-0 -z-10" />
      <div
        className="light-drift pointer-events-none absolute left-1/2 top-[-6rem] -z-10 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,84,46,0.22), rgba(200,84,46,0.06) 45%, transparent 70%)",
          filter: "blur(36px)",
        }}
      />
      <div
        className="light-drift pointer-events-none absolute right-[-8rem] top-24 -z-10 h-[34rem] w-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(20,40,63,0.08), transparent 65%)",
          filter: "blur(40px)",
          animationDelay: "-6s",
        }}
      />
      {/* Fondu vers la section suivante */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-sand" />

      <div className="mx-auto max-w-3xl px-5 text-center">
        {/* Téléphone qui sonne — le motif signature du produit (des appels) */}
        <div className="mb-7 flex justify-center">
          <span className="relative grid size-16 place-items-center">
            <span className="ring-wave absolute inset-0 rounded-full border-2 border-terre/50" />
            <span
              className="ring-wave absolute inset-0 rounded-full border-2 border-terre/40"
              style={{ animationDelay: "0.8s" }}
            />
            <span className="relative grid size-16 place-items-center rounded-2xl bg-terre text-white shadow-lg shadow-terre/30">
              <IconPhone width={26} height={26} className="ring-shake" />
            </span>
          </span>
        </div>

        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-stone sm:text-5xl md:text-[4rem]">
          {words.map((w, i) => (
            <span key={i}>
              <span
                className="inline-block transition-all duration-500"
                style={{
                  opacity: i < count ? 1 : 0,
                  transform: i < count ? "translateY(0)" : "translateY(0.4em)",
                  color: w.accent ? "var(--color-terre)" : undefined,
                }}
              >
                {w.t}
              </span>{" "}
              {w.br && <br />}
            </span>
          ))}
          {!done && <span className="caret align-middle" />}
        </h1>

        <p
          className="mx-auto mt-5 max-w-xl text-balance text-lg text-stone-soft transition-all duration-700"
          style={{ opacity: done ? 1 : 0, transform: done ? "translateY(0)" : "translateY(12px)" }}
        >
          Je place votre entreprise tout en haut de Google. Le prospect vous appelle directement.
          Vous n&apos;êtes facturé que lorsque le téléphone sonne.
        </p>

        <div
          className="mx-auto mt-8 max-w-lg transition-all duration-700"
          style={{
            opacity: done ? 1 : 0,
            transform: done ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "120ms",
          }}
        >
          <EligibilityChecker />
        </div>

        <p
          className="mt-5 text-sm text-stone-soft transition-opacity duration-700"
          style={{ opacity: done ? 1 : 0, transitionDelay: "240ms" }}
        >
          <strong className="text-stone">400 €/mois</strong> de gestion. Plus le coût
          des appels, facturé par Google. Sans engagement.
        </p>

        <TrustBadges
          className="mx-auto mt-10 max-w-2xl transition-all duration-700"
          style={{
            opacity: done ? 1 : 0,
            transform: done ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "360ms",
          }}
        />
      </div>
    </section>
  );
}
