import { PageHeader } from "@/components/dashboard/Shell";
import { Badge } from "@/components/ui";
import { pipeline } from "@/lib/data";

const stageTone: Record<string, string> = {
  qualif: "border-t-ink-dim", qualified: "border-t-brand-2", proposal: "border-t-warn", nego: "border-t-brand", won: "border-t-accent",
};

export default function PipelinePage() {
  const total = pipeline.reduce((s, st) => s + st.cards.reduce((a, c) => a + c.value, 0), 0);
  return (
    <>
      <PageHeader
        title="Pipeline commercial"
        subtitle={`${pipeline.reduce((s, st) => s + st.cards.length, 0)} opportunités · ${total.toLocaleString("fr-FR")} € potentiels`}
        actions={<button className="btn-brand rounded-xl px-4 py-2 text-sm font-medium">+ Opportunité</button>}
      />

      <div className="grid gap-4 lg:grid-cols-5">
        {pipeline.map((stage) => {
          const sum = stage.cards.reduce((a, c) => a + c.value, 0);
          return (
            <div key={stage.key} className={`card border-t-2 p-3 ${stageTone[stage.key]}`}>
              <div className="mb-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-sm font-semibold">{stage.label}</p>
                  <p className="text-xs text-ink-dim">{sum.toLocaleString("fr-FR")} €</p>
                </div>
                <span className="grid size-6 place-items-center rounded-full bg-white/5 text-xs text-ink-soft">{stage.cards.length}</span>
              </div>
              <div className="space-y-2.5">
                {stage.cards.map((c) => (
                  <div key={c.id} className="rounded-xl border border-border bg-white/[0.02] p-3 transition hover:border-brand/40 hover:bg-white/[0.04]">
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="mt-0.5 text-xs text-ink-dim">{c.trade}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold tabular-nums">{c.value} €</span>
                      <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-[10px] font-semibold text-white">
                        {c.owner.split(" ").map((w) => w[0]).join("")}
                      </span>
                    </div>
                  </div>
                ))}
                <button className="w-full rounded-xl border border-dashed border-border py-2 text-xs text-ink-dim transition hover:border-brand/40 hover:text-ink-soft">+ Ajouter</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {["Taux de conversion global : 24 %", "Cycle moyen : 18 jours", "Valeur moyenne : 940 €"].map((s) => (
          <Badge key={s} tone="neutral">{s}</Badge>
        ))}
      </div>
    </>
  );
}
