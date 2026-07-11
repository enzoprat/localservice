import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { EligibilityMap } from "@/components/marketing/EligibilityMap";
import { LeadProvider } from "@/components/marketing/landing/LeadContext";
import { AnimatedHero } from "@/components/marketing/landing/AnimatedHero";
import { SerpMockup } from "@/components/marketing/landing/SerpMockup";
import { ProfitSimulator } from "@/components/marketing/landing/ProfitSimulator";
import { CapacitySimulator } from "@/components/marketing/landing/CapacitySimulator";
import { JourneyTimeline } from "@/components/marketing/landing/JourneyTimeline";
import { ComparatorCards } from "@/components/marketing/landing/ComparatorCards";
import { PricingReceipt } from "@/components/marketing/landing/PricingReceipt";
import { Reassurance } from "@/components/marketing/landing/Reassurance";
import { LeadForm } from "@/components/marketing/landing/LeadForm";
import { StickyCTA } from "@/components/marketing/landing/StickyCTA";
import { ScrollProgress } from "@/components/marketing/landing/ScrollProgress";
import { Reveal } from "@/components/marketing/landing/Reveal";
import { Faq } from "@/components/marketing/landing/Faq";
import { GoogleGuaranteedBadge } from "@/components/marketing/landing/GoogleGuaranteedBadge";
import {
  IconGoogleG,
  IconInvoice,
  IconShield,
  IconTrend,
  IconChart,
  IconMap,
  IconBolt,
} from "@/components/icons";

export default function Home() {
  return (
    <main className="light relative overflow-hidden">
      <ScrollProgress />
      <SiteNav />
      <LeadProvider>
        <AnimatedHero />
        <Serp />
        <Comparator />
        <Profit />
        <section id="eligibilite" className="scroll-mt-24 bg-white py-24">
          <div className="mx-auto max-w-6xl px-5">
            <EligibilityMap />
          </div>
        </section>
        <Capacity />
        <Journey />
        <Pricing />
        <Faq />
        <ReassuranceSection />
        <LeadForm />
        <StickyCTA />
      </LeadProvider>
      <SiteFooter />
    </main>
  );
}

const eyebrowAccent: Record<string, string> = {
  terre: "bg-terre/10 text-terre",
  gg: "bg-gg/10 text-gg",
  gold: "bg-gold/10 text-gold",
  navy: "bg-navy/10 text-navy",
  google: "bg-white text-navy",
};

function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  icon,
  accent = "terre",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "center" | "left";
  icon?: React.ReactNode;
  accent?: "terre" | "gg" | "gold" | "navy" | "google";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto mb-10 max-w-2xl text-center" : ""}>
      {eyebrow && (
        <Reveal as="div" y={14} className={centered ? "flex justify-center" : ""}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 py-1 pl-1.5 pr-3.5 text-xs font-medium uppercase tracking-wide text-navy shadow-sm backdrop-blur">
            {icon && (
              <span
                className={`relative grid size-6 place-items-center rounded-full ${eyebrowAccent[accent]}`}
              >
                <span className="chip-ring absolute inset-0 rounded-full" />
                <span className="icon-breathe grid place-items-center">{icon}</span>
              </span>
            )}
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal
        as="h2"
        y={20}
        delay={eyebrow ? 90 : 0}
        className="mt-4 text-3xl font-semibold tracking-tight text-stone sm:text-4xl"
      >
        {title}
      </Reveal>
      {intro && (
        <Reveal as="p" y={16} delay={180} className="mt-4 text-stone-soft">
          {intro}
        </Reveal>
      )}
    </div>
  );
}

