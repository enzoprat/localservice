"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { eligibleTrades } from "@/lib/data";
import { IconCheck, IconShield } from "@/components/icons";
import { FORM_ID, useLead } from "./LeadContext";
import { TrustBadges } from "./TrustBadges";

const WEB3FORMS_KEY = "d7a14647-21ba-49f2-9ec9-28e95c68e492";

export function LeadForm() {
  const router = useRouter();
  const { trade, zip, capacity, set } = useLead();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showCapacity, setShowCapacity] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const zipValid = /^\d{5}$/.test(zip);
  const phoneValid = phone.replace(/\D/g, "").length >= 8;
  const valid = Boolean(trade) && zipValid && Boolean(name.trim()) && phoneValid;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid || submitting) return;

    // Honeypot anti-spam : rempli seulement par les bots.
    const form = e.currentTarget;
    if ((form.elements.namedItem("botcheck") as HTMLInputElement)?.checked) return;

    setSubmitting(true);
    setError(false);

    const tradeLabel = eligibleTrades.find((t) => t.id === trade)?.label ?? trade;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nouveau prospect — ${tradeLabel} (${zip})`,
          from_name: "artisanspro.enzoprat.fr",
          Métier: tradeLabel,
          "Code postal": zip,
          Nom: name.trim(),
          Téléphone: phone.trim(),
          "Capacité (chantiers/mois)": capacity || "non précisé",
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/confirmation");
      } else {
        setError(true);
        setSubmitting(false);
      }
    } catch {
      setError(true);
      setSubmitting(false);
    }
  }

  return (
    <section id={FORM_ID} className="scroll-mt-24 bg-navy py-16 text-white sm:py-20">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Vérifions votre éligibilité
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Je vérifie la disponibilité de votre métier chez vous et je vous rappelle sous 24 h.
            Une seule entreprise par métier et par zone.
          </p>
          <TrustBadges tone="dark" className="mx-auto mt-7 max-w-2xl" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl bg-white p-6 text-stone shadow-xl sm:p-8"
        >
          {/* Honeypot anti-spam — masqué aux humains */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone">Votre métier</span>
              <select
                value={trade}
                onChange={(e) => set({ trade: e.target.value })}
                className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-stone outline-none focus:border-navy"
              >
                <option value="">Choisir…</option>
                {eligibleTrades.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone">Votre code postal</span>
              <input
                value={zip}
                onChange={(e) => set({ zip: e.target.value.replace(/\D/g, "").slice(0, 5) })}
                inputMode="numeric"
                placeholder="Ex : 33000"
                className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-stone outline-none placeholder:text-stone-dim focus:border-navy"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone">Votre nom</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Jean Dupont"
                className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-stone outline-none placeholder:text-stone-dim focus:border-navy"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone">Votre téléphone</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                placeholder="06 12 34 56 78"
                className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-stone outline-none placeholder:text-stone-dim focus:border-navy"
              />
            </label>
          </div>

          {/* 5e champ optionnel */}
          {showCapacity ? (
            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-medium text-stone">
                Combien de chantiers pouvez-vous absorber par mois ? <span className="text-stone-dim">(facultatif)</span>
              </span>
              <input
                value={capacity}
                onChange={(e) => set({ capacity: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                inputMode="numeric"
                placeholder="Ex : 4"
                className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-stone outline-none placeholder:text-stone-dim focus:border-navy"
              />
            </label>
          ) : (
            <button
              type="button"
              onClick={() => setShowCapacity(true)}
              className="mt-4 text-sm font-medium text-navy underline underline-offset-2"
            >
              + Préciser ma capacité (facultatif)
            </button>
          )}

          <button
            type="submit"
            disabled={!valid || submitting}
            className="btn-terre mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl text-base font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-65"
          >
            {submitting ? "Envoi en cours…" : "Vérifier mon éligibilité"}
          </button>

          {error && (
            <p className="mt-3 text-center text-sm text-terre">
              Une erreur est survenue. Réessayez ou appelez le 07 69 10 81 40.
            </p>
          )}

          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-stone-soft">
            <IconShield width={14} height={14} className="text-gg" />
            Sans engagement · vous arrêtez quand vous voulez · vos données restent confidentielles
          </p>
          <p className="mt-2 flex items-center justify-center gap-2 text-center text-xs text-stone-soft">
            <IconCheck width={14} height={14} className="text-gg" />
            400 €/mois de gestion, plus les appels facturés en direct par Google.
          </p>
        </form>
      </div>
    </section>
  );
}
