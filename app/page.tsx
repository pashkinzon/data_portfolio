"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "de";
type LocalText = { en: string; de: string };

type Project = {
  id: string;
  number: string;
  kicker: LocalText;
  title: LocalText;
  description: LocalText;
  impact: LocalText;
  ownership: LocalText[];
  image: string;
  alt: LocalText;
  logo: string;
  logoAlt: string;
  tags: string[];
};

type ImpactCase = {
  id: string;
  label: LocalText;
  metric: string;
  metricLabel: LocalText;
  title: LocalText;
  copy: LocalText;
  proof: LocalText[];
};

const t = (value: LocalText, lang: Lang) => value[lang];

const ui = {
  navWork: { en: "Work", de: "Projekte" },
  navImpact: { en: "Impact", de: "Wirkung" },
  navCareer: { en: "Career", de: "Laufbahn" },
  navAbout: { en: "About", de: "Über mich" },
  talk: { en: "Let’s talk", de: "Kontakt" },
  menu: { en: "Menu", de: "Menü" },
  close: { en: "Close", de: "Schließen" },
  heroEyebrow: {
    en: "Product-minded data analyst · retail analytics & automation",
    de: "Produktorientierter Data Analyst · Retail Analytics & Automation",
  },
  heroLine1: { en: "I don’t just analyze data.", de: "Ich analysiere nicht nur Daten." },
  heroLine2: { en: "I own what gets built.", de: "Ich verantworte, was daraus entsteht." },
  heroCopy: {
    en: "I find the operational friction, shape the KPI logic, build the system, and stay for adoption. The result: faster decisions and tools people choose to use.",
    de: "Ich finde operative Reibung, forme die KPI-Logik, baue das System und begleite die Nutzung. Das Ergebnis: schnellere Entscheidungen und Werkzeuge, die Menschen tatsächlich verwenden.",
  },
  explore: { en: "Explore owned products", de: "Produkte entdecken" },
  cv: { en: "Open CV (DE)", de: "Lebenslauf öffnen" },
  workKicker: { en: "Selected products", de: "Ausgewählte Produkte" },
  workTitle: { en: "Built end to end.", de: "Von Anfang bis Nutzung." },
  workIntro: {
    en: "The strongest work is not a dashboard screenshot. It is the full ownership loop: discover the need, define the logic, build the product, earn adoption, improve it.",
    de: "Die stärkste Arbeit ist kein Dashboard-Screenshot. Sie zeigt den gesamten Ownership-Loop: Bedarf verstehen, Logik definieren, Produkt bauen, Nutzung sichern und verbessern.",
  },
  owned: { en: "What I owned", de: "Meine Verantwortung" },
  sideKicker: { en: "Independent & social-impact builds", de: "Eigene & gemeinnützige Projekte" },
  sideTitle: { en: "Products beyond the day job.", de: "Produkte über den Job hinaus." },
  sideIntro: {
    en: "Small teams and personal projects are where I test ideas quickly, make useful interfaces, and build for communities I care about.",
    de: "In kleinen Teams und eigenen Projekten teste ich Ideen schnell, entwickle nützliche Interfaces und baue für Communities, die mir wichtig sind.",
  },
  visit: { en: "Visit project", de: "Projekt öffnen" },
  impactKicker: { en: "Ownership ledger", de: "Ownership in Zahlen" },
  impactTitle: { en: "The useful part: what changed.", de: "Was sich tatsächlich verändert hat." },
  impactIntro: {
    en: "A more honest replacement for a generic process section: real before-and-after evidence from products and operations I helped own.",
    de: "Der ehrliche Ersatz für eine generische Prozess-Sektion: konkrete Vorher-Nachher-Belege aus Produkten und Operations, die ich mitverantwortet habe.",
  },
  evidence: { en: "Evidence", de: "Belege" },
  careerKicker: { en: "Career & education", de: "Beruf & Ausbildung" },
  careerTitle: { en: "Responsibility grew fast.", de: "Verantwortung wuchs schnell." },
  careerIntro: {
    en: "From operations leadership to retail analytics—and a mathematics foundation across Germany and the US.",
    de: "Von operativer Führung zu Retail Analytics—mit mathematischem Fundament in Deutschland und den USA.",
  },
  today: { en: "Today", de: "Heute" },
  now: { en: "Oct 2024 — now", de: "Okt 2024 — heute" },
  dmRole: { en: "Working Student · Data Analyst", de: "Werkstudent · Data Analyst" },
  dmCopy: {
    en: "Retail analytics, scalable reporting, AI-enabled workflows, and assortment decisions with scope across more than 2,000 stores.",
    de: "Retail Analytics, skalierbares Reporting, AI-gestützte Workflows und Sortimentsentscheidungen mit Wirkung auf mehr als 2.000 Märkte.",
  },
  flinkDate: { en: "Oct 2023 — Sep 2024", de: "Okt 2023 — Sep 2024" },
  flinkRole: {
    en: "Operations Associate → Operational Manager",
    de: "Operations Associate → Operational Manager",
  },
  flinkCopy: {
    en: "Promoted within six months; helped reduce picking time by roughly 15% through operational process improvement.",
    de: "Beförderung innerhalb von sechs Monaten; Kommissionierzeit durch Prozessoptimierung um rund 15 % reduziert.",
  },
  study: { en: "Mathematics · B.Sc.", de: "Mathematik · B.Sc." },
  beyondKicker: { en: "Beyond the job title", de: "Mehr als die Stellenbezeichnung" },
  beyondTitle: { en: "Curious across borders.", de: "Neugierig über Grenzen hinweg." },
  beyondCopy: {
    en: "Three languages, two countries of study, scholarships, leadership training, and a bias toward projects with a useful social edge.",
    de: "Drei Sprachen, Studium in zwei Ländern, Stipendien, Leadership-Training und eine Vorliebe für Projekte mit gesellschaftlichem Nutzen.",
  },
  aboutKicker: { en: "Behind the products", de: "Hinter den Produkten" },
  aboutTitle: {
    en: "Math brain. Operator instincts. Product-owner energy.",
    de: "Mathe-Kopf. Operations-Instinkt. Product-Owner-Energie.",
  },
  aboutLead: {
    en: "I am happiest where an ambiguous business question becomes a product someone can trust.",
    de: "Am liebsten arbeite ich dort, wo aus einer unklaren Geschäftsfrage ein Produkt wird, dem Menschen vertrauen.",
  },
  aboutCopy: {
    en: "My edge is range: I can speak with users, define the analytical logic, build the workflow, and judge success by adoption—not by whether the code merely runs.",
    de: "Meine Stärke ist die Verbindung: Ich spreche mit Nutzern, definiere die analytische Logik, baue den Workflow und messe Erfolg an Nutzung—nicht nur daran, ob der Code läuft.",
  },
  linkedin: { en: "LinkedIn profile", de: "LinkedIn-Profil" },
  contactKicker: { en: "Have an unclear problem?", de: "Ein noch unklares Problem?" },
  contactTitle1: { en: "Let’s make it", de: "Machen wir es" },
  contactTitle2: { en: "useful.", de: "nützlich." },
  footer: { en: "Data products · analytics · ownership", de: "Datenprodukte · Analytics · Ownership" },
  top: { en: "Back to top", de: "Nach oben" },
};

