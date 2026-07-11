import { PageHeader } from "@/components/dashboard/Shell";
import { Badge, Card, StatCard } from "@/components/ui";
import { clients } from "@/lib/data";

const statusTone: Record<string, "accent" | "brand" | "warn" | "danger" | "neutral"> = {
  actif: "accent", onboarding: "brand", pause: "neutral", risque: "danger",
};
const planTone: Record<string, "neutral" | "blue" | "brand"> = {
  Starter: "neutral", Croissance: "blue", Domination: "brand",
};

export default function ClientsPage() {
  const mrr = clients.reduce((s, c) => s + c.mrr, 0);
  return (
    <>
      <PageHeader
        title="Clients"
        subtitle={`${clients.length} comptes · ${mrr.toLocaleString("fr-FR")} € de MRR`}
        actions={
          <>
            <button className="rounded-xl border border-border bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Importer</button>
            <button className="btn-brand rounded-xl px-4 py-2 text-sm font-medium">+ Ajouter un client</button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Clients actifs" value="142" delta="+9" trend="up" hint="ce mois" />
        <StatCard label="En onboarding" value="8" delta="+3" trend="up" hint="à activer" />
        <StatCard label="À risque" value="4" delta="-1" trend="up" hint="churn surveillé" />
        <StatCard label="MRR total" value="84 250 €" delta="+12,4 %" trend="up" hint="vs mois dernier" />
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
          {["Tous", "Actifs", "Onboarding", "À risque", "En pause"].map((f, i) => (
            <button key={f} className={`rounded-lg px-3 py-1.5 text-sm ${i === 0 ? "bg-white/10 text-ink" : "text-ink-soft hover:bg-white/5"}`}>{f}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-dim">
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">MRR</th>
                <th className="p-4 font-medium">Leads 30j</th>
                <th className="p-4 font-medium">ROAS</th>
                <th className="p-4 font-medium">Responsable</th>
                <th className="p-4 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((c) => (
                <tr key={c.id} className="transition hover:bg-white/[0.02]">
                  <td className="p-4">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-ink-dim">{c.trade} · {c.city} · client depuis {c.since}</p>
                  </td>
                  <td className="p-4"><Badge tone={planTone[c.plan]}>{c.plan}</Badge></td>
                  <td className="p-4 font-medium tabular-nums">{c.mrr} €</td>
                  <td className="p-4 tabular-nums text-ink-soft">{c.leads30d}</td>
                  <td className="p-4 tabular-nums font-medium text-accent">{c.roas}×</td>
                  <td className="p-4 text-ink-soft">{c.owner}</td>
                  <td className="p-4"><Badge tone={statusTone[c.status]}>{c.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
