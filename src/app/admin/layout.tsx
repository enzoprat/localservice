"use client";

import { DashboardShell, type NavGroup } from "@/components/dashboard/Shell";
import {
  IconGrid, IconUsers, IconTarget, IconFunnel, IconSpark, IconInvoice,
  IconMap, IconCalendar, IconShield, IconLife, IconSettings,
} from "@/components/icons";

const groups: NavGroup[] = [
  {
    title: "Pilotage",
    items: [
      { href: "/admin", label: "Tableau de bord", icon: IconGrid },
      { href: "/admin/clients", label: "Clients", icon: IconUsers, badge: "142" },
      { href: "/admin/leads", label: "Leads", icon: IconTarget, badge: "8" },
      { href: "/admin/pipeline", label: "Pipeline", icon: IconFunnel },
    ],
  },
  {
    title: "Acquisition",
    items: [
      { href: "/admin/prospects", label: "Prospects", icon: IconSpark },
      { href: "/admin/territories", label: "Territoires", icon: IconMap },
      { href: "/admin/calendar", label: "Calendrier", icon: IconCalendar },
    ],
  },
  {
    title: "Finance & support",
    items: [
      { href: "/admin/invoicing", label: "Facturation", icon: IconInvoice },
      { href: "/admin/disputes", label: "Litiges", icon: IconShield, badge: "2" },
      { href: "/admin/support", label: "Support", icon: IconLife },
      { href: "/admin/settings", label: "Réglages", icon: IconSettings },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      groups={groups}
      role="Admin"
      roleLabel="Console d'administration"
      userName="Nadia Benali"
      userMeta="Growth Manager"
      switchHref="/portal"
      switchLabel="→ Voir le portail client"
    >
      {children}
    </DashboardShell>
  );
}
