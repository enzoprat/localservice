"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/Shell";
import { Card } from "@/components/ui";

function Toggle({ defaultOn = false, label, desc }: { defaultOn?: boolean; label: string; desc: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-ink-dim">{desc}</p>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-brand" : "bg-white/10"}`}
      >
        <span className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

const tabs = ["Général", "Équipe", "Notifications", "Facturation", "API"];

export default function SettingsPage() {
  const [tab, setTab] = useState("Général");
  return (
    <>
      <PageHeader title="Réglages" subtitle="Configuration de votre espace d'administration" />

      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-3 py-1.5 text-sm ${tab === t ? "bg-white/10 text-ink" : "text-ink-soft hover:bg-white/5"}`}>{t}</button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <p className="text-sm font-semibold">Profil de l&apos;organisation</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ["Nom de l'agence", "Jacob Growth"],
              ["Email de contact", "contact@jacob.co"],
              ["Région", "Rhône-Alpes"],
              ["Fuseau horaire", "Europe/Paris"],
            ].map(([l, v]) => (
              <label key={l} className="block">
                <span className="text-sm text-ink-soft">{l}</span>
                <input defaultValue={v} className="mt-1.5 w-full rounded-xl border border-border bg-white/[0.02] px-3 py-2.5 text-sm outline-none focus:border-brand" />
              </label>
            ))}
          </div>
          <div className="mt-5 border-t border-border pt-4">
            <p className="text-sm font-semibold">Préférences</p>
            <div className="mt-1 divide-y divide-border">
              <Toggle defaultOn label="Attribution automatique des leads" desc="Répartir les leads par zone dès réception." />
              <Toggle defaultOn label="Alertes de churn" desc="Signaler les clients à risque en temps réel." />
              <Toggle label="Mode maintenance du portail" desc="Bloquer temporairement l'accès client." />
            </div>
          </div>
          <button className="btn-brand mt-5 rounded-xl px-5 py-2.5 text-sm font-medium">Enregistrer</button>
        </Card>

        <Card>
          <p className="text-sm font-semibold">Équipe</p>
          <div className="mt-4 space-y-3">
            {[
              ["Nadia Benali", "Growth Manager", "brand"],
              ["Kevin Leroy", "Account Manager", "blue"],
              ["Sami Rahmani", "Account Manager", "accent"],
              ["Léa Martin", "Support", "warn"],
            ].map(([n, r]) => (
              <div key={n} className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-xs font-semibold text-white">
                  {n.split(" ").map((w) => w[0]).join("")}
                </span>
                <div>
                  <p className="text-sm font-medium">{n}</p>
                  <p className="text-xs text-ink-dim">{r}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-xl border border-dashed border-border py-2 text-sm text-ink-dim hover:border-brand/40 hover:text-ink-soft">+ Inviter un membre</button>
        </Card>
      </div>
    </>
  );
}
