import { PageHeader } from "@/components/dashboard/Shell";
import { Badge, Card, StatCard } from "@/components/ui";
import { disputes } from "@/lib/data";

const statusTone: Record<string, "warn" | "brand" | "accent" | "danger"> = {
  ouvert: "warn", "en revue": "brand", "résolu": "accent", refusé: "danger",
};

export default function DisputesPage() {
  const open = disputes.filter((d) => d.status === "ouvert" || d.status === "en revue").length;
  return (
    <>
      <PageHeader
        title="Litiges"
        subtitle={`${open} litiges en cours de traitement`}
        actions={<button className="btn-brand rounded-xl px-4 py-2 text-sm font-medium">Nouvelle réclamation</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Litiges ouverts" value="2" delta="-1" trend="up" hint="à arbitrer" />
        <StatCard label="Crédités ce mois" value="220 €" delta="12 leads" trend="flat" hint="remboursés" />
        <StatCard label="Taux d'acceptation" value="68 %" delta="stable" trend="flat" hint="des réclamations" />
        <StatCard label="Délai de traitement" value="1,4 j" delta="-0,3 j" trend="up" hint="en moyenne" />
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-dim">
                <th className="p-4 font-medium">Réf.</th>
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Motif</th>
                <th className="p-4 font-medium">Montant</th>
                <th className="p-4 font-medium">Ouvert le</th>
                <th className="p-4 font-medium">Statut</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {disputes.map((d) => (
                <tr key={d.id} className="transition hover:bg-white/[0.02]">
                  <td className="p-4 font-medium">{d.id}</td>
                  <td className="p-4 text-ink-soft">{d.client}</td>
                  <td className="p-4 text-ink-soft">{d.reason}</td>
                  <td className="p-4 font-medium tabular-nums">{d.amount} €</td>
                  <td className="p-4 text-ink-dim">{d.opened}</td>
                  <td className="p-4"><Badge tone={statusTone[d.status]}>{d.status}</Badge></td>
                  <td className="p-4">
                    {(d.status === "ouvert" || d.status === "en revue") ? (
                      <div className="flex gap-2">
                        <button className="rounded-lg bg-accent/15 px-2.5 py-1 text-xs text-accent hover:bg-accent/25">Créditer</button>
                        <button className="rounded-lg bg-danger/15 px-2.5 py-1 text-xs text-danger hover:bg-danger/25">Refuser</button>
                      </div>
                    ) : (
                      <span className="text-xs text-ink-dim">Clôturé</span>
                    )}
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
