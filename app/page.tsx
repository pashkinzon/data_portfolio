"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "de";
type LocalText = { en: string; de: string };

type Project = {
  id: string;
  number: string;
  shortTitle: LocalText;
  kicker: LocalText;
  title: LocalText;
  description: LocalText;
  impact: LocalText;
  ownership: LocalText[];
  summary: {
    problem: LocalText;
    role: LocalText;
    outcome: LocalText;
  };
  caseStudy: {
    challenge: LocalText;
    contribution: LocalText;
    decisions: LocalText[];
    result: LocalText;
    evidence: LocalText[];
  };
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
    en: "Retail analytics · automation · internal AI products",
    de: "Retail Analytics · Automatisierung · interne AI-Produkte",
  },
  heroLine1: { en: "Data Product Owner", de: "Data Product Owner" },
  heroLine2: { en: "& Analytics Builder.", de: "& Analytics Builder." },
  heroManifesto: {
    en: "I don’t just analyze data. I own what gets built.",
    de: "Ich analysiere nicht nur Daten. Ich verantworte, was daraus entsteht.",
  },
  heroCopy: {
    en: "I design and ship dashboards, data workflows, and internal AI tools—from an ambiguous retail question to measurable adoption.",
    de: "Ich konzipiere und liefere Dashboards, Datenworkflows und interne AI-Tools—von der unklaren Retail-Frage bis zur messbaren Nutzung.",
  },
  heroContext: {
    en: "Currently building retail analytics at dm across a network of more than 2,000 stores.",
    de: "Aktuell entwickle ich Retail Analytics bei dm für ein Netzwerk von mehr als 2.000 Märkten.",
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
  problem: { en: "Problem", de: "Problem" },
  myRole: { en: "My role", de: "Meine Rolle" },
  outcome: { en: "Outcome", de: "Ergebnis" },
  openCase: { en: "Open full case study", de: "Case Study öffnen" },
  closeCase: { en: "Close case study", de: "Case Study schließen" },
  caseChallenge: { en: "The challenge", de: "Die Herausforderung" },
  caseContribution: { en: "My individual contribution", de: "Mein individueller Beitrag" },
  caseDecisions: { en: "Key product decisions", de: "Zentrale Produktentscheidungen" },
  caseResult: { en: "Measured result", de: "Messbares Ergebnis" },
  caseEvidence: { en: "Evidence", de: "Belege" },
  sideKicker: { en: "Independent & social-impact builds", de: "Eigene & gemeinnützige Projekte" },
  sideTitle: { en: "Products beyond the day job.", de: "Produkte über den Job hinaus." },
  sideIntro: {
    en: "Small teams and personal projects are where I test ideas quickly, make useful interfaces, and build for communities I care about.",
    de: "In kleinen Teams und eigenen Projekten teste ich Ideen schnell, entwickle nützliche Interfaces und baue für Communities, die mir wichtig sind.",
  },
  visit: { en: "Visit project", de: "Projekt öffnen" },
  impactKicker: { en: "Measured outcomes", de: "Messbare Ergebnisse" },
  impactTitle: { en: "What changed.", de: "Was sich verändert hat." },
  impactIntro: {
    en: "Four outcomes from products and operations I personally helped own—shown together, with the unit and context attached.",
    de: "Vier Ergebnisse aus Produkten und Operations, die ich persönlich mitverantwortet habe—mit Einheit und Kontext auf einen Blick.",
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
    en: "Studied in Germany and the US, work across three languages, and translate comfortably between technical teams, business stakeholders, and diverse users.",
    de: "Studium in Deutschland und den USA, Arbeit in drei Sprachen und eine sichere Übersetzung zwischen Tech-Teams, Business-Stakeholdern und unterschiedlichen Nutzern.",
  },
  aboutKicker: { en: "Behind the products", de: "Hinter den Produkten" },
  aboutTitle: {
    en: "Mathematical thinking. Product ownership. Practical delivery.",
    de: "Mathematisches Denken. Product Ownership. Praktische Umsetzung.",
  },
  aboutLead: {
    en: "I am happiest where an ambiguous business question becomes a product someone can trust.",
    de: "Am liebsten arbeite ich dort, wo aus einer unklaren Geschäftsfrage ein Produkt wird, dem Menschen vertrauen.",
  },
  aboutCopy: {
    en: "I speak with users, define the analytical logic, build the workflow, and judge success by adoption—not by whether the code merely runs.",
    de: "Ich spreche mit Nutzern, definiere die analytische Logik, baue den Workflow und messe Erfolg an Nutzung—nicht nur daran, ob der Code läuft.",
  },
  linkedin: { en: "LinkedIn profile", de: "LinkedIn-Profil" },
  contactKicker: { en: "Have an unclear problem?", de: "Ein noch unklares Problem?" },
  contactTitle1: { en: "Let’s make it", de: "Machen wir es" },
  contactTitle2: { en: "useful.", de: "nützlich." },
  discuss: { en: "Discuss a role or project", de: "Über eine Rolle oder ein Projekt sprechen" },
  footer: { en: "Data products · analytics · ownership", de: "Datenprodukte · Analytics · Ownership" },
  top: { en: "Back to top", de: "Nach oben" },
};

