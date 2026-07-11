import { PageHeader } from "@/components/dashboard/Shell";
import { Badge } from "@/components/ui";
import { calendarEvents, weekDays } from "@/lib/data";

const typeTone: Record<string, string> = {
  onboarding: "bg-brand/15 text-brand border-brand/30",
  bilan: "bg-brand-2/15 text-brand-2 border-brand-2/30",
  vente: "bg-accent/15 text-accent border-accent/30",
  support: "bg-warn/15 text-warn border-warn/30",
};

const hours = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        title="Calendrier"
        subtitle="Semaine du 6 au 10 juillet 2026"
        actions={
          <>
            <div className="flex overflow-hidden rounded-xl border border-border">
              {["Jour", "Semaine", "Mois"].map((v, i) => (
                <button key={v} className={`px-3 py-2 text-sm ${i === 1 ? "bg-white/10 text-ink" : "text-ink-soft hover:bg-white/5"}`}>{v}</button>
              ))}
            </div>
            <button className="btn-brand rounded-xl px-4 py-2 text-sm font-medium">+ Événement</button>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {Object.keys(typeTone).map((t) => (
          <span key={t} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs capitalize ${typeTone[t]}`}>{t}</span>
        ))}
      </div>

      <div className="card overflow-x-auto p-0">
        <div className="grid min-w-[720px] grid-cols-[64px_repeat(5,1fr)]">
          <div className="border-b border-r border-border p-3" />
          {weekDays.map((d, i) => (
            <div key={d} className="border-b border-r border-border p-3 text-center last:border-r-0">
              <p className="text-sm font-medium">{d}</p>
              <p className="text-xs text-ink-dim">{6 + i} juil.</p>
            </div>
          ))}

          {hours.map((h) => (
            <div key={h} className="contents">
              <div className="border-b border-r border-border p-2 text-right text-xs text-ink-dim">{h}</div>
              {weekDays.map((_, day) => {
                const ev = calendarEvents.find((e) => e.day === day && e.start === h);
                return (
                  <div key={day} className="min-h-14 border-b border-r border-border p-1.5 last:border-r-0">
                    {ev && (
                      <div className={`rounded-lg border p-2 text-xs ${typeTone[ev.type]}`}>
                        <p className="font-medium leading-tight">{ev.title}</p>
                        <p className="mt-0.5 opacity-80">{ev.client}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Badge tone="neutral">7 rendez-vous cette semaine</Badge>
        <Badge tone="brand">2 onboardings</Badge>
        <Badge tone="accent">2 démos de vente</Badge>
      </div>
    </>
  );
}
