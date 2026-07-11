import { PageHeader } from "@/components/dashboard/Shell";
import { Badge, Card, StatCard } from "@/components/ui";
import { IconInvoice } from "@/components/icons";
import { invoices } from "@/lib/data";

const statusTone: Record<string, "accent" | "warn" | "danger" | "neutral"> = {
  "payée": "accent", "en attente": "warn", "en retard": "danger", brouillon: "neutral",
};

export default function InvoicingPage() {
  const paid = invoices.filter((i) => i.status === "payée").reduce((s, i) => s + i.amount, 0);
  const pending = invoices.filter((i) => i.status !== "payée").reduce((s, i) => s + i.amount, 0);
  return (
    <>
      <PageHeader
        title="Facturation"
        subtitle="Suivi des factures et des abonnements clients"
        actions={
          <>
            <button className="rounded-xl border border-border bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Exporter</button>
            <button className="btn-brand rounded-xl px-4 py-2 text-sm font-medium">+ Nouvelle facture</button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Encaissé (juillet)" value={`${paid.toLocaleString("fr-FR")} €`} delta="+11 %" trend="up" hint="ce mois" />
        <StatCard label="En attente" value={`${pending.toLocaleString("fr-FR")} €`} delta="6 factures" trend="flat" hint="à recouvrer" />
        <StatCard label="Taux de paiement" value="94 %" delta="+2 pts" trend="up" hint="dans les délais" />
        <StatCard label="Délai moyen" value="6 j" delta="-1 j" trend="up" hint="après émission" />
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
          {["Toutes", "Payées", "En attente", "En retard", "Brouillons"].map((f, i) => (
            <button key={f} className={`rounded-lg px-3 py-1.5 text-sm ${i === 0 ? "bg-white/10 text-ink" : "text-ink-soft hover:bg-white/5"}`}>{f}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-dim">
                <th className="p-4 font-medium">Facture</th>
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Montant</th>
                <th className="p-4 font-medium">Émise</th>
                <th className="p-4 font-medium">Échéance</th>
                <th className="p-4 font-medium">Statut</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((inv) => (
                <tr key={inv.id} className="transition hover:bg-white/[0.02]">
                  <td className="p-4 font-medium">
                    <span className="flex items-center gap-2"><IconInvoice width={16} height={16} className="text-ink-dim" /> {inv.id}</span>
                  </td>
                  <td className="p-4 text-ink-soft">{inv.client}</td>
                  <td className="p-4 font-medium tabular-nums">{inv.amount.toLocaleString("fr-FR")} €</td>
                  <td className="p-4 text-ink-dim">{inv.issued}</td>
                  <td className="p-4 text-ink-dim">{inv.due}</td>
                  <td className="p-4"><Badge tone={statusTone[inv.status]}>{inv.status}</Badge></td>
                  <td className="p-4"><button className="text-brand-2 hover:underline">PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