const projects: Project[] = [
  {
    id: "automation",
    number: "01",
    kicker: { en: "Owned at dm · Automation product", de: "Bei dm verantwortet · Automatisierungsprodukt" },
    title: { en: "KPI mailing: 8 hours became 15 minutes", de: "KPI-Mailing: aus 8 Stunden wurden 15 Minuten" },
    description: {
      en: "I identified a repetitive weekly reporting flow across 75 stores, designed the reproducible KPI logic, built generation and delivery in Python/PySpark, and removed the need for manual individual emails.",
      de: "Ich identifizierte einen repetitiven wöchentlichen Reporting-Prozess für 75 Märkte, definierte die reproduzierbare KPI-Logik, baute Generierung und Versand in Python/PySpark und ersetzte manuelle Einzelmails.",
    },
    impact: { en: "32× faster every week", de: "Jede Woche 32× schneller" },
    ownership: [
      { en: "Framed the operational problem", de: "Operatives Problem strukturiert" },
      { en: "Defined KPI and delivery logic", de: "KPI- und Versandlogik definiert" },
      { en: "Built the automated workflow", de: "Automatisierten Workflow gebaut" },
      { en: "Rolled it out for a five-person team", de: "Für ein fünfköpfiges Team ausgerollt" },
    ],
    image: "/assets/project-fuks-dashboard.png",
    alt: { en: "Retail analysis dashboard", de: "Dashboard für Retail-Analysen" },
    logo: "/assets/logo-dm.webp",
    logoAlt: "dm-drogerie markt",
    tags: ["Python", "PySpark", "Automation", "Reporting"],
  },
  {
    id: "copilot",
    number: "02",
    kicker: { en: "Owned at dm · Internal AI product", de: "Bei dm verantwortet · Internes AI-Produkt" },
    title: { en: "An AI analyst with company context", de: "Ein AI-Analyst mit Unternehmenskontext" },
    description: {
      en: "I developed an internal assistant connected to APIs and databases that generates PySpark code and answers complex data questions—turning specialist knowledge into a reusable product.",
      de: "Ich entwickelte einen internen Assistenten mit API- und Datenbankanbindung, der PySpark-Code generiert und komplexe Datenfragen beantwortet—aus Spezialwissen wurde ein wiederverwendbares Produkt.",
    },
    impact: { en: "5+ daily users · 100+ planned", de: "5+ tägliche Nutzer · 100+ geplant" },
    ownership: [
      { en: "Found the repeated analyst pain", de: "Wiederkehrenden Analysten-Pain identifiziert" },
      { en: "Designed the assistant workflow", de: "Assistenten-Workflow konzipiert" },
      { en: "Integrated API and database context", de: "API- und Datenbankkontext integriert" },
      { en: "Validated usage and rollout path", de: "Nutzung und Rollout-Pfad validiert" },
    ],
    image: "/project-atlas-v3.png",
    alt: { en: "Visual map of Pavel's data products", de: "Visuelle Karte von Pavels Datenprodukten" },
    logo: "/assets/logo-dm.webp",
    logoAlt: "dm-drogerie markt",
    tags: ["AI", "APIs", "Databases", "PySpark"],
  },
  {
    id: "layout",
    number: "03",
    kicker: { en: "Owned at dm · Decision product", de: "Bei dm verantwortet · Entscheidungsprodukt" },
    title: { en: "Layout impact dashboard, owned end to end", de: "Layout-Impact-Dashboard, von Idee bis Nutzung" },
    description: {
      en: "I conceived and built the product from scratch—from the original idea and KPI model to the complete working dashboard used across assortment, space-planning, and advisory teams.",
      de: "Ich konzipierte und baute das Produkt von Grund auf—von der Idee und dem KPI-Modell bis zum fertigen Dashboard für Sortiment, Space Planning und Beratung.",
    },
    impact: { en: "30 weekly users across teams", de: "30 wöchentliche Nutzer in mehreren Teams" },
    ownership: [
      { en: "Turned questions into a product brief", de: "Fragen in einen Product Brief übersetzt" },
      { en: "Created the KPI model", de: "KPI-Modell entwickelt" },
      { en: "Designed and built the interface", de: "Interface konzipiert und gebaut" },
      { en: "Earned recurring cross-team use", de: "Wiederkehrende teamübergreifende Nutzung erreicht" },
    ],
    image: "/assets/project-layout-dashboard.png",
    alt: { en: "Layout impact dashboard with KPI cards and charts", de: "Layout-Impact-Dashboard mit KPI-Karten und Charts" },
    logo: "/assets/logo-dm.webp",
    logoAlt: "dm-drogerie markt",
    tags: ["Looker", "SQL", "UX", "Product thinking"],
  },
];

