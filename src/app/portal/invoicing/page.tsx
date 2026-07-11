import { PageHeader } from "@/components/dashboard/Shell";
import { Badge, Card, StatCard } from "@/components/ui";
import { IconInvoice } from "@/components/icons";
import { clientInvoices } from "@/lib/data";

const statusTone: Record<string, "accent" | "warn" | "danger" | "neutral"> = {
  "payée": "accent", "en attente": "warn", "en retard": "danger", brouillon: "neutral",
};

export default function PortalInvoicingPage() {
  return (
    <>
      <PageHeader
        title="Facturation"
        subtitle="Vos factures et votre abonnement"
        actions={<button className="rounded-xl border border-border bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Télécharger tout</button>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-dim">Abonnement actuel</p>
              <p className="text-xl font-semibold">Plan Domination</p>
            </div>
            <Badge tone="brand">Actif</Badge>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              ["Montant mensuel", "1 490 €"],
              ["Prochaine échéance", "01/08/2026"],
              ["Moyen de paiement", "Prélèvement SEPA"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-xs text-ink-dim">{k}</p>
                <p className="mt-1 text-sm font-medium">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-2 border-t border-border pt-4">
            <button className="rounded-xl border border-border bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Changer de plan</button>
            <button className="rounded-xl border border-border bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Modifier le paiement</button>
          </div>
        </Card>

        <StatCard label="Total payé (année)" value="8 940 €" delta="6 factures" trend="flat" hint="depuis janvier" />
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <p className="border-b border-border p-4 text-sm font-medium">Historique des factures</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-dim">
                <th className="p-4 font-medium">Facture</th>
                <th className="p-4 font-medium">Montant</th>
                <th className="p-4 font-medium">Émise</th>
                <th className="p-4 font-medium">Statut</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clientInvoices.map((inv) => (
                <tr key={inv.id} className="transition hover:bg-white/[0.02]">
                  <td className="p-4 font-medium"><span className="flex items-center gap-2"><IconInvoice width={16} height={16} className="text-ink-dim" /> {inv.id}</span></td>
                  <td className="p-4 tabular-nums">{inv.amount.toLocaleString("fr-FR")} €</td>
                  <td className="p-4 text-ink-dim">{inv.issued}</td>
                  <td className="p-4"><Badge tone={statusTone[inv.status]}>{inv.status}</Badge></td>
                  <td className="p-4"><button className="text-brand-2 hover:underline">Télécharger</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
