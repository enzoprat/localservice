import { PageHeader } from "@/components/dashboard/Shell";
import { Badge, Card, Progress, StatCard } from "@/components/ui";
import { IconPhone } from "@/components/icons";
import { leads } from "@/lib/data";

const statusTone: Record<string, "brand" | "accent" | "warn" | "danger" | "neutral" | "blue"> = {
  nouveau: "blue", contacté: "warn", rdv: "brand", gagné: "accent", perdu: "danger",
};

export default function LeadsPage() {
  const totalValue = leads.reduce((s, l) => s + l.value, 0);
  return (
    <>
      <PageHeader
        title="Leads"
        subtitle={`${leads.length} leads récents · ${totalValue.toLocaleString("fr-FR")} € de pipeline`}
        actions={<button className="btn-brand rounded-xl px-4 py-2 text-sm font-medium">Distribuer les leads</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Nouveaux (24h)" value="12" delta="+4" trend="up" hint="à traiter" />
        <StatCard label="RDV planifiés" value="27" delta="+8" trend="up" hint="cette semaine" />
        <StatCard label="Taux de gain" value="31 %" delta="+3 pts" trend="up" hint="30 derniers jours" />
        <StatCard label="Coût par lead" value="11,40 €" delta="-6 %" trend="up" hint="en baisse" />
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border p-4">
          <div className="flex flex-wrap gap-2">
            {["Tous", "Nouveau", "Contacté", "RDV", "Gagné", "Perdu"].map((f, i) => (
              <button key={f} className={`rounded-lg px-3 py-1.5 text-sm ${i === 0 ? "bg-white/10 text-ink" : "text-ink-soft hover:bg-white/5"}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-dim">
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Service</th>
                <th className="p-4 font-medium">Canal</th>
                <th className="p-4 font-medium">Score</th>
                <th className="p-4 font-medium">Valeur</th>
                <th className="p-4 font-medium">Statut</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map((l) => (
                <tr key={l.id} className="transition hover:bg-white/[0.02]">
                  <td className="p-4">
                    <p className="font-medium">{l.name}</p>
                    <p className="text-xs text-ink-dim">{l.city} · {l.createdAt}</p>
                  </td>
                  <td className="p-4 text-ink-soft">{l.service}</td>
                  <td className="p-4"><Badge tone="neutral">{l.channel}</Badge></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16"><Progress value={l.score} tone={l.score > 80 ? "accent" : l.score > 60 ? "warn" : "danger"} /></div>
                      <span className="text-xs tabular-nums text-ink-dim">{l.score}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium tabular-nums">{l.value.toLocaleString("fr-FR")} €</td>
                  <td className="p-4"><Badge tone={statusTone[l.status]}>{l.status}</Badge></td>
                  <td className="p-4">
                    <button className="grid size-8 place-items-center rounded-lg border border-border text-ink-soft hover:bg-white/5"><IconPhone width={15} height={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
