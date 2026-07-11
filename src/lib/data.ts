// Mock data layer for the Jacob growth platform.
// All figures are illustrative and generated for demo purposes.

export type Trend = "up" | "down" | "flat";

export type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  hint: string;
};

export type LeadStatus = "nouveau" | "contacté" | "rdv" | "gagné" | "perdu";
export type Lead = {
  id: string;
  name: string;
  service: string;
  city: string;
  value: number;
  status: LeadStatus;
  channel: string;
  createdAt: string;
  phone: string;
  score: number;
};

export type Client = {
  id: string;
  name: string;
  trade: string;
  city: string;
  plan: "Starter" | "Croissance" | "Domination";
  mrr: number;
  leads30d: number;
  roas: number;
  status: "actif" | "onboarding" | "pause" | "risque";
  since: string;
  owner: string;
};

export type Invoice = {
  id: string;
  client: string;
  amount: number;
  issued: string;
  due: string;
  status: "payée" | "en attente" | "en retard" | "brouillon";
};

export type Territory = {
  id: string;
  name: string;
  region: string;
  trade: string;
  status: "disponible" | "réservé" | "occupé";
  population: number;
  demand: number; // 0-100
  holder?: string;
};

export type Prospect = {
  id: string;
  name: string;
  trade: string;
  city: string;
  stage: "à qualifier" | "qualifié" | "proposition" | "négociation";
  potential: number;
  lastTouch: string;
  temperature: "froid" | "tiède" | "chaud";
};

export type PipelineStage = {
  key: string;
  label: string;
  cards: { id: string; name: string; trade: string; value: number; owner: string }[];
};

export type Dispute = {
  id: string;
  client: string;
  reason: string;
  amount: number;
  opened: string;
  status: "ouvert" | "en revue" | "résolu" | "refusé";
};

export type Ticket = {
  id: string;
  subject: string;
  client: string;
  priority: "basse" | "normale" | "haute" | "urgente";
  status: "ouvert" | "en cours" | "résolu";
  updated: string;
  agent: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  client: string;
  day: number; // 0-6 within demo week
  start: string;
  type: "onboarding" | "bilan" | "vente" | "support";
};

/* ------------------------------------------------------------------ */

export const adminKpis: Kpi[] = [
  { label: "MRR", value: "84 250 €", delta: "+12,4 %", trend: "up", hint: "vs mois dernier" },
  { label: "Clients actifs", value: "142", delta: "+9", trend: "up", hint: "8 en onboarding" },
  { label: "Leads générés (30j)", value: "3 908", delta: "+18,2 %", trend: "up", hint: "coût/lead 11,40 €" },
  { label: "ROAS moyen", value: "5,3×", delta: "+0,4", trend: "up", hint: "objectif 4×" },
];

export const portalKpis: Kpi[] = [
  { label: "Nouveaux leads (30j)", value: "63", delta: "+21 %", trend: "up", hint: "17 cette semaine" },
  { label: "Coût par lead", value: "9,80 €", delta: "-14 %", trend: "up", hint: "en baisse" },
  { label: "Taux de conversion", value: "34 %", delta: "+5 pts", trend: "up", hint: "appels → RDV" },
  { label: "CA attribué", value: "48 900 €", delta: "+27 %", trend: "up", hint: "sur 90 jours" },
];

export const revenueSeries = [
  42, 46, 44, 51, 55, 53, 61, 64, 68, 72, 79, 84,
];
export const revenueLabels = [
  "Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
];

export const leadsSeries = [
  180, 210, 195, 240, 280, 265, 310, 340, 360, 355, 390, 420,
];

export const channelSplit = [
  { label: "Google Ads", value: 46, color: "#7c5cff" },
  { label: "Meta Ads", value: 31, color: "#5b8cff" },
  { label: "SEO local", value: 15, color: "#23e6a8" },
  { label: "Référencement", value: 8, color: "#ffd166" },
];

