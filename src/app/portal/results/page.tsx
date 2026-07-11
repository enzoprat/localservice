import { PageHeader } from "@/components/dashboard/Shell";
import { AreaChart, BarChart, Badge, Card, Donut, StatCard } from "@/components/ui";
import { channelSplit, leadsSeries, portalKpis, revenueLabels, revenueSeries } from "@/lib/data";

export default function ResultsPage() {
  return (
    <>
      <PageHeader
        title="Résultats"
        subtitle="Analyse détaillée de vos performances"
        actions={
          <div className="flex overflow-hidden rounded-xl border border-border">
            {["7 j", "30 j", "90 j", "12 m"].map((v, i) => (
              <button key={v} className={`px-3 py-2 text-sm ${i === 2 ? "bg-white/10 text-ink" : "text-ink-soft hover:bg-white/5"}`}>{v}</button>
            ))}
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {portalKpis.map((k) => (<StatCard key={k.label} {...k} />))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">Évolution du CA attribué</p>
            <Badge tone="accent">+27 %</Badge>
          </div>
          <AreaChart data={revenueSeries} labels={revenueLabels} height={210} color="#23e6a8" />
        </Card>
        <Card>
          <p className="text-sm font-medium">Sources de leads</p>
          <p className="mb-4 text-xs text-ink-dim">Répartition par canal</p>
          <Donut data={channelSplit} />
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-sm font-medium">Leads par mois</p>
          <p className="mb-4 text-xs text-ink-dim">12 derniers mois</p>
          <BarChart data={leadsSeries} color="#7c5cff" />
        </Card>
        <Card>
          <p className="mb-4 text-sm font-medium">Détail des campagnes</p>
          <div className="space-y-3">
            {[
              ["Google Ads · Rénovation", "1 480 €", "5,9×", "accent"],
              ["Meta Ads · Cuisine", "620 €", "4,2×", "brand"],
              ["SEO local", "290 €", "8,1×", "blue"],
            ].map(([name, spend, roas]) => (
              <div key={name} className="flex items-center justify-between rounded-xl border border-border bg-white/[0.02] p-3">
                <div>
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-ink-dim">Dépense : {spend}</p>
                </div>
                <Badge tone="accent">ROAS {roas}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
