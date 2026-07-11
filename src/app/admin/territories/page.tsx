import { PageHeader } from "@/components/dashboard/Shell";
import { Badge, Card, Progress, StatCard } from "@/components/ui";
import { territories } from "@/lib/data";

const statusTone: Record<string, "accent" | "warn" | "neutral"> = {
  disponible: "accent", réservé: "warn", occupé: "neutral",
};

export default function TerritoriesPage() {
  const available = territories.filter((t) => t.status === "disponible").length;
  return (
    <>
      <PageHeader
        title="Territoires"
        subtitle={`${territories.length} zones · ${available} disponibles à la réservation`}
        actions={<button className="btn-brand rounded-xl px-4 py-2 text-sm font-medium">+ Créer une zone</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Zones actives" value="9" delta="+2" trend="up" hint="région Rhône" />
        <StatCard label="Disponibles" value={String(available)} delta="ouvertes" trend="flat" hint="à vendre" />
        <StatCard label="Taux d'occupation" value="55 %" delta="+8 pts" trend="up" hint="ce trimestre" />
        <StatCard label="Demande moyenne" value="70/100" delta="forte" trend="up" hint="indice marché" />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {territories.map((t) => (
          <Card key={t.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-ink-dim">{t.trade} · {t.region}</p>
              </div>
              <Badge tone={statusTone[t.status]}>{t.status}</Badge>
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs text-ink-dim">
                <span>Indice de demande</span>
                <span className="tabular-nums">{t.demand}/100</span>
              </div>
              <Progress value={t.demand} tone={t.demand > 75 ? "accent" : t.demand > 60 ? "warn" : "neutral"} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
              <span className="text-ink-dim">{t.population.toLocaleString("fr-FR")} habitants</span>
              {t.holder ? (
                <span className="text-ink-soft">Titulaire : {t.holder}</span>
              ) : (
                <button className="text-brand-2 hover:underline">Attribuer</button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
