import Link from "next/link";
import { AuthShell } from "@/components/marketing/AuthShell";
import { IconArrow, IconCheck, IconPhone } from "@/components/icons";

export default function ConfirmationPage() {
  const steps = [
    { title: "Demande reçue", desc: "Votre zone est mise en attente pour votre métier. Je vous rappelle sous 24 h.", now: true },
    { title: "Montage du dossier (15 min)", desc: "On rassemble Kbis, assurance décennale et identité pour la vérification Google.", now: false },
    { title: "Vérification par Google", desc: "Google contrôle votre dossier et vous décerne son badge de confiance.", now: false },
    { title: "Activation de votre zone", desc: "Votre annonce passe en ligne et la gestion démarre. Vous ne payez que les appels réellement reçus.", now: false },
  ];
  return (
    <AuthShell>
      <div className="light-card p-8 text-center animate-fadeup">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-gg/10 text-gg">
          <IconCheck width={32} height={32} />
        </div>
        <span className="mx-auto mt-5 inline-flex items-center gap-1.5 rounded-full border border-gg/30 bg-gg/10 px-3 py-1 text-xs font-medium text-gg">
          Demande enregistrée
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone">C&apos;est bien noté, merci !</h1>
        <p className="mx-auto mt-3 max-w-md text-stone-soft">
          Votre zone est mise en attente. Voici les étapes jusqu&apos;au moment où votre téléphone se met à sonner.
        </p>

        <ol className="mt-8 space-y-4 text-left">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${s.now ? "bg-gg text-white" : "border border-line text-stone-dim"}`}>
                  {s.now ? <IconCheck width={16} height={16} /> : i + 1}
                </span>
                {i < steps.length - 1 && <span className="mt-1 h-8 w-px bg-line" />}
              </div>
              <div className="pb-1">
                <p className="text-sm font-medium text-stone">{s.title}</p>
                <p className="text-sm text-stone-soft">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 rounded-xl border border-line bg-sand px-4 py-3 text-sm text-stone-soft">
          <IconCheck width={15} height={15} className="mr-1 inline text-gg" />
          400 €/mois de gestion, plus les appels facturés en direct par Google.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="tel:+33000000000" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-sm font-medium text-stone hover:bg-sand">
            <IconPhone width={16} height={16} /> Être rappelé plus vite
          </a>
          <Link href="/portal" className="btn-terre flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium">
            Découvrir le portail <IconArrow width={16} height={16} />
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