const impactCases: ImpactCase[] = [
  {
    id: "speed",
    label: { en: "Automation", de: "Automatisierung" },
    metric: "8h → <15m",
    metricLabel: { en: "weekly reporting time", de: "wöchentliche Reporting-Zeit" },
    title: { en: "Removed a weekly operational tax.", de: "Einen wöchentlichen Operations-Aufwand eliminiert." },
    copy: {
      en: "A reproducible Python/PySpark workflow now generates and distributes KPIs for 75 stores instead of a five-person team assembling individual emails.",
      de: "Ein reproduzierbarer Python/PySpark-Workflow generiert und verteilt KPIs für 75 Märkte, statt dass ein fünfköpfiges Team Einzelmails erstellt.",
    },
    proof: [
      { en: "75 stores", de: "75 Märkte" },
      { en: "Five-person team", de: "Fünfköpfiges Team" },
      { en: "Generation + delivery automated", de: "Generierung + Versand automatisiert" },
    ],
  },
  {
    id: "adoption",
    label: { en: "AI product", de: "AI-Produkt" },
    metric: "5+ → 100+",
    metricLabel: { en: "daily users to planned rollout", de: "tägliche Nutzer bis geplanter Rollout" },
    title: { en: "Turned expertise into a reusable assistant.", de: "Expertise in einen wiederverwendbaren Assistenten verwandelt." },
    copy: {
      en: "The internal assistant uses API and database context to answer complex data questions and generate PySpark code. Daily use is the first adoption signal; the rollout path is the next.",
      de: "Der interne Assistent nutzt API- und Datenbankkontext, beantwortet komplexe Datenfragen und generiert PySpark-Code. Tägliche Nutzung ist das erste Adoptionssignal; der Rollout ist der nächste Schritt.",
    },
    proof: [
      { en: "Used every day", de: "Täglich genutzt" },
      { en: "API + database integration", de: "API- + Datenbankintegration" },
      { en: "Planned 100+ user rollout", de: "Rollout für 100+ Nutzer geplant" },
    ],
  },
  {
    id: "scope",
    label: { en: "Retail analytics", de: "Retail Analytics" },
    metric: "2,000+",
    metricLabel: { en: "stores in analytical scope", de: "Märkte im analytischen Wirkungsbereich" },
    title: { en: "Analysis built for real retail scale.", de: "Analysen für echte Retail-Skalierung." },
    copy: {
      en: "Sales, cross-selling, potential, trend-market, and regression analyses support assortment and store decisions across the dm network.",
      de: "Verkaufs-, Zusatzverkaufs-, Potenzial-, Trendmarkt- und Regressionsanalysen unterstützen Sortiments- und Filialentscheidungen im dm-Netzwerk.",
    },
    proof: [
      { en: "Assortment decisions", de: "Sortimentsentscheidungen" },
      { en: "Statistical and regression models", de: "Statistische Verfahren und Regression" },
      { en: "Parameterized exports", de: "Parametrisierte Exporte" },
    ],
  },
  {
    id: "leadership",
    label: { en: "Operations", de: "Operations" },
    metric: "−15%",
    metricLabel: { en: "picking time", de: "Kommissionierzeit" },
    title: { en: "Product thinking started in operations.", de: "Product Thinking begann in Operations." },
    copy: {
      en: "Before analytics, I learned to improve work at the process level—earning promotion to Operational Manager within six months and helping reduce picking time.",
      de: "Vor Analytics lernte ich, Arbeit direkt im Prozess zu verbessern—mit Beförderung zum Operational Manager innerhalb von sechs Monaten und kürzerer Kommissionierzeit.",
    },
    proof: [
      { en: "Promoted in six months", de: "Beförderung in sechs Monaten" },
      { en: "Hands-on process improvement", de: "Praktische Prozessoptimierung" },
      { en: "Measured operational result", de: "Messbares operatives Ergebnis" },
    ],
  },
];

