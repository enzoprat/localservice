"use client";

import { useEffect, useRef, useState, type ElementType, type CSSProperties } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  /** Décalage vertical de départ (px). */
  y?: number;
  /** Décalage horizontal de départ (px). */
  x?: number;
  /** Échelle de départ (1 = aucune). */
  scale?: number;
  /** Délai avant l'entrée (ms) — sert à chorégraphier en cascade. */
  delay?: number;
  /** Rejoue à chaque entrée dans le viewport au lieu d'une seule fois. */
  repeat?: boolean;
  style?: CSSProperties;
};

export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  y = 24,
  x = 0,
  scale = 1,
  delay = 0,
  repeat = false,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (!repeat) obs.disconnect();
        } else if (repeat) {
          setShown(false);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [repeat]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={
        {
          "--rv-y": `${y}px`,
          "--rv-x": `${x}px`,
          "--rv-s": scale,
          "--d": `${delay}ms`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
