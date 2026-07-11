"use client";

import { useEffect, useRef, useState } from "react";
import { IconPhone, IconShield, IconStar } from "@/components/icons";

export function SerpMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-sm">
      {/* Cadre téléphone */}
      <div className="rounded-[2rem] border-4 border-stone/10 bg-white p-3 shadow-xl">
        <div className="flex items-center gap-2 rounded-full border border-line bg-sand px-4 py-2.5 text-sm text-stone-soft">
          <span className="truncate">couvreur près de chez moi</span>
        </div>

        {/* Encart Local Services — apparaît en haut */}
        <div
          className={`mt-3 rounded-xl border border-navy/20 bg-white p-3.5 shadow-sm ring-1 ring-navy/5 transition-all duration-700 ${
            shown ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-navy text-xs font-semibold text-white">VE</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-stone">Votre Entreprise</p>
              <p className="flex items-center gap-1 text-xs text-stone-soft">
                <span className="flex text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar
                      key={i}
                      width={11}
                      height={11}
                      className={`fill-current transition-opacity duration-500 ${shown ? "opacity-100" : "opacity-0"}`}
                      style={{ transitionDelay: `${600 + i * 90}ms` }}
                    />
                  ))}
                </span>
                5,0 · 52 avis
              </p>
            </div>
            <span
              className={`ml-auto inline-flex items-center gap-1 rounded-full bg-gg/10 px-2 py-1 text-[10px] font-medium text-gg transition-all duration-500 ${
                shown ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <IconShield width={10} height={10} /> Garanti par Google
            </span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-navy py-2 text-xs font-medium text-white">
            <IconPhone width={13} height={13} /> Appeler
          </div>
        </div>

        {/* Google Ads + naturel, en dessous, estompés */}
        <div className={`mt-3 space-y-2 transition-opacity duration-700 ${shown ? "opacity-60" : "opacity-100"}`}>
          <div className="rounded-lg border border-line bg-sand/60 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-dim">Annonce</p>
            <div className="mt-1 h-2 w-2/3 rounded bg-line" />
            <div className="mt-1.5 h-2 w-1/2 rounded bg-line" />
          </div>
          <div className="rounded-lg border border-line bg-sand/60 p-3">
            <div className="h-2 w-3/4 rounded bg-line" />
            <div className="mt-1.5 h-2 w-1/2 rounded bg-line" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-stone-soft">
        Votre place : tout en haut, avant les publicités et avant les résultats naturels.
      </p>
    </div>
  );
}
