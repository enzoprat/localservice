"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  IconGoogleG,
  IconCheck,
  IconShield,
  IconInvoice,
  IconLock,
} from "@/components/icons";

// Les contrôles réels que Google effectue avant d'accorder le badge
// « Garanti par Google » dans le programme Local Services. Rien d'inventé :
// ce sont les vérifications que le prospect voit sur votre fiche.
type Item = { label: ReactNode; icon: ReactNode; brand?: boolean };

const items: Item[] = [
  {
    label: (
      <>
        Garanti par <span className="font-semibold">Google</span>
      </>
    ),
    icon: <IconGoogleG width={16} height={16} />,
    brand: true,
  },
  { label: "Kbis vérifié", icon: <IconInvoice width={14} height={14} /> },
  { label: "Assurance vérifiée", icon: <IconShield width={14} height={14} /> },
  { label: "Identité contrôlée", icon: <IconLock width={13} height={13} /> },
];

export function TrustBadges({
  className = "",
  style,
  tone = "light",
}: {
  className?: string;
  style?: CSSProperties;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      <p
        className={`text-center text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-500 ${
          tone === "dark" ? "text-white/55" : "text-stone-dim"
        }`}
        style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(6px)" }}
      >
        Contrôlé, vérifié et affiché par Google
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
        {items.map((it, i) => (
          <span
            key={i}
            className={`trust-chip inline-flex items-center gap-2 rounded-full border bg-white py-1.5 pl-2 pr-3 text-xs font-medium shadow-sm transition-all duration-500 ${
              it.brand ? "border-gg/30 text-navy" : "border-line text-stone"
            }`}
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(10px)",
              transitionDelay: `${120 + i * 110}ms`,
            }}
          >
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-full ${
                it.brand ? "bg-white ring-1 ring-line" : "bg-navy/5 text-navy"
              }`}
            >
              {it.icon}
            </span>
            {it.label}
            <span
              className="grid size-4 shrink-0 place-items-center rounded-full bg-gg text-white"
              style={{
                transform: shown ? "scale(1)" : "scale(0)",
                transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                transitionDelay: `${360 + i * 110}ms`,
              }}
            >
              <IconCheck width={9} height={9} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
