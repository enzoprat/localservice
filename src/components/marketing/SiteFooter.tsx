import Link from "next/link";
import { IconShield } from "@/components/icons";
import { asset } from "@/lib/asset";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-stone">
              <img src={asset("/enzo.png")} alt="Enzo" className="size-9 rounded-full object-cover" />
              <span className="text-lg font-semibold tracking-tight">Enzo</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-stone-soft">
              Je gère votre visibilité en haut de Google avec les Local Services Ads. Vous ne
              payez pas un site : vous payez les appels que vous recevez.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-navy">
              <IconShield width={13} height={13} /> Badge « Garanti par Google »
            </p>
          </div>

          <FooterCol
            title="Le service"
            items={[
              ["Fonctionnement", "#fonctionnement"],
              ["Éligibilité", "#eligibilite"],
              ["Tarif", "#tarif"],
              ["FAQ", "#faq"],
            ]}
          />
          <FooterCol
            title="Espaces"
            items={[
              ["Espace client", "/portal"],
              ["Espace admin", "/admin"],
              ["Vérifier mon éligibilité", "/qualification"],
            ]}
          />
          <FooterCol
            title="Entreprise"
            items={[
              ["À propos", "#"],
              ["Contact", "#"],
              ["Mentions légales", "#"],
              ["Confidentialité", "#"],
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-sm text-stone-dim sm:flex-row">
          <p>© {new Date().getFullYear()} Enzo. Tous droits réservés.</p>
          <p>Une seule entreprise par métier et par zone.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-stone">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {items.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-sm text-stone-soft transition-colors hover:text-navy">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
