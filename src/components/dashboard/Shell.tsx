"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { IconBell, IconLogo, IconMenu, IconSearch, IconX } from "@/components/icons";

export type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: string;
};

export type NavGroup = { title: string; items: NavItem[] };

export function DashboardShell({
  groups,
  role,
  roleLabel,
  userName,
  userMeta,
  switchHref,
  switchLabel,
  children,
}: {
  groups: NavGroup[];
  role: "Admin" | "Client";
  roleLabel: string;
  userName: string;
  userMeta: string;
  switchHref: string;
  switchLabel: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const initials = userName.split(" ").map((w) => w[0]).join("").slice(0, 2);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <IconLogo />
        <div className="leading-tight">
          <p className="text-sm font-semibold">Jacob</p>
          <p className="text-[11px] text-ink-dim">{roleLabel}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4 no-scrollbar">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-ink-dim">{g.title}</p>
            <div className="space-y-0.5">
              {g.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      active ? "bg-brand/15 text-ink" : "text-ink-soft hover:bg-white/5 hover:text-ink"
                    }`}
                  >
                    <item.icon width={18} height={18} className={active ? "text-brand" : "text-ink-dim group-hover:text-ink-soft"} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-brand/20 px-2 py-0.5 text-[10px] font-semibold text-brand">{item.badge}</span>
                    )}
                    {active && <span className="size-1.5 rounded-full bg-brand" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Link href={switchHref} className="mb-2 block rounded-xl border border-border bg-white/[0.02] px-3 py-2 text-center text-xs text-ink-soft transition hover:bg-white/5">
          {switchLabel}
        </Link>
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-xs font-semibold text-white">{initials}</span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-medium">{userName}</p>
            <p className="truncate text-[11px] text-ink-dim">{userMeta}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <div className="aurora opacity-40" />

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-bg-soft/80 backdrop-blur lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-bg-soft lg:hidden">
            {sidebar}
          </aside>
        </>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-bg/70 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button className="grid size-9 place-items-center rounded-lg border border-border text-ink-soft lg:hidden" onClick={() => setOpen(true)} aria-label="Menu">
            <IconMenu />
          </button>
          <div className="relative hidden max-w-sm flex-1 sm:block">
            <IconSearch width={16} height={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-dim" />
            <input
              placeholder="Rechercher un client, un lead…"
              className="w-full rounded-xl border border-border bg-white/[0.02] py-2 pl-9 pr-3 text-sm outline-none placeholder:text-ink-dim focus:border-brand"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden rounded-full border border-border px-3 py-1.5 text-xs text-ink-soft sm:inline">{role}</span>
            <button className="relative grid size-9 place-items-center rounded-lg border border-border text-ink-soft hover:bg-white/5" aria-label="Notifications">
              <IconBell width={18} height={18} />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-danger" />
            </button>
            <button className="grid size-9 place-items-center rounded-lg border border-border text-ink-soft hover:bg-white/5 lg:hidden" onClick={() => setOpen(true)} aria-label="Profil">
              <IconX className="hidden" />
              <span className="text-xs font-semibold">{initials}</span>
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-dim">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
