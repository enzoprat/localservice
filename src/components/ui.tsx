import * as React from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ----------------------------- Badge ----------------------------- */

type Tone = "brand" | "accent" | "warn" | "danger" | "neutral" | "blue";

const toneMap: Record<Tone, string> = {
  brand: "bg-brand/15 text-brand border-brand/30",
  accent: "bg-accent/15 text-accent border-accent/30",
  warn: "bg-warn/15 text-warn border-warn/30",
  danger: "bg-danger/15 text-danger border-danger/30",
  neutral: "bg-white/5 text-ink-soft border-white/10",
  blue: "bg-brand-2/15 text-brand-2 border-brand-2/30",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Dot({ tone = "accent" }: { tone?: Tone }) {
  const c = {
    brand: "bg-brand",
    accent: "bg-accent",
    warn: "bg-warn",
    danger: "bg-danger",
    neutral: "bg-ink-dim",
    blue: "bg-brand-2",
  }[tone];
  return <span className={cn("size-1.5 rounded-full", c)} />;
}

/* ---------------------------- Card ------------------------------ */

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("card p-5", className)}>{children}</div>;
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-ink-dim">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* ------------------------- KPI Stat card ------------------------- */

export function StatCard({
  label,
  value,
  delta,
  trend,
  hint,
}: {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  hint: string;
}) {
  const trendColor =
    trend === "up" ? "text-accent" : trend === "down" ? "text-danger" : "text-ink-dim";
  return (
    <div className="card group relative overflow-hidden p-5">
      <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-brand/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />
      <p className="text-sm text-ink-dim">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        <span className={cn("text-sm font-medium", trendColor)}>
          {trend === "up" ? "▲" : trend === "down" ? "▼" : "•"} {delta}
        </span>
      </div>
      <p className="mt-1 text-xs text-ink-dim">{hint}</p>
    </div>
  );
}

/* ------------------------- Charts (SVG) -------------------------- */

export function AreaChart({
  data,
  labels,
  height = 180,
  color = "#7c5cff",
}: {
  data: number[];
  labels?: string[];
  height?: number;
  color?: string;
}) {
  const w = 640;
  const h = height;
  const pad = 8;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  const points = data.map((d, i) => {
    const x = pad + i * step;
    const y = pad + (1 - (d - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
  const area = `${line} L ${points[points.length - 1][0]} ${h} L ${points[0][0]} ${h} Z`;
  const id = React.useId();

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
        <defs>
          <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#g-${id})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill={color} className="opacity-0 hover:opacity-100" />
        ))}
      </svg>
      {labels && (
        <div className="mt-2 flex justify-between text-[10px] text-ink-dim">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export function BarChart({
  data,
  color = "#5b8cff",
  height = 160,
}: {
  data: number[];
  color?: string;
  height?: number;
}) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 rounded-t-md transition-all hover:opacity-80" style={{ height: `${(d / max) * 100}%`, background: `linear-gradient(to top, ${color}, ${color}55)` }} />
      ))}
    </div>
  );
}

export function Donut({
  data,
  size = 160,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {data.map((d, i) => {
          const len = (d.value / total) * c;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth="16"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-sm">
            <span className="size-2.5 rounded-full" style={{ background: d.color }} />
            <span className="text-ink-soft">{d.label}</span>
            <span className="ml-auto font-medium tabular-nums">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Progress({ value, tone = "brand" }: { value: number; tone?: Tone }) {
  const bar = {
    brand: "bg-brand",
    accent: "bg-accent",
    warn: "bg-warn",
    danger: "bg-danger",
    neutral: "bg-ink-dim",
    blue: "bg-brand-2",
  }[tone];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
      <div className={cn("h-full rounded-full", bar)} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}