export const leads: Lead[] = [
  { id: "LD-4821", name: "Marie Fontaine", service: "Rénovation salle de bain", city: "Lyon 6e", value: 8400, status: "rdv", channel: "Google Ads", createdAt: "il y a 2 h", phone: "06 12 34 56 78", score: 92 },
  { id: "LD-4820", name: "Thomas Bernard", service: "Pose de parquet", city: "Villeurbanne", value: 3200, status: "nouveau", channel: "Meta Ads", createdAt: "il y a 3 h", phone: "06 98 76 54 32", score: 78 },
  { id: "LD-4819", name: "Sofia Rossi", service: "Peinture intérieure", city: "Lyon 3e", value: 2100, status: "contacté", channel: "Google Ads", createdAt: "il y a 5 h", phone: "07 45 88 21 09", score: 64 },
  { id: "LD-4818", name: "Karim Haddad", service: "Isolation combles", city: "Bron", value: 6900, status: "gagné", channel: "SEO local", createdAt: "hier", phone: "06 33 12 45 78", score: 88 },
  { id: "LD-4817", name: "Julie Moreau", service: "Cuisine sur mesure", city: "Écully", value: 14200, status: "rdv", channel: "Meta Ads", createdAt: "hier", phone: "06 77 90 12 34", score: 95 },
  { id: "LD-4816", name: "Antoine Petit", service: "Toiture", city: "Caluire", value: 11800, status: "perdu", channel: "Google Ads", createdAt: "il y a 2 j", phone: "07 11 22 33 44", score: 41 },
  { id: "LD-4815", name: "Emma Girard", service: "Menuiserie", city: "Lyon 7e", value: 4600, status: "contacté", channel: "Meta Ads", createdAt: "il y a 2 j", phone: "06 55 44 33 22", score: 72 },
  { id: "LD-4814", name: "Lucas Dubois", service: "Électricité générale", city: "Vénissieux", value: 3900, status: "nouveau", channel: "Google Ads", createdAt: "il y a 3 j", phone: "07 88 99 00 11", score: 69 },
];

export const clients: Client[] = [
  { id: "CL-101", name: "Atelier Bois & Co", trade: "Menuiserie", city: "Lyon", plan: "Domination", mrr: 1490, leads30d: 63, roas: 6.1, status: "actif", since: "Mars 2024", owner: "Nadia B." },
  { id: "CL-102", name: "ProToit Rénovation", trade: "Couverture", city: "Villeurbanne", plan: "Croissance", mrr: 890, leads30d: 41, roas: 4.8, status: "actif", since: "Janv. 2024", owner: "Kevin L." },
  { id: "CL-103", name: "ÉlecPro Services", trade: "Électricité", city: "Bron", plan: "Croissance", mrr: 890, leads30d: 38, roas: 5.2, status: "risque", since: "Sept. 2023", owner: "Nadia B." },
  { id: "CL-104", name: "Cuisines Lumière", trade: "Agencement", city: "Écully", plan: "Domination", mrr: 1490, leads30d: 72, roas: 7.0, status: "actif", since: "Nov. 2023", owner: "Sami R." },
  { id: "CL-105", name: "Aqua Plomberie", trade: "Plomberie", city: "Caluire", plan: "Starter", mrr: 490, leads30d: 19, roas: 3.9, status: "onboarding", since: "Juin 2024", owner: "Kevin L." },
  { id: "CL-106", name: "Verte Isolation", trade: "Isolation", city: "Vénissieux", plan: "Croissance", mrr: 890, leads30d: 44, roas: 5.5, status: "actif", since: "Fév. 2024", owner: "Sami R." },
  { id: "CL-107", name: "Peinture Éclat", trade: "Peinture", city: "Lyon", plan: "Starter", mrr: 490, leads30d: 22, roas: 4.1, status: "pause", since: "Août 2023", owner: "Nadia B." },
];

export const invoices: Invoice[] = [
  { id: "F-2026-0142", client: "Atelier Bois & Co", amount: 1490, issued: "01/07/2026", due: "15/07/2026", status: "payée" },
  { id: "F-2026-0141", client: "Cuisines Lumière", amount: 1490, issued: "01/07/2026", due: "15/07/2026", status: "payée" },
  { id: "F-2026-0140", client: "ProToit Rénovation", amount: 890, issued: "01/07/2026", due: "15/07/2026", status: "en attente" },
  { id: "F-2026-0139", client: "ÉlecPro Services", amount: 890, issued: "24/06/2026", due: "08/07/2026", status: "en retard" },
  { id: "F-2026-0138", client: "Verte Isolation", amount: 890, issued: "01/07/2026", due: "15/07/2026", status: "en attente" },
  { id: "F-2026-0137", client: "Aqua Plomberie", amount: 490, issued: "01/07/2026", due: "15/07/2026", status: "brouillon" },
];

