import { PageHeader } from "@/components/dashboard/Shell";
import { Badge, Card, StatCard } from "@/components/ui";
import { tickets } from "@/lib/data";

const statusTone: Record<string, "warn" | "brand" | "accent"> = {
  ouvert: "warn", "en cours": "brand", "résolu": "accent",
};
const prioTone: Record<string, "neutral" | "blue" | "warn" | "danger"> = {
  basse: "neutral", normale: "blue", haute: "warn", urgente: "danger",
};

export default function SupportPage() {
  return (
    <>
      <PageHeader
        title="Support"
        subtitle="File de tickets et satisfaction client"
        actions={<button className="btn-brand rounded-xl px-4 py-2 text-sm font-medium">+ Ticket</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tickets ouverts" value="3" delta="-2" trend="up" hint="en file" />
        <StatCard label="Temps de réponse" value="18 min" delta="-5 min" trend="up" hint="1er contact" />
        <StatCard label="Résolus (7j)" value="24" delta="+6" trend="up" hint="cette semaine" />
        <StatCard label="Satisfaction" value="4,8/5" delta="+0,2" trend="up" hint="CSAT" />
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
          {["Tous", "Ouverts", "En cours", "Résolus"].map((f, i) => (
            <button key={f} className={`rounded-lg px-3 py-1.5 text-sm ${i === 0 ? "bg-white/10 text-ink" : "text-ink-soft hover:bg-white/5"}`}>{f}</button>
          ))}
        </div>
        <div className="divide-y divide-border">
          {tickets.map((t) => (
            <div key={t.id} className="flex flex-wrap items-center gap-4 p-4 transition hover:bg-white/[0.02]">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink-dim">{t.id}</span>
                  <Badge tone={prioTone[t.priority]}>{t.priority}</Badge>
                </div>
                <p className="mt-1 font-medium">{t.subject}</p>
                <p className="text-xs text-ink-dim">{t.client} · MAJ {t.updated}</p>
              </div>
              <div className="text-right">
                <Badge tone={statusTone[t.status]}>{t.status}</Badge>
                <p className="mt-1.5 text-xs text-ink-dim">Agent : {t.agent}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
