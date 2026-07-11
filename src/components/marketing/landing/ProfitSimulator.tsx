"use client";

import { useState } from "react";
import { IconArrow } from "@/components/icons";
import { euro, useLead } from "./LeadContext";
import { Reveal } from "./Reveal";
import { useCountUp } from "./useCountUp";

const TRANSFO = 0.3; // constante interne, jamais exposée comme réglage
const PRIX_APPEL = 40; // milieu de la fourchette 25–50 €
const GESTION = 400;

export function ProfitSimulator() {
  const { goToForm } = useLead();
  const [valeur, setValeur] = useState(5000); // € par chantier
  const [appels, setAppels] = useState(10); // appels / mois
  const [openAppels, setOpenAppels] = useState(false);

  const chantiers = Math.round(appels * TRANSFO);
  const ca = chantiers * valeur;
  const coutAppels = appels * PRIX_APPEL;

  // La valeur pilotée par le curseur reste instantanée ; les résultats calculés
  // (CA, coût des appels) comptent en douceur vers leur nouvelle cible.
  const caAnim = useCountUp(ca);
  const coutAppelsAnim = useCountUp(coutAppels);

  return (
    <Reveal y={28} className="mx-auto max-w-2xl rounded-3xl border border-line bg-white p-6 card-shadow sm:p-8">
      {/* Curseur principal — une seule variable */}
      <label htmlFor="sim-valeur" className="block text-lg font-semibold text-stone">
        Combien vous rapporte un chantier, en moyenne ?
      </label>
      <p className="mt-3 text-center text-4xl font-bold tracking-tight text-navy sm:text-5xl">
        {euro(valeur)}
      </p>
      <input
        id="sim-valeur"
        type="range"
        min={500}
        max={15000}
        step={500}
        value={valeur}
        onChange={(e) => setValeur(Number(e.target.value))}
        className="mt-4 h-3 w-full cursor-pointer accent-[var(--color-terre)]"
      />
      <div className="mt-1 flex justify-between text-xs text-stone-dim">
        <span>500 €</span>
        <span>15 000 €</span>
      </div>

      {/* Résultat : une seule phrase, en gros */}
      <div className="mt-7 rounded-2xl bg-sand p-5 text-center">
        <p className="text-lg leading-relaxed text-stone sm:text-xl">
          Avec {appels} appels par mois, vous signez environ{" "}
          <strong className="text-navy">{chantiers} chantiers</strong>, soit{" "}
          <strong className="text-navy">~{euro(caAnim)} de chiffre d&apos;affaires</strong>.
          <br />
          Vous aurez payé <strong className="text-stone">{euro(GESTION)} de gestion</strong> +{" "}
          <strong className="text-stone">environ {euro(coutAppelsAnim)} d&apos;appels</strong>.
        </p>
        <p className="mt-4 border-t border-line pt-4 text-base text-stone-soft sm:text-lg">
          Chaque mois sans être en haut de Google, c&apos;est environ{" "}
          <strong className="text-terre">{euro(caAnim)}</strong> que vous laissez à vos concurrents.
        </p>
      </div>

      {/* Second curseur, discret et replié par défaut */}
      <div className="mt-4">
        {openAppels ? (
          <div className="rounded-xl border border-line p-4">
            <label htmlFor="sim-appels" className="flex items-center justify-between text-sm font-medium text-stone">
              Nombre d&apos;appels par mois
              <span className="text-navy">{appels}</span>
            </label>
            <input
              id="sim-appels"
              type="range"
              min={3}
              max={30}
              step={1}
              value={appels}
              onChange={(e) => setAppels(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-[var(--color-terre)]"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpenAppels(true)}
            className="-my-1 inline-block py-1 text-sm text-stone-soft underline underline-offset-2 hover:text-navy"
          >
            Ajuster le nombre d&apos;appels
          </button>
        )}
      </div>

      {/* Mention obligatoire, lisible */}
      <p className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Estimation indicative. Google facture des appels, pas des chantiers — la transformation
        dépend de vous.
      </p>

      <button
        type="button"
        onClick={() => goToForm()}
        className="btn-terre mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl text-base font-semibold"
      >
        Voir si mon métier est éligible dans ma zone <IconArrow width={18} height={18} />
      </button>
    </Reveal>
  );
}
