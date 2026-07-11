"use client";

import { useState } from "react";
import { eligibleTrades } from "@/lib/data";
import { IconArrow, IconCheck, IconLock } from "@/components/icons";
import { useLead } from "./LeadContext";

export function EligibilityChecker() {
  const { goToForm } = useLead();
  const [trade, setTrade] = useState("");
  const [zip, setZip] = useState("");

  const zipValid = /^\d{5}$/.test(zip);
  const ready = Boolean(trade) && zipValid;
  // Disponibilité indicative, déterministe (pas un vrai back-office).
  const available = zipValid ? Number(zip) % 4 !== 0 : true;
  const tradeLabel = eligibleTrades.find((t) => t.id === trade)?.label ?? "votre métier";

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold text-stone">Vérifiez si votre zone est libre</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <select
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          aria-label="Votre métier"
          className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-stone outline-none focus:border-navy"
        >
          <option value="">Votre métier…</option>
          {eligibleTrades.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
          inputMode="numeric"
          placeholder="Code postal"
          aria-label="Votre code postal"
          className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-stone outline-none placeholder:text-stone-dim focus:border-navy"
        />
      </div>

      {ready && (
        <div
          className={`mt-4 flex items-start gap-2.5 rounded-xl p-3.5 ${
            available ? "bg-gg/10 text-gg" : "bg-amber-50 text-amber-700"
          }`}
        >
          {available ? <IconCheck width={18} height={18} className="mt-0.5 shrink-0" /> : <IconLock width={16} height={16} className="mt-0.5 shrink-0" />}
          <p className="text-sm font-medium">
            {available
              ? `${tradeLabel} — votre zone semble libre. Je vous la réserve le temps de vérifier.`
              : `${tradeLabel} — cette zone est peut-être déjà prise. Je vérifie et vous préviens.`}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => goToForm(ready ? { trade, zip } : undefined)}
        className="btn-terre mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-xl text-base font-semibold"
      >
        Vérifier si mon métier est éligible dans ma zone <IconArrow width={18} height={18} />
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-stone-soft">
        <IconLock width={12} height={12} className="shrink-0" />
        Une seule entreprise par métier et par zone. Si un concurrent la réserve avant vous, elle est bloquée.
      </p>
    </div>
  );
}