export const clientInvoices: Invoice[] = [
  { id: "F-2026-0142", client: "Atelier Bois & Co", amount: 1490, issued: "01/07/2026", due: "15/07/2026", status: "payée" },
  { id: "F-2026-0121", client: "Atelier Bois & Co", amount: 1490, issued: "01/06/2026", due: "15/06/2026", status: "payée" },
  { id: "F-2026-0098", client: "Atelier Bois & Co", amount: 1490, issued: "01/05/2026", due: "15/05/2026", status: "payée" },
  { id: "F-2026-0074", client: "Atelier Bois & Co", amount: 1490, issued: "01/04/2026", due: "15/04/2026", status: "payée" },
];

export const territories: Territory[] = [
  { id: "TR-01", name: "Lyon Presqu'île", region: "Rhône", trade: "Menuiserie", status: "occupé", population: 42000, demand: 88, holder: "Atelier Bois & Co" },
  { id: "TR-02", name: "Villeurbanne Nord", region: "Rhône", trade: "Couverture", status: "occupé", population: 61000, demand: 74, holder: "ProToit Rénovation" },
  { id: "TR-03", name: "Écully", region: "Rhône", trade: "Agencement", status: "réservé", population: 18000, demand: 69 },
  { id: "TR-04", name: "Bron Centre", region: "Rhône", trade: "Électricité", status: "occupé", population: 40000, demand: 71, holder: "ÉlecPro Services" },
  { id: "TR-05", name: "Caluire", region: "Rhône", trade: "Plomberie", status: "disponible", population: 42000, demand: 63 },
  { id: "TR-06", name: "Tassin", region: "Rhône", trade: "Peinture", status: "disponible", population: 22000, demand: 58 },
  { id: "TR-07", name: "Vénissieux Sud", region: "Rhône", trade: "Isolation", status: "occupé", population: 66000, demand: 81, holder: "Verte Isolation" },
  { id: "TR-08", name: "Oullins", region: "Rhône", trade: "Menuiserie", status: "disponible", population: 26000, demand: 66 },
  { id: "TR-09", name: "Meyzieu", region: "Rhône", trade: "Couverture", status: "réservé", population: 33000, demand: 60 },
];

export const prospects: Prospect[] = [
  { id: "PR-51", name: "Charpente Alpine", trade: "Charpente", city: "Chambéry", stage: "négociation", potential: 1490, lastTouch: "il y a 1 j", temperature: "chaud" },
  { id: "PR-52", name: "Sol & Style", trade: "Carrelage", city: "Grenoble", stage: "proposition", potential: 890, lastTouch: "il y a 2 j", temperature: "chaud" },
  { id: "PR-53", name: "Jardin Concept", trade: "Paysagisme", city: "Annecy", stage: "qualifié", potential: 890, lastTouch: "il y a 3 j", temperature: "tiède" },
  { id: "PR-54", name: "Fenêtres Plus", trade: "Menuiserie PVC", city: "Valence", stage: "à qualifier", potential: 490, lastTouch: "il y a 5 j", temperature: "froid" },
  { id: "PR-55", name: "Clim Confort", trade: "Climatisation", city: "Lyon", stage: "négociation", potential: 1490, lastTouch: "aujourd'hui", temperature: "chaud" },
  { id: "PR-56", name: "Piscines Azur", trade: "Pisciniste", city: "Aix-les-Bains", stage: "qualifié", potential: 890, lastTouch: "il y a 4 j", temperature: "tiède" },
];

export const pipeline: PipelineStage[] = [
  {
    key: "qualif",
    label: "À qualifier",
    cards: [
      { id: "P1", name: "Fenêtres Plus", trade: "Menuiserie PVC", value: 490, owner: "Kevin L." },
      { id: "P2", name: "Toiture Express", trade: "Couverture", value: 890, owner: "Sami R." },
    ],
  },
  {
    key: "qualified",
    label: "Qualifié",
    cards: [
      { id: "P3", name: "Jardin Concept", trade: "Paysagisme", value: 890, owner: "Nadia B." },
      { id: "P4", name: "Piscines Azur", trade: "Pisciniste", value: 890, owner: "Kevin L." },
    ],
  },
  {
    key: "proposal",
    label: "Proposition",
    cards: [
      { id: "P5", name: "Sol & Style", trade: "Carrelage", value: 890, owner: "Sami R." },
    ],
  },
  {
    key: "nego",
    label: "Négociation",
    cards: [
      { id: "P6", name: "Charpente Alpine", trade: "Charpente", value: 1490, owner: "Nadia B." },
      { id: "P7", name: "Clim Confort", trade: "Climatisation", value: 1490, owner: "Sami R." },
    ],
  },
  {
    key: "won",
    label: "Signé",
    cards: [
      { id: "P8", name: "Aqua Plomberie", trade: "Plomberie", value: 490, owner: "Kevin L." },
    ],
  },
];

