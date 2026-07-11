import { PageHeader } from "@/components/dashboard/Shell";
import { Badge, Card, StatCard } from "@/components/ui";
import { prospects } from "@/lib/data";

const tempTone: Record<string, "danger" | "warn" | "accent"> = {
  froid: "danger", tiède: "warn", chaud: "accent",
};
const stageTone: Record<string, "neutral" | "blue" | "warn" | "brand"> = {
  "à qualifier": "neutral", qualifié: "blue", proposition: "warn", négociation: "brand",
};

export default function ProspectsPage() {
  const potential = prospects.reduce((s, p) => s + p.potential, 0);
  return (
    <>
      <PageHeader
        title="Prospects"
        subtitle={`${prospects.length} prospects actifs · ${potential.toLocaleString("fr-FR")} € de MRR potentiel`}
        actions={<button className="btn-brand rounded-xl px-4 py-2 text-sm font-medium">+ Nouveau prospect</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Prospects chauds" value="3" delta="+2" trend="up" hint="à closer" />
        <StatCard label="En négociation" value="2" delta="+1" trend="up" hint="cette semaine" />
        <StatCard label="Taux de RDV" value="42 %" delta="+6 pts" trend="up" hint="appels → RDV" />
        <StatCard label="Prévision signature" value="68 %" delta="+4 pts" trend="up" hint="fin de mois" />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {prospects.map((p) => (
          <Card key={p.id} className="transition hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-ink-dim">{p.trade} · {p.city}</p>
              </div>
              <Badge tone={tempTone[p.temperature]}>{p.temperature}</Badge>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge tone={stageTone[p.stage]}>{p.stage}</Badge>
              <span className="text-sm font-semibold tabular-nums">{p.potential} € / mois</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-ink-dim">
              <span>Dernier contact : {p.lastTouch}</span>
              <button className="text-brand-2 hover:underline">Relancer</button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
