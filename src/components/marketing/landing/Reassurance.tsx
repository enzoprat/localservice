import { IconPhone } from "@/components/icons";
import { Reveal } from "./Reveal";

const points = [
  { title: "Sans engagement", desc: "Vous arrêtez quand vous voulez, sans justification." },
  { title: "Prix fixe, annoncé", desc: "400 €/mois de gestion, offerts le premier mois." },
  { title: "Vérifié par Google", desc: "Ce n'est pas moi qui me certifie, c'est Google." },
  { title: "Une personne, pas une agence", desc: "Un seul interlocuteur, joignable directement." },
];

export function Reassurance() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-3 sm:grid-cols-2">
        {points.map((p, i) => (
          <Reveal
            key={p.title}
            y={20}
            delay={i * 90}
            className="lift rounded-2xl border border-line bg-white p-5 shadow-sm"
          >
            <p className="font-semibold text-stone">{p.title}</p>
            <p className="mt-1 text-sm text-stone-soft">{p.desc}</p>
          </Reveal>
        ))}
      </div>

      {/* Une personne réelle — nom, visage, téléphone direct.
          TODO: remplacer l'avatar par la vraie photo et le vrai nom/numéro. */}
      <Reveal
        delay={200}
        className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-line bg-white p-5 text-center sm:flex-row sm:text-left"
      >
        <img
          src="/enzo.png"
          alt="Enzo"
          className="size-16 shrink-0 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-semibold text-stone">Enzo — votre interlocuteur</p>
          <p className="mt-1 text-sm text-stone-soft">
            C&apos;est moi qui monte votre dossier, règle vos campagnes et conteste les faux appels.
            Une seule personne, que vous pouvez appeler quand vous voulez.
          </p>
        </div>
        <a
          href="tel:+33000000000"
          className="flex items-center gap-2 rounded-xl border border-line bg-sand px-5 py-3 text-sm font-medium text-stone hover:bg-sand-2"
        >
          <IconPhone width={16} height={16} /> 00 00 00 00 00
        </a>
      </Reveal>
    </div>
  );
}