export const disputes: Dispute[] = [
  { id: "LT-09", client: "ÉlecPro Services", reason: "Leads hors zone", amount: 340, opened: "05/07/2026", status: "en revue" },
  { id: "LT-08", client: "Peinture Éclat", reason: "Qualité de lead", amount: 120, opened: "02/07/2026", status: "ouvert" },
  { id: "LT-07", client: "Aqua Plomberie", reason: "Doublon de lead", amount: 80, opened: "28/06/2026", status: "résolu" },
  { id: "LT-06", client: "ProToit Rénovation", reason: "Facturation", amount: 890, opened: "20/06/2026", status: "refusé" },
];

export const tickets: Ticket[] = [
  { id: "SUP-231", subject: "Accès portail impossible", client: "Verte Isolation", priority: "haute", status: "en cours", updated: "il y a 20 min", agent: "Léa" },
  { id: "SUP-230", subject: "Modifier le budget Meta", client: "Cuisines Lumière", priority: "normale", status: "ouvert", updated: "il y a 1 h", agent: "—" },
  { id: "SUP-229", subject: "Question facturation juin", client: "ProToit Rénovation", priority: "basse", status: "résolu", updated: "il y a 3 h", agent: "Marc" },
  { id: "SUP-228", subject: "Leads en double signalés", client: "ÉlecPro Services", priority: "urgente", status: "en cours", updated: "il y a 4 h", agent: "Léa" },
  { id: "SUP-227", subject: "Ajouter un utilisateur", client: "Atelier Bois & Co", priority: "normale", status: "résolu", updated: "hier", agent: "Marc" },
];

export const calendarEvents: CalendarEvent[] = [
  { id: "E1", title: "Onboarding kickoff", client: "Aqua Plomberie", day: 0, start: "09:30", type: "onboarding" },
  { id: "E2", title: "Bilan mensuel", client: "Atelier Bois & Co", day: 1, start: "11:00", type: "bilan" },
  { id: "E3", title: "Démo vente", client: "Charpente Alpine", day: 1, start: "15:00", type: "vente" },
  { id: "E4", title: "Point support", client: "Verte Isolation", day: 2, start: "10:00", type: "support" },
  { id: "E5", title: "Bilan trimestriel", client: "Cuisines Lumière", day: 3, start: "14:30", type: "bilan" },
  { id: "E6", title: "Démo vente", client: "Clim Confort", day: 4, start: "16:00", type: "vente" },
  { id: "E7", title: "Onboarding suivi", client: "Aqua Plomberie", day: 4, start: "09:00", type: "onboarding" },
];

export const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven"];

export const onboardingSteps = [
  { title: "Contrat & accès", desc: "Signature et création de vos accès sécurisés.", done: true },
  { title: "Audit de marché", desc: "Analyse de votre zone et de la concurrence locale.", done: true },
  { title: "Configuration des campagnes", desc: "Création Google & Meta Ads sur mesure.", done: true },
  { title: "Suivi des appels", desc: "Installation du tracking et des numéros dédiés.", done: false },
  { title: "Lancement", desc: "Mise en ligne et première vague de leads.", done: false },
];

export const testimonials = [
  { name: "David M.", trade: "Menuisier · Lyon", quote: "En 3 mois, mon planning est plein pour l'année. Je ne cours plus après les devis, ils viennent à moi.", metric: "+63 leads/mois" },
  { name: "Sophie L.", trade: "Couvreuse · Villeurbanne", quote: "Le coût par lead a baissé de moitié et je ne paie que pour ma zone. Enfin un partenaire qui comprend l'artisanat.", metric: "ROAS 4,8×" },
  { name: "Karim B.", trade: "Électricien · Bron", quote: "Le portail est limpide : je vois chaque appel, chaque devis, chaque euro dépensé. Transparence totale.", metric: "34 % de conversion" },
];

