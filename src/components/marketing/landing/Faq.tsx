"use client";

import { useRef, useState } from "react";
import { faqs } from "@/lib/data";
import { Reveal } from "./Reveal";

function FaqItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <Reveal y={16} delay={delay}>
      <div
        className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
          open ? "border-navy/25" : "border-line"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-medium text-stone"
        >
          {q}
          <span
            className={`grid size-7 shrink-0 place-items-center rounded-full border text-lg leading-none transition-all duration-300 ${
              open ? "rotate-45 border-navy bg-navy text-white" : "border-line text-stone-soft"
            }`}
          >
            +
          </span>
        </button>
        {/* Volet à hauteur animée */}
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div ref={bodyRef} className="overflow-hidden">
            <p className="px-5 pb-5 text-sm leading-relaxed text-stone-soft">{a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal
          as="h2"
          y={20}
          className="text-center text-3xl font-semibold tracking-tight text-stone sm:text-4xl"
        >
          Les questions que vous vous posez
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}