const sideProjects = [
  {
    title: "Paws from Georgia",
    logo: "/assets/logo-paws-georgia.png",
    href: "https://paws-for-georgia.onrender.com/",
    copy: {
      en: "A social-impact adoption experience for Georgian dogs.",
      de: "Eine gemeinnützige Vermittlungsplattform für Hunde aus Georgien.",
    },
  },
  {
    title: "Flights History",
    logo: "/assets/logo-flights-history.png",
    href: "https://flights-history.onrender.com/",
    copy: {
      en: "Personal flight and travel data turned into an explorable product.",
      de: "Persönliche Flug- und Reisedaten als interaktives Datenprodukt.",
    },
  },
  {
    title: "Маня",
    logo: "/assets/logo-manya.png",
    href: "https://pashkinzon.github.io/manya-platform-prototype/",
    copy: {
      en: "Free mental-health knowledge in Russian, designed for clarity.",
      de: "Kostenloses Mental-Health-Wissen auf Russisch, klar gestaltet.",
    },
  },
];

const skills = ["Python", "PySpark", "SQL", "JavaScript", "Looker", "Zeppelin", "APIs", "AI", "Excel", "VBA"];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [activeImpact, setActiveImpact] = useState<ImpactCase>(impactCases[0]);
  const [activeSkill, setActiveSkill] = useState("Python");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("pavel-portfolio-language");
    if (saved === "de" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("pavel-portfolio-language", lang);
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const nav = [
    ["work", ui.navWork],
    ["impact", ui.navImpact],
    ["career", ui.navCareer],
    ["about", ui.navAbout],
  ] as const;

  return (
    <main id="top">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <button className="brand" onClick={() => jumpTo("top")} aria-label="Back to top">
          <span className="brand-mark">PP</span>
          <span>Pavel Polishchuk</span>
        </button>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          {nav.map(([id, label]) => (
            <button key={id} onClick={() => jumpTo(id)}>{t(label, lang)}</button>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="language-toggle"
            onClick={() => setLang(lang === "en" ? "de" : "en")}
            aria-label={lang === "en" ? "Auf Deutsch wechseln" : "Switch to English"}
          >
            <span className={lang === "en" ? "is-active" : ""}>EN</span>
            <i>/</i>
            <span className={lang === "de" ? "is-active" : ""}>DE</span>
          </button>
          <a className="header-cta" href="mailto:pavel.polishchuk@proton.me">
            {t(ui.talk, lang)} <Arrow diagonal />
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? t(ui.close, lang) : t(ui.menu, lang)}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="eyebrow reveal-up">
          <span className="status-dot" />
          {t(ui.heroEyebrow, lang)}
        </div>
        <h1 className="hero-title reveal-up delay-1">
          {t(ui.heroLine1, lang)}
          <br />
          <em>{t(ui.heroLine2, lang)}</em>
        </h1>
        <p className="hero-copy reveal-up delay-2">{t(ui.heroCopy, lang)}</p>
        <div className="hero-actions reveal-up delay-3">
          <button className="button button-primary" onClick={() => jumpTo("work")}>
            {t(ui.explore, lang)} <Arrow />
          </button>
          <a className="button button-secondary" href="/Pavel_Polishchuk_CV_DE.pdf" target="_blank" rel="noreferrer">
            {t(ui.cv, lang)} <Arrow diagonal />
          </a>
        </div>
        <div className="hero-metrics reveal-up delay-3">
          <div><strong>8h → &lt;15m</strong><span>{lang === "en" ? "reporting time" : "Reporting-Zeit"}</span></div>
          <div><strong>75</strong><span>{lang === "en" ? "stores automated" : "Märkte automatisiert"}</span></div>
          <div><strong>2,000+</strong><span>{lang === "en" ? "stores in scope" : "Märkte im Scope"}</span></div>
          <div><strong>100+</strong><span>{lang === "en" ? "AI users planned" : "AI-Nutzer geplant"}</span></div>
        </div>
      </section>

      <div className="ticker" aria-label="Product ownership">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-set" key={copy} aria-hidden={copy === 1}>
              <span>{lang === "en" ? "FIND THE FRICTION" : "REIBUNG FINDEN"}</span><i>✦</i>
              <span>{lang === "en" ? "DEFINE THE LOGIC" : "LOGIK DEFINIEREN"}</span><i>✦</i>
              <span>{lang === "en" ? "BUILD THE PRODUCT" : "PRODUKT BAUEN"}</span><i>✦</i>
              <span>{lang === "en" ? "EARN ADOPTION" : "NUTZUNG SICHERN"}</span><i>✦</i>
            </div>
          ))}
        </div>
      </div>

      <section className="work section-shell" id="work">
        <div className="section-heading">
          <div>
            <span className="section-kicker">{t(ui.workKicker, lang)}</span>
            <h2>{t(ui.workTitle, lang)}</h2>
          </div>
          <p>{t(ui.workIntro, lang)}</p>
        </div>

        <div className="project-stage">
          <div className="project-visual" key={activeProject.id}>
            <img src={activeProject.image} alt={t(activeProject.alt, lang)} />
            <div className="project-visual-topline">
              <span>{t(activeProject.kicker, lang)}</span>
              <span>{activeProject.number} / 03</span>
            </div>
            <div className="project-impact">
              <span className="impact-pulse" />
              {t(activeProject.impact, lang)}
            </div>
          </div>

          <div className="project-content">
            <div className="project-switcher" role="tablist" aria-label="Selected products">
              {projects.map((project) => (
                <button
                  key={project.id}
                  role="tab"
                  aria-selected={activeProject.id === project.id}
                  className={activeProject.id === project.id ? "is-active" : ""}
                  onClick={() => setActiveProject(project)}
                >
                  <img src={project.logo} alt="" />
                  <span>{project.number}</span>
                  {t(project.title, lang)}
                  <Arrow />
                </button>
              ))}
            </div>

            <div className="project-detail">
              <div className="project-brand-row">
                <img src={activeProject.logo} alt={activeProject.logoAlt} />
                <span className="section-kicker">{t(activeProject.kicker, lang)}</span>
              </div>
              <h3>{t(activeProject.title, lang)}</h3>
              <p>{t(activeProject.description, lang)}</p>
              <span className="ownership-label">{t(ui.owned, lang)}</span>
              <ul className="ownership-list">
                {activeProject.ownership.map((item) => <li key={item.en}>{t(item, lang)}</li>)}
              </ul>
              <div className="tag-list">
                {activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="side-project-heading">
          <div>
            <span className="section-kicker">{t(ui.sideKicker, lang)}</span>
            <h3>{t(ui.sideTitle, lang)}</h3>
          </div>
          <p>{t(ui.sideIntro, lang)}</p>
        </div>
        <div className="side-project-grid">
          {sideProjects.map((project, index) => (
            <a key={project.title} href={project.href} target="_blank" rel="noreferrer">
              <span className="mini-index">0{index + 4}</span>
              <div className="side-logo-wrap"><img src={project.logo} alt={`${project.title} logo`} /></div>
              <h3>{project.title}</h3>
              <p>{t(project.copy, lang)}</p>
              <span className="side-link">{t(ui.visit, lang)} <Arrow diagonal /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="impact-section section-shell" id="impact">
        <div className="section-heading">
          <div>
            <span className="section-kicker">{t(ui.impactKicker, lang)}</span>
            <h2>{t(ui.impactTitle, lang)}</h2>
          </div>
          <p>{t(ui.impactIntro, lang)}</p>
        </div>

        <div className="impact-ledger">
          <div className="impact-tabs" role="tablist" aria-label="Impact cases">
            {impactCases.map((item) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={activeImpact.id === item.id}
                className={activeImpact.id === item.id ? "is-active" : ""}
                onClick={() => setActiveImpact(item)}
              >
                <span>{t(item.label, lang)}</span>
                <strong>{item.metric}</strong>
              </button>
            ))}
          </div>
          <div className="impact-display" key={activeImpact.id}>
            <div className="metric-display">
              <strong>{activeImpact.metric}</strong>
              <span>{t(activeImpact.metricLabel, lang)}</span>
            </div>
            <div className="impact-story">
              <span className="section-kicker">{t(activeImpact.label, lang)}</span>
              <h3>{t(activeImpact.title, lang)}</h3>
              <p>{t(activeImpact.copy, lang)}</p>
              <span className="ownership-label">{t(ui.evidence, lang)}</span>
              <ul>
                {activeImpact.proof.map((item) => <li key={item.en}>{t(item, lang)}</li>)}
              </ul>
            </div>
            <div className="impact-viz" aria-hidden="true">
              {[32, 52, 44, 72, 62, 88].map((height, index) => (
                <i key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="career section-shell" id="career">
        <div className="section-heading">
          <div>
            <span className="section-kicker">{t(ui.careerKicker, lang)}</span>
            <h2>{t(ui.careerTitle, lang)}</h2>
          </div>
          <p>{t(ui.careerIntro, lang)}</p>
        </div>

        <div className="career-grid">
          <article className="career-card current">
            <div className="org-logo"><img src="/assets/logo-dm.webp" alt="dm-drogerie markt" /></div>
            <span className="career-date">{t(ui.now, lang)}</span>
            <h3>{t(ui.dmRole, lang)}</h3>
            <p>{t(ui.dmCopy, lang)}</p>
            <div className="career-chip"><span className="status-dot" />{t(ui.today, lang)}</div>
          </article>
          <article className="career-card">
            <div className="org-logo flink"><img src="/assets/logo-flink.png" alt="Flink SE" /></div>
            <span className="career-date">{t(ui.flinkDate, lang)}</span>
            <h3>{t(ui.flinkRole, lang)}</h3>
            <p>{t(ui.flinkCopy, lang)}</p>
            <div className="career-metric">−15%</div>
          </article>
          <article className="education-card">
            <span className="education-mark">UH</span>
            <div>
              <span className="career-date">2023 — 2027</span>
              <h3>Universität Heidelberg</h3>
              <p>{t(ui.study, lang)} · 2,4</p>
            </div>
          </article>
          <article className="education-card">
            <span className="education-mark uf">UF</span>
            <div>
              <span className="career-date">2021 — 2023</span>
              <h3>University of Florida</h3>
              <p>{t(ui.study, lang)} · 71/120 Credits</p>
            </div>
          </article>
        </div>
      </section>

      <section className="beyond section-shell">
        <div className="beyond-intro">
          <span className="section-kicker">{t(ui.beyondKicker, lang)}</span>
          <h2>{t(ui.beyondTitle, lang)}</h2>
          <p>{t(ui.beyondCopy, lang)}</p>
        </div>
        <div className="beyond-cards">
          <article>
            <span className="beyond-icon">◎</span>
            <span className="section-kicker">{lang === "en" ? "Social impact" : "Gesellschaftlicher Beitrag"}</span>
            <h3>Paws from Georgia</h3>
            <p>{lang === "en" ? "Built an adoption experience to help Georgian dogs find homes." : "Eine Vermittlungsplattform gebaut, damit Hunde aus Georgien ein Zuhause finden."}</p>
          </article>
          <article>
            <span className="beyond-icon">✦</span>
            <span className="section-kicker">{lang === "en" ? "Scholarships" : "Stipendien"}</span>
            <h3>UWC + University of Florida</h3>
            <p>{lang === "en" ? "Two scholarships that made an international mathematics path possible." : "Zwei Stipendien, die einen internationalen Weg in der Mathematik ermöglichten."}</p>
          </article>
          <article>
            <span className="beyond-icon">↗</span>
            <span className="section-kicker">{lang === "en" ? "Learning & leadership" : "Lernen & Leadership"}</span>
            <h3>Google Data Analytics + Europe101</h3>
            <p>{lang === "en" ? "Formal analytics training complemented by a European leadership program." : "Formale Analytics-Ausbildung ergänzt durch ein europäisches Leadership-Programm."}</p>
          </article>
          <article>
            <span className="beyond-icon">AЯ</span>
            <span className="section-kicker">{lang === "en" ? "Languages" : "Sprachen"}</span>
            <h3>DE · EN · RU</h3>
            <p>{lang === "en" ? "German C1/C2 · English C1/C2 · Russian native." : "Deutsch C1/C2 · Englisch C1/C2 · Russisch Muttersprache."}</p>
          </article>
        </div>
      </section>

      <section className="toolbox section-shell">
        <div className="toolbox-copy">
          <span className="section-kicker">{lang === "en" ? "Toolbox" : "Werkzeuge"}</span>
          <h2>{lang === "en" ? "Tools change. Ownership stays." : "Werkzeuge wechseln. Ownership bleibt."}</h2>
        </div>
        <div className="skill-board">
          <div className="skill-cloud" aria-label="Skills">
            {skills.map((skill) => (
              <button key={skill} className={activeSkill === skill ? "is-active" : ""} onClick={() => setActiveSkill(skill)}>
                {skill}
              </button>
            ))}
          </div>
          <div className="skill-readout">
            <span>{lang === "en" ? "Currently selected" : "Ausgewählt"}</span>
            <strong>{activeSkill}</strong>
            <span className="readout-cursor">_</span>
          </div>
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="about-photo">
          <img src="/assets/about-photo.jpg" alt="Pavel Polishchuk at home with his dog" />
          <div className="photo-label">Pavel + {lang === "en" ? "the real project manager" : "der echte Projektmanager"}</div>
        </div>
        <div className="about-copy">
          <span className="section-kicker">{t(ui.aboutKicker, lang)}</span>
          <h2>{t(ui.aboutTitle, lang)}</h2>
          <p className="about-lead">{t(ui.aboutLead, lang)}</p>
          <p>{t(ui.aboutCopy, lang)}</p>
          <div className="about-links">
            <a className="button button-secondary" href="https://www.linkedin.com/in/pavelpolishchuk/" target="_blank" rel="noreferrer">
              {t(ui.linkedin, lang)} <Arrow diagonal />
            </a>
            <a className="button button-secondary" href="/Pavel_Polishchuk_CV_DE.pdf" target="_blank" rel="noreferrer">
              {t(ui.cv, lang)} <Arrow diagonal />
            </a>
          </div>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-star" aria-hidden="true">✦</div>
        <span className="section-kicker">{t(ui.contactKicker, lang)}</span>
        <h2>{t(ui.contactTitle1, lang)}<br /><em>{t(ui.contactTitle2, lang)}</em></h2>
        <a className="button button-primary contact-button" href="mailto:pavel.polishchuk@proton.me">
          pavel.polishchuk@proton.me <Arrow diagonal />
        </a>
      </section>

      <footer>
        <button className="brand" onClick={() => jumpTo("top")}>
          <span className="brand-mark">PP</span>
          <span>Pavel Polishchuk</span>
        </button>
        <span>{t(ui.footer, lang)}</span>
        <button className="back-top" onClick={() => jumpTo("top")}>{t(ui.top, lang)} ↑</button>
      </footer>
    </main>
  );
}
