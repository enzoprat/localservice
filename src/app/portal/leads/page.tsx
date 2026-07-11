import { PageHeader } from "@/components/dashboard/Shell";
import { Badge, Card, StatCard } from "@/components/ui";
import { IconPhone } from "@/components/icons";
import { leads } from "@/lib/data";

const statusTone: Record<string, "brand" | "accent" | "warn" | "danger" | "neutral" | "blue"> = {
  nouveau: "blue", contacté: "warn", rdv: "brand", gagné: "accent", perdu: "danger",
};

export default function PortalLeadsPage() {
  return (
    <>
      <PageHeader
        title="Mes leads"
        subtitle="Toutes vos demandes de devis, en exclusivité"
        actions={<button className="rounded-xl border border-border bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Exporter en CSV</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Nouveaux (30j)" value="63" delta="+21 %" trend="up" hint="17 cette semaine" />
        <StatCard label="RDV obtenus" value="21" delta="+5" trend="up" hint="à honorer" />
        <StatCard label="Devis gagnés" value="12" delta="+3" trend="up" hint="ce mois" />
        <StatCard label="Litige possible" value="1" delta="à signaler" trend="flat" hint="lead hors zone ?" />
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
          {["Tous", "Nouveau", "Contacté", "RDV", "Gagné"].map((f, i) => (
            <button key={f} className={`rounded-lg px-3 py-1.5 text-sm ${i === 0 ? "bg-white/10 text-ink" : "text-ink-soft hover:bg-white/5"}`}>{f}</button>
          ))}
        </div>
        <div className="divide-y divide-border">
          {leads.map((l) => (
            <div key={l.id} className="flex flex-wrap items-center gap-4 p-4 transition hover:bg-white/[0.02]">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
                {l.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{l.name}</p>
                <p className="text-xs text-ink-dim">{l.service} · {l.city} · {l.createdAt}</p>
              </div>
              <span className="hidden text-sm text-ink-soft sm:block">{l.phone}</span>
              <span className="text-sm font-semibold tabular-nums">{l.value.toLocaleString("fr-FR")} €</span>
              <Badge tone={statusTone[l.status]}>{l.status}</Badge>
              <div className="flex gap-2">
                <a href={`tel:${l.phone.replace(/\s/g, "")}`} className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent hover:bg-accent/25"><IconPhone width={15} height={15} /></a>
                <button className="rounded-lg border border-border px-3 py-2 text-xs text-ink-soft hover:bg-white/5">Litige</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
