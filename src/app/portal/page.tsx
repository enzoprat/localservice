import Link from "next/link";
import { PageHeader } from "@/components/dashboard/Shell";
import { AreaChart, Badge, Card, Donut, StatCard, Progress } from "@/components/ui";
import { IconArrow, IconPhone, IconTarget } from "@/components/icons";
import {
  channelSplit, leads, onboardingSteps, portalKpis, revenueLabels, revenueSeries,
} from "@/lib/data";

const statusTone: Record<string, "brand" | "accent" | "warn" | "danger" | "neutral" | "blue"> = {
  nouveau: "blue", contacté: "warn", rdv: "brand", gagné: "accent", perdu: "danger",
};

export default function PortalDashboard() {
  const doneSteps = onboardingSteps.filter((s) => s.done).length;
  return (
    <>
      <PageHeader
        title="Bonjour, Atelier Bois & Co 👋"
        subtitle="Voici la performance de vos campagnes en temps réel"
        actions={<Link href="/portal/leads" className="btn-brand rounded-xl px-4 py-2 text-sm font-medium">Voir mes leads</Link>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {portalKpis.map((k) => (<StatCard key={k.label} {...k} />))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-dim">Chiffre d&apos;affaires attribué</p>
              <p className="text-2xl font-semibold">48 900 €</p>
            </div>
            <Badge tone="accent">+27 % sur 90 j</Badge>
          </div>
          <AreaChart data={revenueSeries} labels={revenueLabels} height={200} color="#23e6a8" />
        </Card>

        <Card>
          <p className="text-sm font-medium">D&apos;où viennent vos leads</p>
          <p className="mb-4 text-xs text-ink-dim">30 derniers jours</p>
          <Donut data={channelSplit} />
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">Leads récents</p>
            <Link href="/portal/leads" className="flex items-center gap-1 text-sm text-brand-2 hover:underline">
              Tout voir <IconArrow width={14} height={14} />
            </Link>
          </div>
          <div className="space-y-2.5">
            {leads.slice(0, 5).map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/15 text-xs font-semibold text-brand">
                  {l.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{l.name}</p>
                  <p className="truncate text-xs text-ink-dim">{l.service} · {l.city}</p>
                </div>
                <span className="hidden text-sm font-medium tabular-nums sm:block">{l.value.toLocaleString("fr-FR")} €</span>
                <Badge tone={statusTone[l.status]}>{l.status}</Badge>
                <button className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-ink-soft hover:bg-white/5"><IconPhone width={14} height={14} /></button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">Votre installation</p>
            <span className="text-xs text-ink-dim">{doneSteps}/{onboardingSteps.length}</span>
          </div>
          <Progress value={(doneSteps / onboardingSteps.length) * 100} tone="accent" />
          <div className="mt-4 space-y-3">
            {onboardingSteps.map((s) => (
              <div key={s.title} className="flex items-start gap-3">
                <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[10px] ${s.done ? "bg-accent text-bg" : "border border-border text-ink-dim"}`}>
                  {s.done ? "✓" : ""}
                </span>
                <div>
                  <p className={`text-sm ${s.done ? "text-ink-soft line-through" : "font-medium"}`}>{s.title}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/portal/onboarding" className="mt-4 flex items-center justify-center gap-1 rounded-xl border border-border py-2 text-sm text-brand-2 hover:bg-white/5">
            Continuer l&apos;installation <IconArrow width={14} height={14} />
          </Link>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-brand/15 text-brand"><IconTarget /></div>
            <div>
              <p className="font-medium">Votre zone : Lyon Presqu&apos;île</p>
              <p className="text-sm text-ink-dim">Exclusivité menuiserie · indice de demande 88/100</p>
            </div>
          </div>
          <Badge tone="accent">Exclusivité active</Badge>
        </Card>
      </div>
    </>
  );
}
