"use client";

import { DashboardShell, type NavGroup } from "@/components/dashboard/Shell";
import {
  IconGrid, IconChart, IconTarget, IconInvoice, IconLife, IconSpark,
} from "@/components/icons";

const groups: NavGroup[] = [
  {
    title: "Mon activité",
    items: [
      { href: "/portal", label: "Tableau de bord", icon: IconGrid },
      { href: "/portal/results", label: "Résultats", icon: IconChart },
      { href: "/portal/leads", label: "Mes leads", icon: IconTarget, badge: "17" },
    ],
  },
  {
    title: "Mon compte",
    items: [
      { href: "/portal/onboarding", label: "Onboarding", icon: IconSpark },
      { href: "/portal/invoicing", label: "Facturation", icon: IconInvoice },
      { href: "/portal/support", label: "Support", icon: IconLife },
    ],
  },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      groups={groups}
      role="Client"
      roleLabel="Espace client"
      userName="Atelier Bois & Co"
      userMeta="Plan Domination · Lyon"
      switchHref="/admin"
      switchLabel="→ Console admin (démo)"
    >
      {children}
    </DashboardShell>
  );
}
