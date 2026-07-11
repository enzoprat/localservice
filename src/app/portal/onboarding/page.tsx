import { PageHeader } from "@/components/dashboard/Shell";
import { Badge, Card, Progress } from "@/components/ui";
import { IconArrow, IconCheck } from "@/components/icons";
import { onboardingSteps } from "@/lib/data";

export default function OnboardingPage() {
  const done = onboardingSteps.filter((s) => s.done).length;
  const pct = Math.round((done / onboardingSteps.length) * 100);
  return (
    <>
      <PageHeader title="Onboarding" subtitle="Encore quelques étapes avant vos premiers leads" />

      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-dim">Progression de l&apos;installation</p>
            <p className="text-2xl font-semibold">{pct}% terminé</p>
          </div>
          <Badge tone={pct === 100 ? "accent" : "brand"}>{done}/{onboardingSteps.length} étapes</Badge>
        </div>
        <div className="mt-4"><Progress value={pct} tone="accent" /></div>
      </Card>

      <div className="space-y-3">
        {onboardingSteps.map((s, i) => (
          <Card key={s.title} className={`flex items-center gap-4 ${s.done ? "opacity-80" : ""}`}>
            <span className={`grid size-10 shrink-0 place-items-center rounded-xl text-sm font-semibold ${s.done ? "bg-accent/15 text-accent" : "bg-white/5 text-ink-soft"}`}>
              {s.done ? <IconCheck width={18} height={18} /> : i + 1}
            </span>
            <div className="flex-1">
              <p className={`font-medium ${s.done ? "line-through decoration-ink-dim" : ""}`}>{s.title}</p>
              <p className="text-sm text-ink-dim">{s.desc}</p>
            </div>
            {s.done ? (
              <Badge tone="accent">Terminé</Badge>
            ) : (
              <button className="btn-brand flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium">
                Compléter <IconArrow width={15} height={15} />
              </button>
            )}
          </Card>
        ))}
      </div>

      <Card className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-medium">Besoin d&apos;aide pour finaliser ?</p>
          <p className="text-sm text-ink-dim">Votre account manager Nadia est disponible pour vous accompagner.</p>
        </div>
        <button className="rounded-xl border border-border bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Planifier un appel</button>
      </Card>
    </>
  );
}
