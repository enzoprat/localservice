"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AuthShell } from "@/components/marketing/AuthShell";
import { IconArrow, IconLock } from "@/components/icons";

export default function PortalAccessPage() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const filled = code.every((c) => c !== "");

  function set(i: number, v: string) {
    const digit = v.replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (digit && i < 5) refs.current[i + 1]?.focus();
  }

  return (
    <AuthShell>
      <div className="light-card p-8 text-center animate-fadeup">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-navy/10 text-navy">
          <IconLock width={26} height={26} />
        </div>
        <span className="mx-auto mt-5 inline-flex items-center gap-1.5 rounded-full border border-line bg-sand px-3 py-1 text-xs font-medium text-navy">
          Accès sécurisé
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-stone">Accédez à votre portail</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-stone-soft">
          Saisissez le code à 6 chiffres envoyé par SMS au numéro associé à votre compte.
        </p>

        <div className="mt-7 flex justify-center gap-2.5">
          {code.map((c, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={c}
              onChange={(e) => set(i, e.target.value)}
              inputMode="numeric"
              maxLength={1}
              className="size-12 rounded-xl border border-line bg-white text-center text-lg font-semibold text-stone outline-none focus:border-navy"
            />
          ))}
        </div>

        <Link
          href={filled ? "/portal" : "#"}
          aria-disabled={!filled}
          className={`btn-terre mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium ${!filled ? "pointer-events-none opacity-40" : ""}`}
        >
          Se connecter <IconArrow width={16} height={16} />
        </Link>

        <p className="mt-5 text-sm text-stone-soft">
          Vous n&apos;avez pas reçu de code ?{" "}
          <button className="font-medium text-navy hover:underline">Renvoyer</button>
        </p>
      </div>
      <p className="mt-4 text-center text-xs text-stone-soft">
        Un problème ? <Link href="/qualification" className="font-medium text-navy hover:underline">Contactez-nous</Link>
      </p>
    </AuthShell>
  );
}
