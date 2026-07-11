"use client";

import { createContext, useCallback, useContext, useState } from "react";

type Lead = {
  trade: string;
  zip: string;
  capacity: string; // chantiers/mois souhaités ("" si non défini)
};

type LeadCtx = Lead & {
  set: (patch: Partial<Lead>) => void;
  goToForm: (patch?: Partial<Lead>) => void;
};

const Ctx = createContext<LeadCtx | null>(null);

export const FORM_ID = "formulaire";

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [lead, setLead] = useState<Lead>({ trade: "", zip: "", capacity: "" });

  const set = useCallback((patch: Partial<Lead>) => {
    setLead((prev) => ({ ...prev, ...patch }));
  }, []);

  const goToForm = useCallback(
    (patch?: Partial<Lead>) => {
      if (patch) setLead((prev) => ({ ...prev, ...patch }));
      requestAnimationFrame(() => {
        document.getElementById(FORM_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [],
  );

  return <Ctx.Provider value={{ ...lead, set, goToForm }}>{children}</Ctx.Provider>;
}

export function useLead() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLead must be used within LeadProvider");
  return c;
}

// Formatage euros à la française : 15000 -> "15 000 €"
export function euro(n: number) {
  return `${Math.round(n).toLocaleString("fr-FR")} €`;
}
