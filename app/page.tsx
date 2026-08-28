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
const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const ui = {
  navWork: { en: "Work", de: "Projekte" },
  navImpact: { en: "Impact", de: "Wirkung" },
  navCareer: { en: "Career", de: "Laufbahn" },
  navAbout: { en: "About", de: "Über mich" },
  talk: { en: "Let’s talk", de: "Kontakt" },
  menu: { en: "Menu", de: "Menü" },
  close: { en: "Close", de: "Schließen" },
  heroEyebrow: {
    en: "Mathematics · data products · automation",
    de: "Mathematik · Datenprodukte · Automatisierung",
  },
  heroLine1: { en: "Define clearly.", de: "Klar definieren." },
  heroLine2: { en: "Build what helps.", de: "Bauen, was hilft." },
  heroManifesto: {
    en: "Data analyst who turns recurring work into scalable products.",
    de: "Data Analyst, der wiederkehrende Arbeit in skalierbare Produkte übersetzt.",
  },
  heroCopy: {
    en: "Mathematics student with about two years of experience building Python/SQL data pipelines, API integrations, self-service applications, and useful AI-supported workflows.",
    de: "Mathematikstudent mit rund zwei Jahren Erfahrung in Python-/SQL-Datenpipelines, API-Integrationen, Self-Service-Anwendungen und sinnvoll eingesetzten KI-Workflows.",
  },
  heroContext: {
    en: "Currently in assortment and store analytics at dm. Seeking a long-term working-student role with a path to a full-time position after graduation in March 2028.",
    de: "Aktuell in der Sortiments- und Filialanalytik bei dm. Suche eine langfristige Werkstudentenposition mit Perspektive auf den Berufseinstieg nach dem Abschluss im März 2028.",
  },
  explore: { en: "See how I work", de: "Meine Arbeitsweise ansehen" },
  cv: { en: "Open CV (DE)", de: "Lebenslauf öffnen" },
  workKicker: { en: "Selected builds", de: "Ausgewählte Builds" },
  workTitle: { en: "Define. Build. Improve.", de: "Definieren. Bauen. Verbessern." },
  workIntro: {
    en: "My work starts by clarifying the decision behind a request, reusing proven methods where possible, and improving the result through feedback from users and colleagues.",
    de: "Meine Arbeit beginnt damit, die Entscheidung hinter einer Anfrage zu klären, bewährte Methoden wiederzuverwenden und das Ergebnis durch Feedback von Nutzern und Kollegen zu verbessern.",
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
  sideKicker: { en: "Independent initiative projects", de: "Eigene Initiativprojekte" },
  sideTitle: { en: "Products beyond the day job.", de: "Produkte über den Job hinaus." },
  sideIntro: {
    en: "Small teams and personal projects are where I test ideas quickly, make useful interfaces, and build for communities I care about.",
    de: "In kleinen Teams und eigenen Projekten teste ich Ideen schnell, entwickle nützliche Interfaces und baue für Communities, die mir wichtig sind.",
  },
  visit: { en: "Visit project", de: "Projekt öffnen" },
  impactKicker: { en: "Measured outcomes", de: "Messbare Ergebnisse" },
  impactTitle: { en: "What changed.", de: "Was sich verändert hat." },
  impactIntro: {
    en: "Measured outcomes where they exist; an honest status note where adoption is still being learned.",
    de: "Messbare Ergebnisse, wo sie belegt sind; ein ehrlicher Status, wo Adoption noch gelernt wird.",
  },
  evidence: { en: "Evidence", de: "Belege" },
  careerKicker: { en: "Career & education", de: "Beruf & Ausbildung" },
  careerTitle: { en: "Responsibility grew fast.", de: "Verantwortung wuchs schnell." },
  careerIntro: {
    en: "From hands-on operations responsibility to retail analytics—with a mathematics foundation across Germany and the US.",
    de: "Von praktischer Verantwortung im operativen Betrieb zu Retail Analytics—mit mathematischem Fundament in Deutschland und den USA.",
  },
  today: { en: "Today", de: "Heute" },
  now: { en: "Oct 2024 — now", de: "Okt 2024 — heute" },
  dmRole: { en: "Working Student · Assortment & Store Analytics", de: "Werkstudent · Sortiments- & Filialanalytik" },
  dmCopy: {
    en: "Translate open business questions into data preparation, models, and clear decision support for assortment and store decisions across more than 2,000 stores.",
    de: "Übersetze offene Geschäftsfragen in Datenaufbereitungen, Modelle und verständliche Entscheidungsgrundlagen für Sortiments- und Filialentscheidungen in über 2.000 Märkten.",
  },
  flinkDate: { en: "Oct 2023 — Sep 2024", de: "Okt 2023 — Sep 2024" },
  flinkRole: {
    en: "Operations Associate / Ops Associate Plus",
    de: "Operations Associate / Ops Associate Plus",
  },
  flinkCopy: {
    en: "Took on shift coordination, delivery control, order accuracy, and communication with customers and riders; improved the hub layout and picking system.",
    de: "Übernahm Schichtkoordination, Liefersteuerung, Auftragsqualität und Kommunikation mit Kunden und Fahrern; verbesserte Hub-Layout und Kommissioniersystem.",
  },
  studyHeidelberg: { en: "Mathematics · B.Sc.", de: "Mathematik · B.Sc." },
  studyFlorida: { en: "Mathematics · B.A.", de: "Mathematik · B.A." },
  beyondKicker: { en: "Beyond the job title", de: "Mehr als die Stellenbezeichnung" },
  beyondTitle: { en: "Curious across borders.", de: "Neugierig über Grenzen hinweg." },
  beyondCopy: {
    en: "Studied in Germany and the US, work across three languages, and translate comfortably between technical teams, business stakeholders, and diverse users.",
    de: "Studium in Deutschland und den USA, Arbeit in drei Sprachen und eine sichere Übersetzung zwischen Tech-Teams, Business-Stakeholdern und unterschiedlichen Nutzern.",
  },
  aboutKicker: { en: "Behind the products", de: "Hinter den Produkten" },
  aboutTitle: {
    en: "I would rather test a hypothesis than debate it for a week.",
    de: "Ich teste lieber eine Hypothese, als eine Woche darüber zu diskutieren.",
  },
  aboutLead: {
    en: "I take ownership from the first question through implementation, testing, documentation, and user support.",
    de: "Ich übernehme Verantwortung von der ersten Fragestellung über Umsetzung und Tests bis zu Dokumentation und Anwenderunterstützung.",
  },
  aboutCopy: {
    en: "I begin by understanding what stakeholders already know, define the question precisely, and challenge my analysis with colleagues before communicating results. Visible tickets and workload help me set realistic timing and offer useful alternatives when priorities compete.",
    de: "Ich beginne damit zu verstehen, was Stakeholder bereits wissen, definiere die Frage präzise und lasse meine Analyse von Kollegen hinterfragen, bevor ich Ergebnisse kommuniziere. Sichtbare Tickets und Auslastung helfen mir, realistische Zeitrahmen zu nennen und bei konkurrierenden Prioritäten sinnvolle Alternativen anzubieten.",
  },
  linkedin: { en: "LinkedIn profile", de: "LinkedIn-Profil" },
  contactKicker: { en: "Have an unclear problem?", de: "Ein noch unklares Problem?" },
  contactTitle1: { en: "Let’s make it", de: "Machen wir es" },
  contactTitle2: { en: "useful.", de: "nützlich." },
  discuss: { en: "Discuss a role or project", de: "Über eine Rolle oder ein Projekt sprechen" },
  footer: { en: "Data analysis · automation · self-service tools", de: "Datenanalyse · Automatisierung · Self-Service-Tools" },
  top: { en: "Back to top", de: "Nach oben" },
};

const projects: Project[] = [
  {
    id: "assortment",
    number: "01",
    shortTitle: { en: "Self-service platform", de: "Self-Service-Plattform" },
    kicker: { en: "dm · Product ownership & development", de: "dm · Product Ownership & Entwicklung" },
    title: { en: "One platform now covers 80% of recurring analysis requests", de: "Eine Plattform deckt heute 80 % der wiederkehrenden Analyseanfragen ab" },
    description: {
      en: "I initiated and built an end-to-end analytical product that consolidates recurring assortment and store-layout work into a reusable data pipeline, analysis modules, APIs, and an interactive web dashboard.",
      de: "Ich initiierte und entwickelte ein analytisches End-to-End-Produkt, das wiederkehrende Sortiments- und Filialanalysen in einer wiederverwendbaren Datenpipeline, Analysemodulen, APIs und einem interaktiven Web-Dashboard bündelt.",
    },
    impact: { en: "6.4 → 1.7 days · −73%", de: "6,4 → 1,7 Tage · −73 %" },
    ownership: [
      { en: "Acted as product owner from problem discovery to rollout", de: "Product Owner von der Problemdefinition bis zum Rollout" },
      { en: "Built the reusable analytical modules and data pipeline", de: "Wiederverwendbare Analysemodule und Datenpipeline entwickelt" },
      { en: "Developed the APIs and interactive web dashboard", de: "APIs und interaktives Web-Dashboard entwickelt" },
      { en: "Tested the beta across 14 assortment projects", de: "Beta in 14 Sortimentsprojekten getestet" },
    ],
    summary: {
      problem: {
        en: "Recurring assortment and layout questions were rebuilt as separate notebook analyses and PowerPoint presentations, slowing delivery and fragmenting analytical knowledge.",
        de: "Wiederkehrende Sortiments- und Layoutfragen wurden als separate Notebook-Analysen und PowerPoint-Präsentationen neu erstellt. Das verlangsamte die Bearbeitung und verteilte Wissen auf Einzellösungen.",
      },
      role: {
        en: "Owned and developed the solution end to end: product framing, Python/PySpark modules, data pipeline, API integration, dashboard UX, testing, documentation, and rollout.",
        de: "Verantwortete und entwickelte die Lösung End-to-End: Product Framing, Python-/PySpark-Module, Datenpipeline, API-Integration, Dashboard-UX, Tests, Dokumentation und Rollout.",
      },
      outcome: {
        en: "Across 14 beta projects, active completion time fell from 6.4 to 1.7 days. The platform standardizes about 80% of recurring request types.",
        de: "In 14 Beta-Projekten sank die aktive Bearbeitungszeit von 6,4 auf 1,7 Tage. Die Plattform standardisiert rund 80 % der wiederkehrenden Anfragetypen.",
      },
    },
    caseStudy: {
      challenge: {
        en: "Most tickets varied in business context, but reused the same analytical building blocks: sales, quantity, efficiency, shelf metres, layout changes, adjacency, market profiles, and product hierarchies.",
        de: "Die Tickets unterschieden sich im Geschäftskontext, nutzten aber dieselben analytischen Bausteine: Umsatz, Menge, Effizienz, Regalmetern, Layoutänderungen, Nachbarschaften, Marktprofile und Produkthierarchien.",
      },
      contribution: {
        en: "I initiated the product, translated repeated work into reusable modules, built the Python/PySpark pipeline and web interface, and am preparing broader stakeholder access through direct API integration.",
        de: "Ich initiierte das Produkt, überführte wiederkehrende Arbeit in wiederverwendbare Module, entwickelte Python-/PySpark-Pipeline und Web-Oberfläche und bereite den breiteren Zugang über direkte API-Integration vor.",
      },
      decisions: [
        { en: "Standardize analytical quality without removing project-specific flexibility", de: "Analytische Qualität standardisieren, ohne projektspezifische Flexibilität zu verlieren" },
        { en: "Separate reusable data logic from the interactive decision interface", de: "Wiederverwendbare Datenlogik von der interaktiven Entscheidungsoberfläche trennen" },
        { en: "Measure active processing and feedback time, excluding queue time", de: "Aktive Bearbeitungs- und Feedbackzeit messen, Wartezeit ausschließen" },
      ],
      result: {
        en: "The beta has supported 14 assortment projects. Typical active completion time dropped by 4.7 days, from 6.4 to 1.7 days—an approximately 73% reduction.",
        de: "Die Beta unterstützte 14 Sortimentsprojekte. Die typische aktive Bearbeitungszeit sank um 4,7 Tage von 6,4 auf 1,7 Tage – eine Reduktion von rund 73 %.",
      },
      evidence: [
        { en: "14 assortment projects", de: "14 Sortimentsprojekte" },
        { en: "6.4 → 1.7 active days", de: "6,4 → 1,7 aktive Tage" },
        { en: "~80% recurring request coverage", de: "~80 % Abdeckung wiederkehrender Anfragen" },
      ],
    },
    image: "",
    alt: { en: "Illustrative architecture of the self-service dashboard", de: "Illustrative Architektur des Self-Service-Dashboards" },
    logo: assetPath("/assets/dm.svg"),
    logoAlt: "dm-drogerie markt",
    tags: ["Python", "Databases", "HTML/CSS", "Self-service analytics"],
  },
  {
    id: "automation",
    number: "02",
    shortTitle: { en: "Assortment potential model", de: "Sortiments-Potenzialmodell" },
    kicker: { en: "dm · Python, regression & Looker", de: "dm · Python, Regression & Looker" },
    title: { en: "A model turned shelf-space variation into a €760k opportunity", de: "Ein Modell machte aus Regalvarianten ein Potenzial von 760.000 €" },
    description: {
      en: "I built a Python and regression-based model with an interactive Looker dashboard to evaluate assortment variants and support decisions on which shelf-length options to introduce or retire.",
      de: "Ich entwickelte ein Python- und regressionsbasiertes Modell mit interaktivem Looker-Dashboard, um Sortimentsvarianten zu bewerten und Entscheidungen über neue oder entfallende Regallängen zu unterstützen.",
    },
    impact: { en: "€760k conservatively derived", de: "760.000 € konservativ abgeleitet" },
    ownership: [
      { en: "Normalized market-level deviations from standard shelf variants", de: "Marktabweichungen von Standard-Regalvarianten normalisiert" },
      { en: "Developed the regression and recommendation logic", de: "Regressions- und Empfehlungslogik entwickelt" },
      { en: "Built the interactive Looker decision dashboard", de: "Interaktives Looker-Entscheidungsdashboard entwickelt" },
      { en: "Translated model results into an implementation case", de: "Modellergebnisse in einen Implementierungsfall übersetzt" },
    ],
    summary: {
      problem: {
        en: "Stores often deviated from standard shelf-length variants, making performance comparisons noisy and future assortment-variant decisions difficult.",
        de: "Märkte wichen häufig von Standard-Regalvarianten ab. Das erschwerte Performancevergleiche und Entscheidungen über zukünftige Sortimentsvarianten.",
      },
      role: {
        en: "Built the full analytical workflow in Python, developed the regression approach, and created an interactive Looker dashboard for assortment teams.",
        de: "Entwickelte den vollständigen Analyseworkflow in Python, den Regressionsansatz und ein interaktives Looker-Dashboard für Sortimentsteams.",
      },
      outcome: {
        en: "In Q4 2025 and Q1 2026, realized revenue averaged 3.7% above the forecast, supporting a conservative derivation of roughly €760,000 in additional revenue.",
        de: "In Q4 2025 und Q1 2026 lag der realisierte Umsatz im Mittel 3,7 % über der Prognose. Daraus lassen sich konservativ rund 760.000 € Mehrumsatz ableiten.",
      },
    },
    caseStudy: {
      challenge: {
        en: "Custom shelf implementations across stores obscured which standardized variants were commercially effective and which options should enter the future assortment pool.",
        de: "Individuelle Regallösungen in den Märkten verdeckten, welche standardisierten Varianten wirtschaftlich funktionieren und künftig in den Variantenpool aufgenommen werden sollten.",
      },
      contribution: {
        en: "I connected market and assortment data, normalized variant deviations, modeled expected performance, and made the comparison explorable in Looker for decision-makers.",
        de: "Ich verband Markt- und Sortimentsdaten, normalisierte Variantenabweichungen, modellierte die erwartete Performance und machte den Vergleich in Looker für Entscheider:innen explorierbar.",
      },
      decisions: [
        { en: "Compare realized performance with a model-based forecast", de: "Realisierte Performance mit einer modellbasierten Prognose vergleichen" },
        { en: "Keep the revenue derivation deliberately conservative", de: "Die Umsatzableitung bewusst konservativ halten" },
        { en: "Expose assumptions and variant comparisons in an interactive dashboard", de: "Annahmen und Variantenvergleiche in einem interaktiven Dashboard sichtbar machen" },
      ],
      result: {
        en: "The realized result averaged 3.7% above forecast across Q4 2025 and Q1 2026, corresponding to a conservatively derived additional revenue of about €760,000.",
        de: "Der realisierte Umsatz lag in Q4 2025 und Q1 2026 im Mittel 3,7 % über der Prognose – entsprechend konservativ rund 760.000 € abgeleitetem Mehrumsatz.",
      },
      evidence: [
        { en: "+3.7% vs forecast", de: "+3,7 % ggü. Prognose" },
        { en: "Q4 2025 + Q1 2026", de: "Q4 2025 + Q1 2026" },
        { en: "~€760k conservative derivation", de: "~760.000 € konservative Ableitung" },
      ],
    },
    image: "",
    alt: { en: "Illustrative workflow of the assortment potential model", de: "Illustrativer Workflow des Sortiments-Potenzialmodells" },
    logo: assetPath("/assets/dm.svg"),
    logoAlt: "dm-drogerie markt",
    tags: ["Python", "Regression", "Looker", "Assortment optimization"],
  },
  {
    id: "copilot",
    number: "03",
    shortTitle: { en: "Team AI agent", de: "KI-Agent fürs Team" },
    kicker: { en: "dm · API & database-grounded agent", de: "dm · API- & datenbankgestützter Agent" },
    title: { en: "A custom agent became part of the team’s daily analytical work", de: "Ein eigener Agent wurde Teil der täglichen Analytics-Arbeit" },
    description: {
      en: "I developed an agent that combines team standards, reusable workflows, database APIs, and PySpark/Zeppelin conventions to support coding and database questions with current internal context.",
      de: "Ich entwickelte einen Agenten, der Teamstandards, wiederverwendbare Workflows, Datenbank-APIs und PySpark-/Zeppelin-Konventionen verbindet und Coding- sowie Datenbankfragen mit aktuellem internem Kontext unterstützt.",
    },
    impact: { en: "275 chats · 2,000 messages", de: "275 Chats · 2.000 Nachrichten" },
    ownership: [
      { en: "Identified repeated technical friction", de: "Wiederkehrende technische Reibung identifiziert" },
      { en: "Connected API and database context", de: "API- und Datenbankkontext verbunden" },
      { en: "Built and tested automations", de: "Automatisierungen gebaut und getestet" },
    ],
    summary: {
      problem: {
        en: "Repeated data work required specialist context and movement between disconnected technical systems.",
        de: "Wiederkehrende Datenarbeit erforderte Spezialwissen und Wechsel zwischen getrennten technischen Systemen.",
      },
      role: {
        en: "Developed the custom agent, consolidated team standards and reusable code, connected database APIs, and shaped validated PySpark/Zeppelin outputs.",
        de: "Entwickelte den eigenen Agenten, bündelte Teamstandards und wiederverwendbaren Code, band Datenbank-APIs an und strukturierte validierte PySpark-/Zeppelin-Ausgaben.",
      },
      outcome: {
        en: "The seven-person analytics team uses the agent daily; internal tracking recorded about 275 new chats and 2,000 messages within a few months.",
        de: "Das siebenköpfige Analytics-Team nutzt den Agenten täglich; intern wurden innerhalb weniger Monate rund 275 neue Chats und 2.000 Nachrichten erfasst.",
      },
    },
    caseStudy: {
      challenge: {
        en: "Some recurring data tasks depended on technical context spread across APIs, databases, and specialist knowledge.",
        de: "Einige wiederkehrende Datenaufgaben hingen von technischem Kontext aus APIs, Datenbanken und Spezialwissen ab.",
      },
      contribution: {
        en: "I built and iterated the agent, encoded the team’s coding and documentation conventions, connected current database context, and moved the product into daily team use.",
        de: "Ich entwickelte und iterierte den Agenten, hinterlegte Coding- und Dokumentationsstandards des Teams, band aktuellen Datenbankkontext an und überführte das Produkt in die tägliche Nutzung.",
      },
      decisions: [
        { en: "Ground outputs in internal context instead of generic AI responses", de: "Outputs im internen Kontext statt in generischen AI-Antworten verankern" },
        { en: "Automate repeated work before expanding feature scope", de: "Wiederkehrende Arbeit automatisieren, bevor der Feature-Scope wächst" },
        { en: "Track real usage rather than forecast adoption", de: "Reale Nutzung messen statt Adoption zu prognostizieren" },
      ],
      result: {
        en: "The agent moved into daily use across the seven-person team and processed roughly 275 chats and 2,000 messages within its first months.",
        de: "Der Agent wurde in die tägliche Nutzung des siebenköpfigen Teams überführt und verarbeitete in den ersten Monaten rund 275 Chats und 2.000 Nachrichten.",
      },
      evidence: [
        { en: "Daily use by a 7-person team", de: "Tägliche Nutzung im 7-köpfigen Team" },
        { en: "~275 chats", de: "~275 Chats" },
        { en: "~2,000 messages", de: "~2.000 Nachrichten" },
      ],
    },
    image: "",
    alt: { en: "Illustrative architecture of an internal automation workflow", de: "Illustrative Architektur eines internen Automatisierungsworkflows" },
    logo: assetPath("/assets/dm.svg"),
    logoAlt: "dm-drogerie markt",
    tags: ["AI agent", "APIs", "Databases", "PySpark", "Zeppelin"],
  },
];

const impactCases: ImpactCase[] = [
  {
    id: "speed",
    label: { en: "Self-service software", de: "Self-Service-Software" },
    metric: "−73%",
    metricLabel: { en: "active completion time", de: "aktive Bearbeitungszeit" },
    title: { en: "Recurring analyses became a reusable product.", de: "Wiederkehrende Analysen wurden zu einem wiederverwendbaren Produkt." },
    copy: {
      en: "An end-to-end platform reduced typical active delivery from 6.4 to 1.7 days across 14 assortment projects.",
      de: "Eine End-to-End-Plattform reduzierte die typische aktive Bearbeitung in 14 Sortimentsprojekten von 6,4 auf 1,7 Tage.",
    },
    proof: [
      { en: "14 beta projects", de: "14 Beta-Projekte" },
      { en: "~80% request coverage", de: "~80 % Anfrageabdeckung" },
    ],
  },
  {
    id: "adoption",
    label: { en: "Commercial impact", de: "Kommerzieller Impact" },
    metric: "~€760k",
    metricLabel: { en: "conservatively derived revenue", de: "konservativ abgeleiteter Mehrumsatz" },
    title: { en: "A potential model supported better assortment variants.", de: "Ein Potenzialmodell unterstützte bessere Sortimentsvarianten." },
    copy: {
      en: "Realized revenue averaged 3.7% above forecast in Q4 2025 and Q1 2026.",
      de: "Der realisierte Umsatz lag in Q4 2025 und Q1 2026 im Mittel 3,7 % über der Prognose.",
    },
    proof: [
      { en: "Python + regression", de: "Python + Regression" },
      { en: "Interactive Looker dashboard", de: "Interaktives Looker-Dashboard" },
    ],
  },
  {
    id: "scope",
    label: { en: "Process automation", de: "Prozessautomatisierung" },
    metric: "8h → <15m",
    metricLabel: { en: "per weekly reporting run", de: "pro wöchentlichem Reporting-Lauf" },
    title: { en: "A manual KPI mailing now runs almost by itself.", de: "Ein manuelles KPI-Mailing läuft heute nahezu selbstständig." },
    copy: {
      en: "Excel/VBA and Microsoft Power Automate generate and distribute weekly KPI communications for 75 stores.",
      de: "Excel/VBA und Microsoft Power Automate erzeugen und versenden wöchentliche KPI-Kommunikation für 75 Märkte.",
    },
    proof: [
      { en: "In use for one year", de: "Seit einem Jahr im Einsatz" },
      { en: "Reports arrive earlier each week", de: "Berichte erreichen Märkte früher" },
    ],
  },
  {
    id: "leadership",
    label: { en: "Decision product", de: "Entscheidungsprodukt" },
    metric: "16 × 60m",
    metricLabel: { en: "assortment-review interviews", de: "Sortimentsinterviews" },
    title: { en: "A dashboard became the working surface for every interview.", de: "Ein Dashboard wurde zur Arbeitsoberfläche jedes Interviews." },
    copy: {
      en: "The custom dashboard supported all 16 review sessions across 59 product-layout areas and surfaced 2,800–4,200 potential article additions.",
      de: "Das eigene Dashboard unterstützte alle 16 Review-Sessions über 59 Layoutbereiche und machte ein Potenzial von 2.800–4.200 zusätzlichen Artikeln sichtbar.",
    },
    proof: [
      { en: "59 layout areas", de: "59 Layoutbereiche" },
      { en: "Consistently positive usability feedback", de: "Durchgehend positives Usability-Feedback" },
    ],
  },
];

const sideProjects = [
  {
    title: "Paws from Georgia",
    theme: "paws",
    logo: assetPath("/assets/paws-from-georgia.svg"),
    href: "https://paws-for-georgia.onrender.com/",
    copy: {
      en: "A volunteer project connecting Georgian rescue dogs with adopters in Europe.",
      de: "Ein ehrenamtliches Projekt, das georgische Tierschutzhunde mit Adoptierenden in Europa verbindet.",
    },
  },
  {
    title: "Маня",
    theme: "manya",
    logo: assetPath("/assets/manya.svg"),
    href: "https://pashkinzon.github.io/manya-platform-prototype/website/#/",
    copy: {
      en: "A Russian-language, evidence-based mental-health platform in development.",
      de: "Eine russischsprachige, evidenzbasierte Mental-Health-Plattform in Entwicklung.",
    },
  },
  {
    title: "Setonsi",
    theme: "setonsi",
    logo: assetPath("/assets/setonsi.svg"),
    href: "https://setonsi-beta.pavel-polishchuk.workers.dev/",
    copy: {
      en: "An AI-assisted application tracker that turns screenshots into structured records, currently in beta testing.",
      de: "Ein KI-gestützter Bewerbungstracker, der Screenshots in strukturierte Einträge überführt – aktuell in der Beta-Testphase.",
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
    items: [
      "Python",
      "PySpark",
      "SQL",
      "Looker",
      "APIs",
      { en: "Git · professional", de: "Git · beruflich" },
      { en: "Google Cloud Platform · professional", de: "Google Cloud Platform · beruflich" },
      { en: "Tableau · first personal projects", de: "Tableau · erste persönliche Projekte" },
      { en: "Power BI · first personal projects", de: "Power BI · erste persönliche Projekte" },
    ],
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
    if (saved !== "de" && saved !== "en") return;
    const frame = window.requestAnimationFrame(() => setLang(saved));
    return () => window.cancelAnimationFrame(frame);
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
          <a className="button button-secondary" href={assetPath("/Pavel_Polishchuk_CV_DE.pdf")} target="_blank" rel="noreferrer">
            {t(ui.cv, lang)} <Arrow diagonal />
          </a>
        </div>
        <div className="hero-metrics reveal-up delay-3">
          <div><strong>−73%</strong><span>{lang === "en" ? "active delivery time across 14 projects" : "aktive Bearbeitungszeit in 14 Projekten"}</span></div>
          <div><strong>~€760k</strong><span>{lang === "en" ? "conservatively derived additional revenue" : "konservativ abgeleiteter Mehrumsatz"}</span></div>
          <div><strong>8h → &lt;15m</strong><span>{lang === "en" ? "weekly KPI workflow for 75 stores" : "wöchentlicher KPI-Workflow für 75 Märkte"}</span></div>
          <div><strong>2,000</strong><span>{lang === "en" ? "messages processed by a daily-used team agent" : "Nachrichten im täglich genutzten Team-Agenten"}</span></div>
        </div>
      </section>

      <div className="ticker" aria-label={lang === "en" ? "Working process" : "Arbeitsprozess"}>
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-set" key={copy} aria-hidden={copy === 1}>
              <span>{lang === "en" ? "UNDERSTAND THE EXISTING CONTEXT" : "BESTEHENDEN KONTEXT VERSTEHEN"}</span><i>✦</i>
              <span>{lang === "en" ? "DEFINE THE QUESTION" : "FRAGE PRÄZISE DEFINIEREN"}</span><i>✦</i>
              <span>{lang === "en" ? "BUILD THE USEFUL SYSTEM" : "DAS NÜTZLICHE SYSTEM BAUEN"}</span><i>✦</i>
              <span>{lang === "en" ? "CHALLENGE AND IMPROVE" : "HINTERFRAGEN UND VERBESSERN"}</span><i>✦</i>
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

              {activeProject.id === "assortment" ? (
                <div className="assortment-reconstruction" role="img" aria-label={t(activeProject.alt, lang)}>
                  <div className="artifact-disclaimer">
                    {lang === "en" ? "Illustrative reconstruction · dummy data · no internal interface shown" : "Illustrative Rekonstruktion · Dummy-Daten · keine interne Oberfläche gezeigt"}
                  </div>
                  <div className="artifact-comparison">
                    <section className="excel-artifact">
                      <div className="artifact-title"><span>{lang === "en" ? "Before" : "Vorher"}</span><strong>{lang === "en" ? "Separate analysis tickets" : "Separate Analyse-Tickets"}</strong></div>
                      <div className="fake-sheet">
                        <div><b>{lang === "en" ? "Ticket" : "Ticket"}</b><b>{lang === "en" ? "View" : "Sicht"}</b><b>{lang === "en" ? "Output" : "Output"}</b><b>{lang === "en" ? "Wait" : "Wartezeit"}</b></div>
                        {["A", "B", "C", "D"].map((ticket, index) => (
                          <div key={ticket}><span>0{index + 1}</span><span>{lang === "en" ? "Recurring KPI" : "Wiederkehrender KPI"}</span><span>PowerPoint</span><span>{lang === "en" ? "Weeks" : "Wochen"}</span></div>
                        ))}
                      </div>
                      <small>{lang === "en" ? "Similar methods rebuilt for each request" : "Ähnliche Methoden für jede Anfrage neu erstellt"}</small>
                    </section>
                    <div className="artifact-arrow" aria-hidden="true">→</div>
                    <section className="decision-artifact">
                      <div className="artifact-title"><span>{lang === "en" ? "Self-service" : "Self-Service"}</span><strong>{lang === "en" ? "Unified KPI dashboard" : "Einheitliches KPI-Dashboard"}</strong></div>
                      <div className="segment-cards">
                        {["Sales", "Layout", "Trend"].map((view, index) => (
                          <article key={view} className={index === 0 ? "is-standard" : ""}>
                            <span>{lang === "en" ? "Standard view" : "Standardsicht"}</span><i aria-hidden="true">K{index + 1}</i><strong>{view}</strong><small>{lang === "en" ? "Available immediately" : "Sofort verfügbar"}</small>
                          </article>
                        ))}
                      </div>
                    </section>
                  </div>
                  <blockquote>{lang === "en" ? "Python + database → CSV → web dashboard · illustrative architecture" : "Python + Datenbank → CSV → Web-Dashboard · illustrative Architektur"}</blockquote>
                </div>
              ) : activeProject.id === "automation" ? (
                <div className="kpi-automation-slide" role="img" aria-label={t(activeProject.alt, lang)}>
                  <div className="kpi-slide-head">
                    <span>{lang === "en" ? "Assortment potential model · Q4 2025 + Q1 2026" : "Sortiments-Potenzialmodell · Q4 2025 + Q1 2026"}</span>
                    <strong>~€760k</strong>
                  </div>
                  <div className="kpi-flow">
                    {[
                      [lang === "en" ? "Normalize" : "Normieren", lang === "en" ? "Shelf variants" : "Regalvarianten"],
                      [lang === "en" ? "Model" : "Modellieren", lang === "en" ? "Expected revenue" : "Erwarteter Umsatz"],
                      [lang === "en" ? "Compare" : "Vergleichen", lang === "en" ? "Forecast vs actual" : "Prognose vs. Ist"],
                      [lang === "en" ? "Decide" : "Entscheiden", lang === "en" ? "Variant portfolio" : "Variantenportfolio"],
                    ].map(([step, note], index) => (
                      <div key={step}><span>0{index + 1}</span><strong>{step}</strong><small>{note}</small></div>
                    ))}
                  </div>
                  <div className="kpi-slide-foot">
                    <span>{lang === "en" ? "+3.7% realized revenue vs forecast" : "+3,7 % realisierter Umsatz ggü. Prognose"}</span>
                    <span>{lang === "en" ? "Python + regression + Looker · conservative derivation" : "Python + Regression + Looker · konservative Ableitung"}</span>
                  </div>
                </div>
              ) : (
                <div className="ai-architecture-slide" role="img" aria-label={t(activeProject.alt, lang)}>
                  <div className="ai-slide-heading">
                    <span>{lang === "en" ? "Internal automation architecture" : "Interne Automatisierungsarchitektur"}</span>
                    <h4>{lang === "en" ? "Connect context. Automate repeated work." : "Kontext verbinden. Wiederholte Arbeit automatisieren."}</h4>
                  </div>
                  <div className="ai-flow">
                    <div><span>01</span><strong>{lang === "en" ? "Trigger" : "Auslöser"}</strong><small>{lang === "en" ? "Repeated task" : "Wiederholte Aufgabe"}</small></div>
                    <b aria-hidden="true">→</b>
                    <div><span>02</span><strong>{lang === "en" ? "Ground" : "Kontext"}</strong><small>APIs + {lang === "en" ? "database" : "Datenbank"}</small></div>
                    <b aria-hidden="true">→</b>
                    <div><span>03</span><strong>{lang === "en" ? "Automate" : "Automatisieren"}</strong><small>PySpark + {lang === "en" ? "output" : "Output"}</small></div>
                  </div>
                  <div className="ai-proof-row">
                    <span><strong>275</strong>{lang === "en" ? " chats in a few months" : " Chats in wenigen Monaten"}</span>
                    <span><strong>2,000</strong>{lang === "en" ? " messages · daily team use" : " Nachrichten · tägliche Teamnutzung"}</span>
                  </div>
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
              {activeProject.id === "assortment" ? (
                <div className="prototype-timeline">
                  {[
                    [lang === "en" ? "Initiate" : "Initiieren", lang === "en" ? "Framed repeated ticket work as one reusable product." : "Wiederkehrende Ticketarbeit als ein wiederverwendbares Produkt definiert."],
                    [lang === "en" ? "Own" : "Verantworten", lang === "en" ? "Led the product from idea through beta rollout." : "Das Produkt von der Idee bis zum Beta-Rollout verantwortet."],
                    [lang === "en" ? "Build" : "Bauen", lang === "en" ? "Developed pipeline, modules, APIs, and web dashboard." : "Pipeline, Module, APIs und Web-Dashboard entwickelt."],
                    [lang === "en" ? "Measure" : "Messen", lang === "en" ? "14 projects: 6.4 → 1.7 active days." : "14 Projekte: 6,4 → 1,7 aktive Tage."],
                  ].map(([label, copy], index) => (
                    <section key={label}><i>0{index + 1}</i><div><span>{label}</span><p>{copy}</p></div></section>
                  ))}
                </div>
              ) : activeProject.id === "automation" ? (
                <>
                  <p>{t(activeProject.description, lang)}</p>
                  <span className="ownership-label">{t(ui.owned, lang)}</span>
                  <ul className="ownership-list">
                    {activeProject.ownership.map((item) => <li key={item.en}>{t(item, lang)}</li>)}
                  </ul>
                </>
              ) : (
                <div className="status-story">
                  <section><span>{lang === "en" ? "What I’m building" : "Was ich baue"}</span><p>{t(activeProject.summary.role, lang)}</p></section>
                  <section><span>{lang === "en" ? "Status now" : "Aktueller Status"}</span><p>{t(activeProject.summary.outcome, lang)}</p></section>
                  <div>{lang === "en" ? "Measured internal usage · 7-person team · daily workflow" : "Gemessene interne Nutzung · 7-köpfiges Team · täglicher Workflow"}</div>
                </div>
              )}
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
            <a
              key={project.title}
              className={`side-project-card side-project-card-${project.theme}`}
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="mini-index">0{index + 4}</span>
              <div className="side-logo-wrap">
                <span className="brand-band-label">{lang === "en" ? "Independent build" : "Eigenes Projekt"}</span>
                <img src={project.logo} alt={`${project.title} logo`} />
              </div>
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
            <div className="org-logo"><img src={assetPath("/assets/dm.svg")} alt="dm-drogerie markt" /></div>
            <span className="career-date">{t(ui.now, lang)}</span>
            <h3>{t(ui.dmRole, lang)}</h3>
            <p>{t(ui.dmCopy, lang)}</p>
            <div className="career-chip"><span className="status-dot" />{t(ui.today, lang)}</div>
          </article>
          <article className="career-card">
            <div className="org-logo flink"><img src={assetPath("/assets/flink.svg")} alt="Flink SE" /></div>
            <span className="career-date">{t(ui.flinkDate, lang)}</span>
            <h3>{t(ui.flinkRole, lang)}</h3>
            <p>{t(ui.flinkCopy, lang)}</p>
            <div className="career-metric">OPS+</div>
          </article>
          <article className="education-card">
            <span className="education-mark"><img src={assetPath("/assets/heidelberg.svg")} alt="Universität Heidelberg" /></span>
            <div>
              <span className="career-date">{lang === "en" ? "Since 2023" : "Seit 2023"}</span>
              <h3>Universität Heidelberg</h3>
              <p>{t(ui.studyHeidelberg, lang)} · 2,4</p>
            </div>
          </article>
          <article className="education-card">
            <span className="education-mark uf"><img src={assetPath("/assets/uf.svg")} alt="University of Florida" /></span>
            <div>
              <span className="career-date">2021 — 2023</span>
              <h3>University of Florida</h3>
              <p>{t(ui.studyFlorida, lang)} · GPA 3.48/4.00 · 66/120 Credits</p>
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
            <span className="section-kicker">{lang === "en" ? "Learning & intercultural exchange" : "Lernen & interkultureller Austausch"}</span>
            <h3>Google Data Analytics + Europe101</h3>
            <p>{lang === "en" ? "Google’s professional certificate complemented by the Common Purpose Europe101 Programme." : "Googles Professional Certificate ergänzt durch das Common Purpose Europe101 Programme."}</p>
          </article>
          <article>
            <span className="beyond-icon">AЯ</span>
            <span className="section-kicker">{lang === "en" ? "Languages" : "Sprachen"}</span>
            <h3>DE · EN · RU</h3>
            <p>{lang === "en" ? "German: TestDaF TDN 4 in all four sections · English C1 · Russian native." : "Deutsch: TestDaF TDN 4 in allen vier Teilprüfungen · Englisch C1 · Russisch Muttersprache."}</p>
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
                {capability.items.map((item) => {
                  const label = typeof item === "string" ? item : t(item, lang);
                  return <span key={label}>{label}</span>;
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="about-photo">
          <img src={assetPath("/assets/about-photo.jpg")} alt="Pavel Polishchuk at home with his dog" />
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
            <a className="button button-secondary" href={assetPath("/Pavel_Polishchuk_CV_DE.pdf")} target="_blank" rel="noreferrer">
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