export const marketingStats = [
  { value: "En haut", label: "au-dessus des Google Ads et des résultats naturels" },
  { value: "Garanti", label: "le badge de confiance vérifié par Google" },
  { value: "À l'appel", label: "vous êtes facturé quand le téléphone sonne" },
  { value: "30 jours", label: "de gestion offerte, à partir de l'activation" },
];

export const plans = [
  {
    name: "Starter",
    price: "490",
    tagline: "Pour démarrer et tester votre marché",
    features: ["1 canal publicitaire", "Zone unique", "~20 leads / mois", "Portail de suivi", "Support par email"],
    highlight: false,
  },
  {
    name: "Croissance",
    price: "890",
    tagline: "Le choix des artisans qui accélèrent",
    features: ["Google + Meta Ads", "Zone étendue", "~40 leads / mois", "Suivi des appels", "Bilan mensuel dédié", "Support prioritaire"],
    highlight: true,
  },
  {
    name: "Domination",
    price: "1490",
    tagline: "Devenez la référence de votre territoire",
    features: ["Multi-canal + SEO local", "Exclusivité territoriale", "60+ leads / mois", "Account manager dédié", "Bilan hebdomadaire", "Support 7j/7"],
    highlight: false,
  },
];

export const faqs = [
  { q: "C'est combien au total ?", a: "400 € de gestion par mois, plus le coût des appels facturé directement par Google (environ 25 à 50 € par appel selon le métier). C'est vous qui fixez le budget maximum : il n'est jamais dépassé." },
  { q: "J'ai déjà un site, une agence ou du Google Ads.", a: "C'est complémentaire, pas concurrent. Les Local Services Ads s'affichent à un emplacement différent, au-dessus des publicités classiques et des résultats naturels." },
  { q: "On m'a déjà vendu un site et ça n'a rien donné.", a: "Ici vous ne payez pas un site. Vous payez des appels. Pas d'appel, pas de facture. C'est exactement l'inverse." },
  { q: "Pourquoi passer par vous, je peux le faire seul ?", a: "La validation Google est longue, les faux appels sont à contester chaque semaine sinon vous les payez, et la zone doit être réglée au cordeau. Vous êtes artisan, pas gestionnaire de campagne." },
  { q: "Pourquoi la gestion est-elle offerte 30 jours ?", a: "Pour que vous me jugiez sur les résultats, pas sur ma parole. Vous ne payez que les appels réellement reçus pendant cette période." },
  { q: "Ça prend combien de temps à démarrer ?", a: "Comptez quelques semaines de vérification Google, puis la diffusion démarre. Les 30 jours offerts commencent à l'activation, pas à la signature." },
];

/* ------------------- Local Services Ads (LSA) ------------------- */

export const eligibleTrades = [
  { id: "couvreur", label: "Couvreur", core: true },
  { id: "chauffagiste", label: "Chauffagiste", core: true },
  { id: "electricien", label: "Électricien", core: true },
  { id: "plombier", label: "Plombier", core: true },
  { id: "menuisier", label: "Menuisier / Fenêtres", core: true },
  { id: "serrurier", label: "Serrurier", core: false },
  { id: "paysagiste", label: "Paysagiste", core: false },
  { id: "nettoyage", label: "Nettoyage", core: false },
];

export type Departement = { code: string; name: string; x: number; y: number };

