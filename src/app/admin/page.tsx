import Link from "next/link";
import { PageHeader } from "@/components/dashboard/Shell";
import { AreaChart, BarChart, Badge, Card, Donut, StatCard, Progress } from "@/components/ui";
import { IconArrow } from "@/components/icons";
import {
  adminKpis, channelSplit, clients, leads, leadsSeries, revenueLabels, revenueSeries,
} from "@/lib/data";

const statusTone: Record<string, "brand" | "accent" | "warn" | "danger" | "neutral" | "blue"> = {
  nouveau: "blue", contacté: "warn", rdv: "brand", gagné: "accent", perdu: "danger",
};

export default function AdminDashboard() {
  return (
    <>
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble de la performance · Juillet 2026"
        actions={
          <>
            <button className="rounded-xl border border-border bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Exporter</button>
            <Link href="/admin/prospects" className="btn-brand rounded-xl px-4 py-2 text-sm font-medium">+ Nouveau prospect</Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminKpis.map((k) => (<StatCard key={k.label} {...k} />))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-dim">Revenu récurrent mensuel</p>
              <p className="text-2xl font-semibold">84 250 €</p>
            </div>
            <Badge tone="accent">+12,4 % MoM</Badge>
          </div>
          <AreaChart data={revenueSeries} labels={revenueLabels} height={200} />
        </Card>

        <Card>
          <p className="text-sm font-medium">Répartition des canaux</p>
          <p className="mb-4 text-xs text-ink-dim">Origine des leads · 30 j</p>
          <Donut data={channelSplit} />
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card>
          <p className="text-sm font-medium">Leads générés</p>
          <p className="mb-4 text-xs text-ink-dim">12 derniers mois</p>
          <BarChart data={leadsSeries} />
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-ink-dim">Total année</span>
            <span className="font-semibold">3 908 leads</span>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">Derniers leads</p>
            <Link href="/admin/leads" className="flex items-center gap-1 text-sm text-brand-2 hover:underline">
              Tout voir <IconArrow width={14} height={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-ink-dim">
                  <th className="pb-3 font-medium">Contact</th>
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Valeur</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.slice(0, 5).map((l) => (
                  <tr key={l.id} className="hover:bg-white/[0.02]">
                    <td className="py-3">
                      <p className="font-medium">{l.name}</p>
                      <p className="text-xs text-ink-dim">{l.city} · {l.createdAt}</p>
                    </td>
                    <td className="py-3 text-ink-soft">{l.service}</td>
                    <td className="py-3 font-medium tabular-nums">{l.value.toLocaleString("fr-FR")} €</td>
                    <td className="py-3"><Badge tone={statusTone[l.status]}>{l.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">Top clients par performance</p>
            <Link href="/admin/clients" className="flex items-center gap-1 text-sm text-brand-2 hover:underline">
              Tout voir <IconArrow width={14} height={14} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {clients.slice(0, 4).map((c) => (
              <div key={c.id} className="rounded-xl border border-border bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{c.name}</p>
                  <Badge tone="accent">{c.roas}×</Badge>
                </div>
                <p className="mt-0.5 text-xs text-ink-dim">{c.trade} · {c.city}</p>
                <div className="mt-4">
                  <div className="mb-1.5 flex justify-between text-xs text-ink-dim">
                    <span>{c.leads30d} leads / 30 j</span>
                    <span>{c.mrr} €</span>
                  </div>
                  <Progress value={Math.min(100, c.leads30d + 20)} tone="brand" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
