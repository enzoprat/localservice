"use client";

import { useMemo, useState } from "react";
import {
  corsicaOutline, departements, eligibleTrades, franceOutline,
} from "@/lib/data";
import { IconArrow, IconCheck, IconLock, IconPhone } from "@/components/icons";
import { useLead } from "./landing/LeadContext";

function isAvailable(code: string, trade: string) {
  const s = code + trade;
  let h = 0;
  for (let i = 0; i < s.length; i++) h += s.charCodeAt(i);
  return h % 4 !== 0;
}

export function EligibilityMap() {
  const { goToForm } = useLead();
  const [trade, setTrade] = useState("couvreur");
  const [code, setCode] = useState("33");

  const dept = departements.find((d) => d.code === code) ?? departements[0];
  const tradeLabel = eligibleTrades.find((t) => t.id === trade)?.label ?? "";
  const available = useMemo(() => isAvailable(code, trade), [code, trade]);
  const takenCount = useMemo(
    () => departements.filter((d) => !isAvailable(d.code, trade)).length,
    [trade],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      {/* Controls + result */}
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 py-1 pl-1.5 pr-3.5 text-xs font-medium uppercase tracking-wide text-navy shadow-sm backdrop-blur">
          <span className="relative grid size-6 place-items-center rounded-full bg-terre/10 text-terre">
            <span className="chip-ring absolute inset-0 rounded-full" />
            <span className="icon-breathe grid place-items-center">
              <IconLock width={13} height={13} />
            </span>
          </span>
          Une seule entreprise par métier et par zone
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone sm:text-4xl">
          Votre zone est-elle encore libre ?
        </h2>
        <p className="mt-3 text-stone-soft">
          Choisissez votre métier et votre département. Je vérifie si la place est disponible chez
          vous — car une fois prise, elle ne l&apos;est plus pour personne d&apos;autre.
        </p>

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-stone">Votre métier</p>
          <div className="flex flex-wrap gap-2">
            {eligibleTrades.map((t) => (
              <button
                key={t.id}
                onClick={() => setTrade(t.id)}
                className={`rounded-full border px-3.5 py-2 text-sm transition ${
                  trade === t.id
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-white text-stone-soft hover:border-navy/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-stone">Votre département</label>
          <select
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-stone outline-none focus:border-navy"
          >
            {[...departements]
              .sort((a, b) => a.code.localeCompare(b.code))
              .map((d) => (
                <option key={d.code} value={d.code}>
                  {d.code} — {d.name}
                </option>
              ))}
          </select>
        </div>

        {/* Result card */}
        <div
          className={`mt-6 rounded-2xl border p-5 ${
            available ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
          }`}
        >
          <div className="flex items-start gap-3">
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-full text-white ${
                available ? "bg-gg" : "bg-amber-500"
              }`}
            >
              {available ? <IconCheck width={18} height={18} /> : <IconLock width={16} height={16} />}
            </span>
            <div>
              <p className="font-semibold text-stone">
                {available
                  ? `Disponible : ${dept.name} pour un ${tradeLabel.toLowerCase()}`
                  : `Déjà réservé : ${dept.name} pour un ${tradeLabel.toLowerCase()}`}
              </p>
              <p className="mt-1 text-sm text-stone-soft">
                {available
                  ? "La place est libre dans votre zone. Je peux vous la réserver le temps de vérifier votre éligibilité."
                  : "Un artisan occupe déjà cette zone pour ce métier. Inscrivez-vous : vous serez prévenu si elle se libère."}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => goToForm({ trade })}
              className="btn-terre flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium"
            >
              {available ? "Réserver mon éligibilité" : "M'inscrire sur la liste d'attente"}
              <IconArrow width={15} height={15} />
            </button>
            <a
              href="tel:+33000000000"
              className="flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-medium text-stone hover:bg-sand"
            >
              <IconPhone width={15} height={15} /> Être rappelé sous 24 h
            </a>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative rounded-3xl border border-line bg-sand p-4 sm:p-8">
        <svg viewBox="0 0 500 480" className="mx-auto w-full max-w-md" role="img" aria-label="Carte de France">
          <path d={franceOutline} fill="#fff" stroke="#d9cfbf" strokeWidth="2" strokeLinejoin="round" />
          <path d={corsicaOutline} fill="#fff" stroke="#d9cfbf" strokeWidth="2" strokeLinejoin="round" />

          {departements.map((d) => {
            const selected = d.code === code;
            if (selected) return null;
            const av = isAvailable(d.code, trade);
            return (
              <circle
                key={d.code}
                cx={d.x}
                cy={d.y}
                r={3}
                fill={av ? "#8fd0a8" : "#e6c07a"}
                opacity={0.9}
              />
            );
          })}

          {/* Selected pin */}
          <g>
            <circle
              cx={dept.x}
              cy={dept.y}
              r={10}
              fill={available ? "#1a8f4c" : "#d97706"}
              className="pulse-ring"
              style={{ transformOrigin: `${dept.x}px ${dept.y}px` }}
              opacity={0.35}
            />
            <circle cx={dept.x} cy={dept.y} r={8} fill={available ? "#1a8f4c" : "#d97706"} stroke="#fff" strokeWidth="2.5" />
          </g>

          {/* Label */}
          <g transform={`translate(${Math.min(dept.x, 360)}, ${dept.y - 26})`}>
            <rect x={-4} y={-16} width={dept.name.length * 7 + 34} height={22} rx={6} fill="#163a5f" />
            <text x={8} y={0} fill="#fff" fontSize="12" fontWeight="600">
              {dept.code} · {dept.name}
            </text>
          </g>
        </svg>

        <div className="mt-4 flex items-center justify-center gap-5 text-xs text-stone-soft">
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-gg" /> Disponible</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-amber-500" /> Déjà pris</span>
        </div>
        <p className="mt-3 text-center text-sm font-medium text-stone">
          {takenCount} zone{takenCount > 1 ? "s" : ""} sont déjà réservées pour un {tradeLabel.toLowerCase()}.
          <span className="text-stone-soft"> Ces appels partent aujourd&apos;hui chez un concurrent.</span>
        </p>
      </div>
    </div>
  );
}
