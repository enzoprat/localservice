"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconLogo, IconMenu, IconX, IconPhone } from "@/components/icons";

const links = [
  { href: "#fonctionnement", label: "Fonctionnement" },
  { href: "#eligibilite", label: "Éligibilité" },
  { href: "#tarif", label: "Tarif" },
  { href: "#faq", label: "FAQ" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all sm:px-5 ${
          scrolled ? "border border-line bg-white/85 shadow-sm backdrop-blur" : "border border-transparent"
        }`}
        style={{ marginInline: "max(1rem, calc((100% - 72rem)/2))" }}
      >
        <Link href="/" className="flex items-center gap-2.5 text-stone">
          <IconLogo />
          <span className="text-lg font-semibold tracking-tight">Jacob</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-underline text-sm text-stone-soft hover:text-stone">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+33000000000" className="flex items-center gap-1.5 text-sm font-medium text-stone hover:text-navy">
            <IconPhone width={15} height={15} /> Être rappelé
          </a>
          <Link
            href="#formulaire"
            className="btn-terre rounded-xl px-4 py-2 text-sm font-medium"
          >
            Vérifier mon éligibilité
          </Link>
        </div>

        <button
          className="grid size-9 place-items-center rounded-lg border border-line text-stone-soft md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl border border-line bg-white p-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-stone-soft hover:bg-sand"
              >
                {l.label}
              </a>
            ))}
            <div className="my-2 h-px bg-line" />
            <a href="tel:+33000000000" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-soft hover:bg-sand">
              <IconPhone width={15} height={15} /> Être rappelé sous 24 h
            </a>
            <Link href="#formulaire" onClick={() => setOpen(false)} className="btn-terre mt-1 rounded-xl px-4 py-2.5 text-center text-sm font-medium">
              Vérifier mon éligibilité
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