function Serp() {
  return (
    <section
      className="atmos overflow-hidden bg-sand py-24"
      style={{ "--glow-x": "18%", "--glow-y": "-10%", "--glow-color": "rgba(200,84,46,0.09)" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Position zéro"
              icon={<IconGoogleG width={13} height={13} />}
              accent="google"
              title={<>Votre annonce s&apos;affiche <span className="text-terre">avant tout le monde</span></>}
            />
            <Reveal as="p" y={16} delay={220} className="mt-4 text-stone-soft">
              Au-dessus des publicités classiques et des résultats naturels. Avec le badge
              « Garanti par Google » — votre Kbis, votre assurance et votre identité vérifiés — le
              prospect vous fait confiance avant même de vous appeler.
            </Reveal>
            <Reveal as="div" y={16} delay={280} className="mt-5">
              <GoogleGuaranteedBadge />
            </Reveal>
            <Reveal as="p" y={16} delay={360} className="mt-5 border-l-2 border-gg pl-4 text-stone">
              Ce n&apos;est pas moi qui vous demande de me croire. C&apos;est <strong>Google</strong>{" "}
              qui vérifie votre Kbis et votre assurance, et qui l&apos;affiche au prospect.
            </Reveal>
          </div>
          <SerpMockup />
        </div>
      </div>
    </section>
  );
}

function Comparator() {
  return (
    <section
      className="atmos overflow-hidden bg-white py-24"
      style={{ "--glow-y": "30%", "--glow-size": "40rem", "--glow-color": "rgba(200,84,46,0.07)" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeading
          eyebrow="Le comparatif"
          icon={<IconBolt width={13} height={13} />}
          accent="terre"
          title={<>Deux façons de dépenser <span className="text-terre">votre argent</span></>}
          intro="D'un côté ce qu'on vous a déjà vendu. De l'autre, ce que vous obtenez ici."
        />
        <ComparatorCards />
      </div>
    </section>
  );
}

function Profit() {
  return (
    <section
      className="atmos overflow-hidden bg-sand-2 py-24"
      style={{ "--glow-x": "80%", "--glow-y": "0%", "--glow-color": "rgba(183,136,46,0.08)" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Ce que ça rapporte"
          icon={<IconTrend width={13} height={13} />}
          accent="gg"
          title={<>Faites le calcul <span className="text-terre">vous-même</span></>}
        />
        <ProfitSimulator />
      </div>
    </section>
  );
}

function Capacity() {
  return (
    <section className="bg-sand py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Votre rythme"
          icon={<IconChart width={13} height={13} />}
          accent="gold"
          title={<>Vous ne recevez que ce que <span className="text-terre">vous pouvez traiter</span></>}
        />
        <CapacitySimulator />
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section
      id="fonctionnement"
      className="atmos overflow-hidden scroll-mt-24 bg-white py-24 sm:py-28"
      style={{ "--glow-x": "50%", "--glow-y": "40%", "--glow-size": "56rem", "--glow-color": "rgba(20,40,63,0.05)" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Le parcours"
          icon={<IconMap width={13} height={13} />}
          accent="navy"
          title={<>De notre premier échange au <span className="text-terre">premier appel</span></>}
          intro="Six étapes qui se déroulent sous vos yeux, à mesure que vous descendez."
        />
        <JourneyTimeline />
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section
      id="tarif"
      className="atmos overflow-hidden scroll-mt-24 bg-sand py-24"
      style={{ "--glow-x": "50%", "--glow-y": "-8%", "--glow-size": "44rem", "--glow-color": "rgba(200,84,46,0.1)" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Tarif clair"
          icon={<IconInvoice width={13} height={13} />}
          accent="terre"
          title={<>Vous savez <span className="text-terre">exactement</span> ce que vous payez</>}
          intro="Vous fixez le budget maximum : il n'est jamais dépassé. Sans engagement."
        />
        <PricingReceipt />
      </div>
    </section>
  );
}

function ReassuranceSection() {
  return (
    <section
      className="atmos overflow-hidden bg-sand-2 py-24"
      style={{ "--glow-x": "50%", "--glow-y": "-10%", "--glow-size": "50rem", "--glow-color": "rgba(47,122,71,0.06)" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Avant de vous décider"
          icon={<IconShield width={13} height={13} />}
          accent="gg"
          title={<>Aucun engagement, <span className="text-terre">aucun risque</span></>}
        />
        <Reassurance />
      </div>
    </section>
  );
}
