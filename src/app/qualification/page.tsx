"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AuthShell } from "@/components/marketing/AuthShell";
import { eligibleTrades } from "@/lib/data";
import { IconArrow, IconCheck, IconLock, IconShield } from "@/components/icons";

export default function QualificationPage() {
  const [step, setStep] = useState(0);
  const [trade, setTrade] = useState("");
  const [zip, setZip] = useState("");
  const [gmb, setGmb] = useState("");
  const [capacity, setCapacity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const total = 3;
  const zipValid = /^\d{5}$/.test(zip);
  const canNext = useMemo(() => {
    if (step === 0) return Boolean(trade) && zipValid;
    if (step === 1) return true;
    if (step === 2) return Boolean(name) && phone.replace(/\D/g, "").length >= 8;
    return false;
  }, [step, trade, zipValid, name, phone]);

  const available = zipValid ? (Number(zip) % 4 !== 0) : true;

  return (
    <AuthShell>
      <div className="light-card p-7 animate-fadeup">
        <div className="mb-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-sand px-3 py-1 text-xs font-medium text-navy">
            <IconLock width={13} height={13} /> Éligibilité · 30 s
          </span>
          <span className="text-sm text-stone-dim">Étape {Math.min(step + 1, total)}/{total}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-navy transition-all" style={{ width: `${(step / total) * 100}%` }} />
        </div>

        <div className="mt-7 min-h-[240px]">
          {step === 0 && (
            <div className="animate-fadeup">
              <h1 className="text-2xl font-semibold tracking-tight text-stone">Quel est votre métier ?</h1>
              <p className="mt-1 text-sm text-stone-soft">Je vérifie si votre zone est encore libre.</p>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {eligibleTrades.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTrade(t.id)}
                    className={`rounded-xl border px-3 py-3 text-sm transition ${
                      trade === t.id ? "border-navy bg-navy text-white" : "border-line bg-white text-stone-soft hover:border-navy/40"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <label className="mt-5 block text-sm font-medium text-stone">Votre code postal</label>
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                inputMode="numeric"
                placeholder="Ex : 33000"
                className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-stone outline-none placeholder:text-stone-dim focus:border-navy"
              />
              {zipValid && (
                <p className={`mt-3 flex items-center gap-2 text-sm ${available ? "text-gg" : "text-amber-600"}`}>
                  {available ? <IconCheck width={15} height={15} /> : <IconLock width={15} height={15} />}
                  {available ? "Bonne nouvelle : votre zone semble libre pour ce métier." : "Cette zone est peut-être déjà prise — je vérifie et vous rappelle."}
                </p>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="animate-fadeup">
              <h1 className="text-2xl font-semibold tracking-tight text-stone">Votre fiche Google</h1>
              <p className="mt-1 text-sm text-stone-soft">Pour préparer votre dossier de vérification. Facultatif si vous n&apos;en avez pas encore.</p>
              <label className="mt-5 block text-sm font-medium text-stone">Lien ou nom de votre fiche Google</label>
              <input
                value={gmb}
                onChange={(e) => setGmb(e.target.value)}
                placeholder="Ex : Toiture Dupont — Bordeaux"
                className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-stone outline-none placeholder:text-stone-dim focus:border-navy"
              />
              <label className="mt-4 block text-sm font-medium text-stone">Combien de demandes pouvez-vous absorber par semaine ? <span className="text-stone-dim">(facultatif)</span></label>
              <div className="mt-2 flex flex-wrap gap-2">
                {["1 à 3", "4 à 7", "8+"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCapacity(c)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      capacity === c ? "border-navy bg-navy text-white" : "border-line bg-white text-stone-soft hover:border-navy/40"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fadeup">
              <h1 className="text-2xl font-semibold tracking-tight text-stone">Où vous joindre ?</h1>
              <p className="mt-1 text-sm text-stone-soft">Je vous rappelle sous 24 h pour lancer la vérification Google.</p>
              <label className="mt-5 block text-sm font-medium text-stone">Nom de l&apos;entreprise</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex : Toiture Dupont"
                className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-stone outline-none placeholder:text-stone-dim focus:border-navy" />
              <label className="mt-4 block text-sm font-medium text-stone">Téléphone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="06 12 34 56 78"
                className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-stone outline-none placeholder:text-stone-dim focus:border-navy" />
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-3">
          {step > 0 && (
            <button onClick={() => setStep((s) => s - 1)} className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-stone hover:bg-sand">
              Retour
            </button>
          )}
          {step < total - 1 ? (
            <button
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
              className="btn-terre ml-auto flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuer <IconArrow width={16} height={16} />
            </button>
          ) : (
            <Link
              href={canNext ? "/confirmation" : "#"}
              aria-disabled={!canNext}
              className={`btn-terre ml-auto flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium ${!canNext ? "pointer-events-none opacity-40" : ""}`}
            >
              Vérifier mon éligibilité <IconArrow width={16} height={16} />
            </Link>
          )}
        </div>
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-stone-soft">
        <IconShield width={14} height={14} className="text-gg" /> Vos données restent confidentielles · Sans engagement
      </p>
    </AuthShell>
  );
}
