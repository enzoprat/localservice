import { PageHeader } from "@/components/dashboard/Shell";
import { Badge, Card } from "@/components/ui";
import { IconLife, IconPhone, IconSpark } from "@/components/icons";

const myTickets = [
  { id: "SUP-227", subject: "Ajouter un utilisateur à mon compte", status: "résolu", updated: "hier" },
  { id: "SUP-219", subject: "Question sur le suivi des appels", status: "résolu", updated: "il y a 5 j" },
];

const statusTone: Record<string, "accent" | "warn" | "brand"> = { "résolu": "accent", ouvert: "warn", "en cours": "brand" };

export default function PortalSupportPage() {
  return (
    <>
      <PageHeader title="Support" subtitle="Une question ? Nous sommes là pour vous" />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: IconPhone, title: "Appeler mon manager", desc: "Nadia Benali · réponse immédiate", cta: "Appeler" },
          { icon: IconLife, title: "Ouvrir un ticket", desc: "Réponse sous 18 min en moyenne", cta: "Nouveau ticket" },
          { icon: IconSpark, title: "Centre d'aide", desc: "Guides et réponses aux questions fréquentes", cta: "Consulter" },
        ].map((c) => (
          <Card key={c.title} className="flex flex-col">
            <div className="grid size-11 place-items-center rounded-xl bg-brand/15 text-brand"><c.icon /></div>
            <p className="mt-4 font-medium">{c.title}</p>
            <p className="mt-1 flex-1 text-sm text-ink-dim">{c.desc}</p>
            <button className="btn-brand mt-4 rounded-xl px-4 py-2 text-sm font-medium">{c.cta}</button>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <p className="mb-4 text-sm font-medium">Envoyer un message</p>
        <div className="space-y-3">
          <input placeholder="Sujet" className="w-full rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm outline-none placeholder:text-ink-dim focus:border-brand" />
          <textarea rows={4} placeholder="Décrivez votre demande…" className="w-full resize-none rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm outline-none placeholder:text-ink-dim focus:border-brand" />
          <div className="flex justify-end">
            <button className="btn-brand rounded-xl px-5 py-2.5 text-sm font-medium">Envoyer</button>
          </div>
        </div>
      </Card>

      <Card className="mt-6 overflow-hidden p-0">
        <p className="border-b border-border p-4 text-sm font-medium">Mes tickets</p>
        <div className="divide-y divide-border">
          {myTickets.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">{t.subject}</p>
                <p className="text-xs text-ink-dim">{t.id} · MAJ {t.updated}</p>
              </div>
              <Badge tone={statusTone[t.status]}>{t.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
