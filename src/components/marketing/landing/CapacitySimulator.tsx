"use client";

import { useState } from "react";
import { IconArrow } from "@/components/icons";
import { euro, useLead } from "./LeadContext";
import { Reveal } from "./Reveal";

const TRANSFO = 0.3;
const PRIX_APPEL = 40;
const GESTION = 400;

export function CapacitySimulator() {
  const { goToForm } = useLead();
  const [chantiers, setChantiers] = useState(4);

  const appelsNecessaires = Math.ceil(chantiers / TRANSFO);
  const budget = GESTION + appelsNecessaires * PRIX_APPEL;
  const none = chantiers === 0;

  return (
    <Reveal y={28} className="mx-auto max-w-2xl rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
      <label htmlFor="sim-capa" className="block text-lg font-semibold text-stone">
        Combien de chantiers supplémentaires pouvez-vous absorber par mois ?
      </label>
      <p className="mt-3 text-center text-4xl font-bold tracking-tight text-navy sm:text-5xl">
        {chantiers}
      </p>
      <input
        id="sim-capa"
        type="range"
        min={0}
        max={15}
        step={1}
        value={chantiers}
        onChange={(e) => setChantiers(Number(e.target.value))}
        className="mt-4 h-3 w-full cursor-pointer accent-[var(--color-terre)]"
      />
      <div className="mt-1 flex justify-between text-xs text-stone-dim">
        <span>0</span>
        <span>15</span>
      </div>

      {none ? (
        <div className="mt-7 rounded-2xl bg-sand p-5 text-center">
          <p className="text-lg text-stone">
            Si vous ne pouvez pas prendre de chantier en plus, ce n&apos;est pas le bon moment —
            et je préfère vous le dire franchement. Revenez quand vous aurez de la place.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-7 rounded-2xl bg-sand p-5 text-center">
            <p className="text-lg leading-relaxed text-stone sm:text-xl">
              Pour <strong className="text-navy">{chantiers} chantiers de plus</strong> par mois,
              comptez environ <strong className="text-navy">{appelsNecessaires} appels</strong>.
              <br />
              Budget conseillé : <strong className="text-navy">~{euro(budget)} / mois</strong>{" "}
              (gestion + appels).
            </p>
          </div>
          <button
            type="button"
            onClick={() => goToForm({ capacity: String(chantiers) })}
            className="btn-terre mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl text-base font-semibold"
          >
            Réserver ma zone pour {chantiers} chantiers / mois <IconArrow width={18} height={18} />
          </button>
        </>
      )}
    </Reveal>
  );
}
