import Link from "next/link";
import { AuthShell } from "@/components/marketing/AuthShell";
import { IconArrow, IconLock } from "@/components/icons";

export default function UnauthorizedPage() {
  return (
    <AuthShell>
      <div className="light-card p-8 text-center animate-fadeup">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-red-50 text-red-500">
          <IconLock width={30} height={30} />
        </div>
        <span className="mx-auto mt-5 inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
          Accès refusé · 401
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone">Accès non autorisé</h1>
        <p className="mx-auto mt-3 max-w-md text-stone-soft">
          Votre lien d&apos;accès a expiré ou n&apos;est plus valide. Reconnectez-vous avec votre
          code sécurisé pour retrouver votre portail.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-sm font-medium text-stone hover:bg-sand">
            Retour à l&apos;accueil
          </Link>
          <Link href="/portal-access" className="btn-terre flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium">
            Me reconnecter <IconArrow width={16} height={16} />
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
