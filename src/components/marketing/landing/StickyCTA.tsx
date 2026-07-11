"use client";

import { useEffect, useState } from "react";
import { IconArrow } from "@/components/icons";
import { FORM_ID, useLead } from "./LeadContext";

export function StickyCTA() {
  const { goToForm } = useLead();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById(FORM_ID);
    let scrolled = false;
    let formInView = false;

    const update = () => setVisible(scrolled && !formInView);

    const onScroll = () => {
      scrolled = window.scrollY > 500;
      update();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let obs: IntersectionObserver | undefined;
    if (form) {
      obs = new IntersectionObserver(
        ([e]) => {
          formInView = e.isIntersecting;
          update();
        },
        { threshold: 0.1 },
      );
      obs.observe(form);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur transition-transform sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        type="button"
        onClick={() => goToForm()}
        className="btn-terre flex h-12 w-full items-center justify-center gap-2 rounded-xl text-base font-semibold"
      >
        Vérifier mon éligibilité <IconArrow width={18} height={18} />
      </button>
    </div>
  );
}