// Coordonnées approximatives dans un viewBox 0 0 500 480 (carte stylisée de France).
export const departements: Departement[] = [
  { code: "59", name: "Nord", x: 297, y: 46 },
  { code: "62", name: "Pas-de-Calais", x: 268, y: 58 },
  { code: "80", name: "Somme", x: 262, y: 84 },
  { code: "76", name: "Seine-Maritime", x: 226, y: 92 },
  { code: "14", name: "Calvados", x: 176, y: 128 },
  { code: "50", name: "Manche", x: 150, y: 120 },
  { code: "35", name: "Ille-et-Vilaine", x: 138, y: 176 },
  { code: "29", name: "Finistère", x: 58, y: 196 },
  { code: "56", name: "Morbihan", x: 96, y: 220 },
  { code: "44", name: "Loire-Atlantique", x: 138, y: 214 },
  { code: "49", name: "Maine-et-Loire", x: 176, y: 206 },
  { code: "37", name: "Indre-et-Loire", x: 214, y: 196 },
  { code: "45", name: "Loiret", x: 264, y: 164 },
  { code: "75", name: "Paris", x: 270, y: 122 },
  { code: "77", name: "Seine-et-Marne", x: 298, y: 132 },
  { code: "51", name: "Marne", x: 330, y: 112 },
  { code: "67", name: "Bas-Rhin", x: 415, y: 122 },
  { code: "68", name: "Haut-Rhin", x: 420, y: 160 },
  { code: "21", name: "Côte-d'Or", x: 348, y: 186 },
  { code: "25", name: "Doubs", x: 394, y: 196 },
  { code: "69", name: "Rhône", x: 364, y: 236 },
  { code: "42", name: "Loire", x: 344, y: 252 },
  { code: "63", name: "Puy-de-Dôme", x: 300, y: 248 },
  { code: "38", name: "Isère", x: 390, y: 260 },
  { code: "74", name: "Haute-Savoie", x: 425, y: 220 },
  { code: "73", name: "Savoie", x: 420, y: 248 },
  { code: "86", name: "Vienne", x: 200, y: 240 },
  { code: "87", name: "Haute-Vienne", x: 240, y: 270 },
  { code: "24", name: "Dordogne", x: 210, y: 300 },
  { code: "17", name: "Charente-Maritime", x: 154, y: 266 },
  { code: "33", name: "Gironde", x: 172, y: 306 },
  { code: "40", name: "Landes", x: 164, y: 346 },
  { code: "64", name: "Pyrénées-Atlantiques", x: 168, y: 378 },
  { code: "31", name: "Haute-Garonne", x: 250, y: 356 },
  { code: "66", name: "Pyrénées-Orientales", x: 304, y: 386 },
  { code: "34", name: "Hérault", x: 330, y: 344 },
  { code: "30", name: "Gard", x: 350, y: 328 },
  { code: "84", name: "Vaucluse", x: 366, y: 314 },
  { code: "13", name: "Bouches-du-Rhône", x: 374, y: 340 },
  { code: "83", name: "Var", x: 406, y: 340 },
  { code: "06", name: "Alpes-Maritimes", x: 440, y: 314 },
];

// Contour stylisé de l'Hexagone (viewBox 0 0 500 480).
export const franceOutline =
  "M297 40 L330 60 L360 78 L390 96 L418 118 L438 150 L444 178 L430 200 L446 232 L452 274 L448 312 L432 336 L406 352 L378 356 L346 360 L318 384 L300 402 L262 396 L212 388 L172 384 L150 356 L142 320 L146 286 L140 252 L132 222 L98 236 L58 210 L34 196 L74 176 L108 168 L150 132 L182 116 L186 140 L214 138 L236 120 L262 96 L270 66 Z";

export const corsicaOutline = "M452 392 L466 400 L470 424 L462 448 L452 440 L450 414 Z";

export const lsaSteps = [
  { n: "1", title: "Vérification par Google", desc: "Je monte votre dossier : Kbis, décennale, identité. Google vérifie tout et vous décerne son badge de confiance." },
  { n: "2", title: "Activation de votre zone", desc: "Je règle vos métiers, votre secteur et votre budget plafond. C'est ici que démarrent les 30 jours de gestion offerte." },
  { n: "3", title: "Le téléphone sonne", desc: "Votre annonce s'affiche tout en haut de Google. Les prospects vous appellent directement, sans passer par un site." },
  { n: "4", title: "Vous décrochez", desc: "Les demandes arrivent sur votre application. Je conteste les faux appels chaque semaine pour que vous ne payiez que le vrai." },
];

export const whatIManage = [
  "Montage du dossier de vérification Google",
  "Réglage de la zone et des catégories de métier",
  "Pilotage du budget et du plafond mensuel",
  "Contestation des faux appels chaque semaine",
  "Suivi et point régulier sur les demandes reçues",
];

export const whatYouDo = ["Vous décrochez le téléphone."];

export const pricingFacts = [
  { label: "Gestion (mon forfait)", value: "400 € / mois", note: "Réglé après les 30 premiers jours." },
  { label: "Coût des appels", value: "≈ 25 à 50 € / appel", note: "Facturé en direct par Google, selon le métier." },
  { label: "Les 30 premiers jours", value: "Gestion offerte", note: "Vous ne payez que les appels reçus." },
];

export function trendColor(trend: Trend) {
  return trend === "up" ? "text-accent" : trend === "down" ? "text-danger" : "text-ink-dim";
}