const projects: Project[] = [
  {
    id: "automation",
    number: "01",
    shortTitle: { en: "KPI automation", de: "KPI-Automation" },
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
    summary: {
      problem: {
        en: "A five-person team spent roughly eight hours each week preparing individual KPI emails for 75 stores.",
        de: "Ein fünfköpfiges Team benötigte wöchentlich rund acht Stunden für individuelle KPI-Mails an 75 Märkte.",
      },
      role: {
        en: "Owned workflow discovery, KPI logic, Python/PySpark implementation, delivery automation, and team rollout.",
        de: "Verantwortete Prozessanalyse, KPI-Logik, Python/PySpark-Umsetzung, Versandautomatisierung und Team-Rollout.",
      },
      outcome: {
        en: "Reduced the complete weekly workflow to under 15 minutes—32× faster.",
        de: "Reduzierte den vollständigen Wochenprozess auf unter 15 Minuten—32× schneller.",
      },
    },
    caseStudy: {
      challenge: {
        en: "A five-person team repeatedly assembled and sent individual KPI emails for 75 stores. The weekly process consumed around eight hours, created avoidable manual work, and made consistent delivery harder.",
        de: "Ein fünfköpfiges Team erstellte und versendete wiederholt einzelne KPI-Mails für 75 Märkte. Der wöchentliche Prozess dauerte rund acht Stunden, erzeugte vermeidbare Handarbeit und erschwerte eine konsistente Auslieferung.",
      },
      contribution: {
        en: "I owned the solution from problem framing to rollout: mapped the existing workflow, defined the KPI and recipient logic, built the Python/PySpark generation pipeline, automated delivery, and introduced it to the operating team.",
        de: "Ich verantwortete die Lösung von der Problemdefinition bis zum Rollout: Ist-Prozess analysiert, KPI- und Empfängerlogik definiert, Python/PySpark-Pipeline gebaut, Versand automatisiert und im operativen Team eingeführt.",
      },
      decisions: [
        { en: "Standardize KPI calculation before automating delivery", de: "KPI-Berechnung vor dem Versand standardisieren" },
        { en: "Generate store-specific outputs from one reproducible workflow", de: "Marktspezifische Outputs aus einem reproduzierbaren Workflow erzeugen" },
        { en: "Design for team use rather than a one-person script", de: "Für Teamnutzung statt als Ein-Personen-Skript bauen" },
      ],
      result: {
        en: "Weekly reporting time fell from roughly eight hours to under 15 minutes—a 32× faster workflow serving all 75 stores.",
        de: "Die wöchentliche Reporting-Zeit sank von rund acht Stunden auf unter 15 Minuten—ein 32× schnellerer Workflow für alle 75 Märkte.",
      },
      evidence: [
        { en: "8h → <15m per week", de: "8 Std. → <15 Min. pro Woche" },
        { en: "75 stores", de: "75 Märkte" },
        { en: "Five-person team enabled", de: "Fünfköpfiges Team entlastet" },
      ],
    },
    image: "/assets/project-fuks-dashboard.png",
    alt: { en: "Retail analysis dashboard", de: "Dashboard für Retail-Analysen" },
    logo: "/assets/logo-dm.webp",
    logoAlt: "dm-drogerie markt",
    tags: ["Python", "PySpark", "Automation", "Reporting"],
  },
  {
    id: "copilot",
    number: "02",
    shortTitle: { en: "AI analyst", de: "AI-Analyst" },
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
    summary: {
      problem: {
        en: "Complex data questions depended on scarce specialist knowledge and several disconnected technical systems.",
        de: "Komplexe Datenfragen hingen von knappem Spezialwissen und mehreren getrennten technischen Systemen ab.",
      },
      role: {
        en: "Designed the assistant, integrated API and database context, shaped PySpark generation, and validated real usage.",
        de: "Konzipierte den Assistenten, integrierte API- und Datenbankkontext, gestaltete die PySpark-Generierung und validierte reale Nutzung.",
      },
      outcome: {
        en: "Moved from prototype to daily use by 5+ users, with a rollout path for more than 100.",
        de: "Vom Prototyp zur täglichen Nutzung durch 5+ Nutzer, mit Rollout-Pfad für mehr als 100.",
      },
    },
    caseStudy: {
      challenge: {
        en: "Complex internal data questions depended on scarce specialist knowledge: users needed to understand data structures, formulate PySpark logic, and navigate several technical systems before reaching an answer.",
        de: "Komplexe interne Datenfragen hingen von knappem Spezialwissen ab: Nutzer mussten Datenstrukturen verstehen, PySpark-Logik formulieren und mehrere technische Systeme bedienen, bevor sie eine Antwort erhielten.",
      },
      contribution: {
        en: "I identified the repeated analyst bottleneck, designed the assistant workflow, connected company context through APIs and databases, shaped the code-generation behavior, and validated the first daily-use cases.",
        de: "Ich identifizierte den wiederkehrenden Analysten-Engpass, konzipierte den Assistenten-Workflow, band Unternehmenskontext über APIs und Datenbanken an, gestaltete die Code-Generierung und validierte die ersten täglichen Use Cases.",
      },
      decisions: [
        { en: "Ground answers in company data context instead of generic AI output", de: "Antworten im Unternehmenskontext statt in generischem AI-Output verankern" },
        { en: "Return usable PySpark code alongside explanations", de: "Nutzbaren PySpark-Code zusammen mit Erklärungen liefern" },
        { en: "Validate with a small daily-user group before wider rollout", de: "Mit einer kleinen täglichen Nutzergruppe vor dem breiten Rollout validieren" },
      ],
      result: {
        en: "The assistant moved from prototype to daily use by more than five users, with a defined path toward a 100+ user rollout.",
        de: "Der Assistent entwickelte sich vom Prototyp zum täglich genutzten Produkt mit mehr als fünf Nutzern und einem definierten Rollout-Pfad für über 100 Nutzer.",
      },
      evidence: [
        { en: "5+ daily users", de: "5+ tägliche Nutzer" },
        { en: "100+ users in planned rollout", de: "100+ Nutzer im geplanten Rollout" },
        { en: "API + database context", de: "API- + Datenbankkontext" },
      ],
    },
    image: "/project-atlas-v3.png",
    alt: { en: "Visual map of Pavel's data products", de: "Visuelle Karte von Pavels Datenprodukten" },
    logo: "/assets/logo-dm.webp",
    logoAlt: "dm-drogerie markt",
    tags: ["AI", "APIs", "Databases", "PySpark"],
  },
  {
    id: "layout",
    number: "03",
    shortTitle: { en: "Layout impact", de: "Layout Impact" },
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
    summary: {
      problem: {
        en: "Assortment and space-planning teams lacked one trusted view of how layout changes affected performance.",
        de: "Sortiments- und Space-Planning-Teams fehlte eine vertrauenswürdige Sicht auf die Wirkung von Layout-Änderungen.",
      },
      role: {
        en: "Owned the product brief, KPI model, dashboard UX, implementation, stakeholder validation, and adoption.",
        de: "Verantwortete Product Brief, KPI-Modell, Dashboard-UX, Umsetzung, Stakeholder-Validierung und Adoption.",
      },
      outcome: {
        en: "Became a weekly decision tool for around 30 users across three cross-functional teams.",
        de: "Wurde zum wöchentlichen Entscheidungswerkzeug für rund 30 Nutzer in drei funktionsübergreifenden Teams.",
      },
    },
    caseStudy: {
      challenge: {
        en: "Assortment and space-planning teams needed a shared way to understand how layout changes affected performance. Questions were fragmented across teams and lacked one trusted analytical view.",
        de: "Sortiments- und Space-Planning-Teams brauchten eine gemeinsame Sicht darauf, wie Layout-Änderungen die Performance beeinflussen. Fragen waren über Teams verteilt, eine vertrauenswürdige analytische Sicht fehlte.",
      },
      contribution: {
        en: "I conceived the product from scratch, translated stakeholder questions into a product brief, created the KPI model, designed and built the dashboard, and iterated it into a recurring cross-team decision tool.",
        de: "Ich entwickelte das Produkt von Grund auf, übersetzte Stakeholder-Fragen in einen Product Brief, erstellte das KPI-Modell, konzipierte und baute das Dashboard und entwickelte es zu einem regelmäßig genutzten teamübergreifenden Entscheidungswerkzeug.",
      },
      decisions: [
        { en: "Organize the product around decisions, not available data tables", de: "Das Produkt um Entscheidungen statt vorhandene Datentabellen strukturieren" },
        { en: "Create one comparable KPI model across layout cases", de: "Ein vergleichbares KPI-Modell für unterschiedliche Layout-Fälle schaffen" },
        { en: "Make recurring use the success criterion", de: "Wiederkehrende Nutzung als Erfolgskriterium definieren" },
      ],
      result: {
        en: "The product became a weekly decision surface for around 30 users across assortment, space-planning, and advisory teams.",
        de: "Das Produkt wurde zu einer wöchentlichen Entscheidungsoberfläche für rund 30 Nutzer aus Sortiment, Space Planning und Beratung.",
      },
      evidence: [
        { en: "30 weekly users", de: "30 wöchentliche Nutzer" },
        { en: "Three cross-functional user groups", de: "Drei funktionsübergreifende Nutzergruppen" },
        { en: "Owned from idea to adoption", de: "Von der Idee bis zur Nutzung verantwortet" },
      ],
    },
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

const capabilities = [
  {
    number: "01",
    title: { en: "Discover & define", de: "Verstehen & definieren" },
    copy: {
      en: "Turn unclear stakeholder questions into a product brief, KPI model, and measurable success criteria.",
      de: "Unklare Stakeholder-Fragen in Product Brief, KPI-Modell und messbare Erfolgskriterien übersetzen.",
    },
    items: ["Stakeholder discovery", "KPI definition", "Product framing"],
  },
  {
    number: "02",
    title: { en: "Analyse & build", de: "Analysieren & bauen" },
    copy: {
      en: "Create reproducible analysis, dashboards, automation, and internal tools with the right technical depth.",
      de: "Reproduzierbare Analysen, Dashboards, Automatisierung und interne Tools mit der passenden technischen Tiefe bauen.",
    },
    items: ["Python", "PySpark", "SQL", "Looker", "APIs"],
  },
  {
    number: "03",
    title: { en: "Deliver & earn adoption", de: "Ausliefern & Nutzung sichern" },
    copy: {
      en: "Roll products into real workflows, support users, and improve them using adoption and operational evidence.",
      de: "Produkte in reale Workflows integrieren, Nutzer begleiten und anhand von Adoption und operativen Belegen verbessern.",
    },
    items: ["Rollout", "Automation", "User validation", "Adoption"],
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [openCaseStudy, setOpenCaseStudy] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("pavel-portfolio-language");
    if (saved === "de" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    if (!openCaseStudy) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenCaseStudy(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openCaseStudy]);

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
        <p className="hero-manifesto reveal-up delay-2">{t(ui.heroManifesto, lang)}</p>
        <p className="hero-copy reveal-up delay-2">{t(ui.heroCopy, lang)}</p>
        <p className="hero-context reveal-up delay-2">{t(ui.heroContext, lang)}</p>
        <div className="hero-actions reveal-up delay-3">
          <button className="button button-primary" onClick={() => jumpTo("work")}>
            {t(ui.explore, lang)} <Arrow />
          </button>
          <a className="button button-secondary" href="/Pavel_Polishchuk_CV_DE.pdf" target="_blank" rel="noreferrer">
            {t(ui.cv, lang)} <Arrow diagonal />
          </a>
        </div>
        <div className="hero-metrics reveal-up delay-3">
          <div><strong>32×</strong><span>{lang === "en" ? "faster weekly KPI delivery" : "schnellere wöchentliche KPI-Auslieferung"}</span></div>
          <div><strong>75</strong><span>{lang === "en" ? "stores receiving automated KPI reports" : "Märkte mit automatisierten KPI-Reports"}</span></div>
          <div><strong>2,000+</strong><span>{lang === "en" ? "stores covered by retail analysis" : "Märkte im analytischen Wirkungsbereich"}</span></div>
          <div><strong>30</strong><span>{lang === "en" ? "weekly dashboard users across teams" : "wöchentliche Dashboard-Nutzer in mehreren Teams"}</span></div>
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
          <div className={`project-visual project-visual-${activeProject.id}`} key={activeProject.id}>
            <div className="project-visual-topline">
              <span>{t(activeProject.kicker, lang)}</span>
              <span>{activeProject.number} / 03</span>
            </div>

            <div className="project-slide-card">
              <div className="screenshot-toolbar">
                <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
                <span>{t(activeProject.shortTitle, lang)} · {lang === "en" ? "evidence slide" : "Evidence Slide"}</span>
                <span>{activeProject.number}</span>
              </div>

              {activeProject.id === "copilot" ? (
                <div className="ai-architecture-slide" role="img" aria-label={t(activeProject.alt, lang)}>
                  <div className="ai-slide-heading">
                    <span>{lang === "en" ? "Product architecture" : "Produktarchitektur"}</span>
                    <h4>{lang === "en" ? "From a company question to executable PySpark" : "Von der Unternehmensfrage zu ausführbarem PySpark"}</h4>
                  </div>
                  <div className="ai-flow">
                    <div><span>01</span><strong>{lang === "en" ? "Ask" : "Frage"}</strong><small>{lang === "en" ? "Business question" : "Business-Frage"}</small></div>
                    <b aria-hidden="true">→</b>
                    <div><span>02</span><strong>{lang === "en" ? "Ground" : "Kontext"}</strong><small>APIs + {lang === "en" ? "database" : "Datenbank"}</small></div>
                    <b aria-hidden="true">→</b>
                    <div><span>03</span><strong>{lang === "en" ? "Build" : "Bauen"}</strong><small>PySpark + {lang === "en" ? "answer" : "Antwort"}</small></div>
                  </div>
                  <div className="ai-proof-row">
                    <span><strong>5+</strong>{lang === "en" ? " daily users" : " tägliche Nutzer"}</span>
                    <span><strong>100+</strong>{lang === "en" ? " planned rollout" : " geplanter Rollout"}</span>
                  </div>
                </div>
              ) : (
                <div className="screenshot-crop">
                  <img src={activeProject.image} alt={t(activeProject.alt, lang)} />
                </div>
              )}
            </div>

            <div className="project-visual-footer">
              <div className="project-impact">
                <span className="impact-pulse" />
                {t(activeProject.impact, lang)}
              </div>
              <span>{lang === "en" ? "Selected evidence" : "Ausgewählter Beleg"} · {activeProject.number}</span>
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
                  <span className="project-tab-label">{t(project.shortTitle, lang)}</span>
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
              <div className="project-summary">
                <section>
                  <span>{t(ui.problem, lang)}</span>
                  <p>{t(activeProject.summary.problem, lang)}</p>
                </section>
                <section>
                  <span>{t(ui.myRole, lang)}</span>
                  <p>{t(activeProject.summary.role, lang)}</p>
                </section>
                <section className="summary-outcome">
                  <span>{t(ui.outcome, lang)}</span>
                  <p>{t(activeProject.summary.outcome, lang)}</p>
                </section>
              </div>
              <button className="case-study-button" onClick={() => setOpenCaseStudy(activeProject)}>
                {t(ui.openCase, lang)} <Arrow />
              </button>
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

        <div className="impact-grid">
          {impactCases.map((item) => (
            <article key={item.id} className={`impact-card impact-card-${item.id}`}>
              <div className="impact-card-top">
                <span>{t(item.label, lang)}</span>
                <i aria-hidden="true">0{impactCases.indexOf(item) + 1}</i>
              </div>
              <strong>{item.metric}</strong>
              <span className="impact-unit">{t(item.metricLabel, lang)}</span>
              <h3>{t(item.title, lang)}</h3>
              <p>{t(item.copy, lang)}</p>
              <div className="impact-proof">
                {item.proof.slice(0, 2).map((proof) => <span key={proof.en}>{t(proof, lang)}</span>)}
              </div>
            </article>
          ))}
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
          <span className="section-kicker">{lang === "en" ? "Capabilities" : "Kompetenzen"}</span>
          <h2>{lang === "en" ? "Tools change. Ownership stays." : "Werkzeuge wechseln. Ownership bleibt."}</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article key={capability.number}>
              <span className="capability-number">{capability.number}</span>
              <h3>{t(capability.title, lang)}</h3>
              <p>{t(capability.copy, lang)}</p>
              <div className="capability-items">
                {capability.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
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
          {t(ui.discuss, lang)} <Arrow diagonal />
        </a>
        <a className="contact-email" href="mailto:pavel.polishchuk@proton.me">pavel.polishchuk@proton.me</a>
      </section>

      <footer>
        <button className="brand" onClick={() => jumpTo("top")}>
          <span className="brand-mark">PP</span>
          <span>Pavel Polishchuk</span>
        </button>
        <span>{t(ui.footer, lang)}</span>
        <button className="back-top" onClick={() => jumpTo("top")}>{t(ui.top, lang)} ↑</button>
      </footer>

      {openCaseStudy && (
        <div
          className="case-study-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenCaseStudy(null);
          }}
        >
          <article
            className="case-study-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <header className="case-study-header">
              <div>
                <span className="section-kicker">{t(openCaseStudy.kicker, lang)}</span>
                <h2 id="case-study-title">{t(openCaseStudy.title, lang)}</h2>
              </div>
              <button className="case-study-close" onClick={() => setOpenCaseStudy(null)} aria-label={t(ui.closeCase, lang)}>
                ×
              </button>
            </header>

            <div className="case-study-result">
              <span>{t(ui.caseResult, lang)}</span>
              <strong>{t(openCaseStudy.impact, lang)}</strong>
            </div>

            <div className="case-study-grid">
              <section>
                <span className="case-label">{t(ui.caseChallenge, lang)}</span>
                <p>{t(openCaseStudy.caseStudy.challenge, lang)}</p>
              </section>
              <section className="case-contribution">
                <span className="case-label">{t(ui.caseContribution, lang)}</span>
                <p>{t(openCaseStudy.caseStudy.contribution, lang)}</p>
              </section>
              <section>
                <span className="case-label">{t(ui.caseDecisions, lang)}</span>
                <ul>
                  {openCaseStudy.caseStudy.decisions.map((item) => <li key={item.en}>{t(item, lang)}</li>)}
                </ul>
              </section>
              <section>
                <span className="case-label">{t(ui.caseResult, lang)}</span>
                <p>{t(openCaseStudy.caseStudy.result, lang)}</p>
                <div className="case-evidence" aria-label={t(ui.caseEvidence, lang)}>
                  {openCaseStudy.caseStudy.evidence.map((item) => <strong key={item.en}>{t(item, lang)}</strong>)}
                </div>
              </section>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
