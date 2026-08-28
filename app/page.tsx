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
    en: "Data analysis · automation · self-service tools",
    de: "Datenanalyse · Automatisierung · Self-Service-Tools",
  },
  heroLine1: { en: "Define clearly.", de: "Klar definieren." },
  heroLine2: { en: "Build what helps.", de: "Bauen, was hilft." },
  heroManifesto: {
    en: "Technical analyst. Useful systems. Evidence-led decisions.",
    de: "Technischer Analyst. Nützliche Systeme. Evidenzbasierte Entscheidungen.",
  },
  heroCopy: {
    en: "I turn unclear analytical questions and repetitive workflows into dashboards and automations that people can use directly.",
    de: "Ich übersetze unklare analytische Fragen und wiederkehrende Workflows in Dashboards und Automatisierungen, die Menschen direkt nutzen können.",
  },
  heroContext: {
    en: "Currently a working-student Data Analyst at dm. Open to data analysis, data science, and automation-focused roles.",
    de: "Aktuell Werkstudent als Data Analyst bei dm. Offen für Rollen in Datenanalyse, Data Science und Automatisierung.",
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
  dmRole: { en: "Working Student · Data Analyst", de: "Werkstudent · Data Analyst" },
  dmCopy: {
    en: "Retail analytics, scalable reporting, AI-enabled workflows, and assortment decisions with scope across more than 2,000 stores.",
    de: "Retail Analytics, skalierbares Reporting, AI-gestützte Workflows und Sortimentsentscheidungen für einen Analyseumfang von mehr als 2.000 Märkten.",
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
    shortTitle: { en: "Self-service dashboard", de: "Self-Service-Dashboard" },
    kicker: { en: "dm · Unified analytics dashboard", de: "dm · Einheitliches Analyse-Dashboard" },
    title: { en: "Repeated requests became one reusable view", de: "Aus wiederkehrenden Anfragen wurde eine wiederverwendbare Sicht" },
    description: {
      en: "Assortment teams repeatedly requested similar analyses, while each answer was still prepared separately in PowerPoint. I proposed and built a unified dashboard so teams can inspect standard KPIs immediately and arrive at more focused follow-up questions.",
      de: "Sortimentsteams fragten wiederholt ähnliche Analysen an, während jede Antwort weiterhin einzeln in PowerPoint aufbereitet wurde. Ich schlug ein einheitliches Dashboard vor und setzte es um, damit Teams Standard-KPIs sofort prüfen und gezieltere Folgefragen stellen können.",
    },
    impact: { en: "Initial insight: weeks → immediate", de: "Erste Einblicke: Wochen → sofort" },
    ownership: [
      { en: "Proposed the project after recognizing repeated requests", de: "Projekt nach dem Erkennen wiederkehrender Anfragen vorgeschlagen" },
      { en: "Defined KPI logic and built the data preparation", de: "KPI-Logik definiert und Datenaufbereitung entwickelt" },
      { en: "Built and deployed the web frontend", de: "Web-Frontend entwickelt und bereitgestellt" },
      { en: "Documented the tool and incorporated user feedback", de: "Tool dokumentiert und Nutzerfeedback eingearbeitet" },
    ],
    summary: {
      problem: {
        en: "Similar questions about sales, layout position, and assortment trends repeatedly arrived as separate tickets and were answered with separate presentations.",
        de: "Ähnliche Fragen zu Verkauf, Platzierung und Sortimentstrends kamen wiederholt als einzelne Tickets und wurden in separaten Präsentationen beantwortet.",
      },
      role: {
        en: "Developed the solution independently from concept and KPI logic through Python processing, frontend, testing, deployment, and documentation.",
        de: "Entwickelte die Lösung eigenständig von Konzept und KPI-Logik über Python-Verarbeitung und Frontend bis zu Tests, Bereitstellung und Dokumentation.",
      },
      outcome: {
        en: "Teams can review standard KPIs directly instead of waiting weeks for an initial analysis; later conversations start with better context and more specific questions.",
        de: "Teams können Standard-KPIs direkt prüfen, statt wochenlang auf eine erste Analyse zu warten; spätere Gespräche beginnen mit besserem Kontext und konkreteren Fragen.",
      },
    },
    caseStudy: {
      challenge: {
        en: "Although ticket details varied, the analytical views were often nearly identical. Preparing each analysis and PowerPoint separately delayed the first insight and made methods harder to compare across the team.",
        de: "Obwohl sich die Details der Tickets unterschieden, waren die benötigten Analysesichten oft nahezu identisch. Jede Analyse und PowerPoint separat zu erstellen, verzögerte erste Einblicke und erschwerte den Vergleich der Methoden im Team.",
      },
      contribution: {
        en: "I proposed the unified tool and developed it end to end. A Python notebook connects to the database, prepares the data, calculates KPIs, and exports dashboard-ready CSV files. I built the HTML/CSS frontend, deployed it internally, documented it, and supported users.",
        de: "Ich schlug das einheitliche Tool vor und entwickelte es vollständig. Ein Python-Notebook verbindet sich mit der Datenbank, bereitet Daten auf, berechnet KPIs und exportiert Dashboard-fertige CSV-Dateien. Ich baute das HTML/CSS-Frontend, stellte es intern bereit, dokumentierte es und unterstützte Nutzer.",
      },
      decisions: [
        { en: "Standardize recurring KPI logic instead of rebuilding each view", de: "Wiederkehrende KPI-Logik standardisieren, statt jede Sicht neu zu bauen" },
        { en: "Separate data preparation from the web interface through CSV exports", de: "Datenaufbereitung und Web-Oberfläche durch CSV-Exporte trennen" },
        { en: "Use feedback from colleagues and assortment teams to improve later versions", de: "Feedback von Kollegen und Sortimentsteams für spätere Versionen nutzen" },
      ],
      result: {
        en: "Assortment teams can now inspect standard KPIs immediately and use the service for more specific, complex questions. Regular usage is estimated at around 30 people based on recurring feedback and support contacts.",
        de: "Sortimentsteams können Standard-KPIs nun sofort prüfen und den Service für spezifischere, komplexere Fragen nutzen. Die regelmäßige Nutzung wird anhand wiederkehrender Feedback- und Supportkontakte auf rund 30 Personen geschätzt.",
      },
      evidence: [
        { en: "Weeks of waiting → immediate standard views", de: "Wochen Wartezeit → sofortige Standardsichten" },
        { en: "~30 regular users (estimate)", de: "~30 regelmäßige Nutzer (Schätzung)" },
        { en: "End-to-end individual contribution", de: "Eigenständiger End-to-End-Beitrag" },
      ],
    },
    image: "",
    alt: { en: "Illustrative architecture of the self-service dashboard", de: "Illustrative Architektur des Self-Service-Dashboards" },
    logo: assetPath("/assets/logo-dm.webp"),
    logoAlt: "dm-drogerie markt",
    tags: ["Python", "Databases", "HTML/CSS", "Self-service analytics"],
  },
  {
    id: "automation",
    number: "02",
    shortTitle: { en: "KPI automation", de: "KPI-Automation" },
    kicker: { en: "dm · Automated KPI mailing", de: "dm · Automatisiertes KPI-Mailing" },
    title: { en: "A weekly manual report became an automated delivery", de: "Aus einem manuellen Wochenbericht wurde eine automatisierte Zustellung" },
    description: {
      en: "KPI reports for 75 markets were prepared and sent manually each week. I automated the data processing, Excel output with tables and charts, email attachments, and distribution.",
      de: "KPI-Berichte für 75 Märkte wurden jede Woche manuell erstellt und versendet. Ich automatisierte Datenverarbeitung, Excel-Ausgabe mit Tabellen und Diagrammen, E-Mail-Anhänge und Versand.",
    },
    impact: { en: "8h → <15m", de: "8 Std. → <15 Min." },
    ownership: [
      { en: "Identified a repetitive weekly reporting workflow", de: "Wiederkehrenden wöchentlichen Reporting-Workflow identifiziert" },
      { en: "Learned and connected the required Microsoft APIs", de: "Benötigte Microsoft-APIs erlernt und angebunden" },
      { en: "Generated Excel tables and charts directly from data", de: "Excel-Tabellen und Diagramme direkt aus Daten erzeugt" },
      { en: "Automated attachments and email distribution", de: "Anhänge und E-Mail-Versand automatisiert" },
    ],
    summary: {
      problem: {
        en: "The team processed the available KPI data, then manually transferred results into files and sent them to markets every week.",
        de: "Das Team verarbeitete die verfügbaren KPI-Daten, übertrug Ergebnisse anschließend manuell in Dateien und versendete sie jede Woche an die Märkte.",
      },
      role: {
        en: "Built a Python/PySpark workflow that generates the Excel reports and charts, attaches them to emails, and automates distribution through Microsoft workflows.",
        de: "Entwickelte einen Python/PySpark-Workflow, der Excel-Berichte und Diagramme erzeugt, an E-Mails anhängt und über Microsoft-Workflows automatisch versendet.",
      },
      outcome: {
        en: "Weekly generation and distribution for 75 markets fell from roughly eight hours of manual work to under 15 minutes.",
        de: "Erstellung und Versand für 75 Märkte sanken von rund acht Stunden manueller Arbeit pro Woche auf weniger als 15 Minuten.",
      },
    },
    caseStudy: {
      challenge: {
        en: "The reporting logic was repeatable, but the file generation and delivery steps consumed hours every week without adding analytical value.",
        de: "Die Reporting-Logik war wiederholbar, doch Dateierstellung und Versand beanspruchten jede Woche Stunden, ohne zusätzlichen analytischen Wert zu schaffen.",
      },
      contribution: {
        en: "I learned how the required APIs and Microsoft automation components worked, then connected data processing, Excel generation, charts, attachments, and email delivery into one workflow.",
        de: "Ich eignete mir die benötigten APIs und Microsoft-Automatisierungskomponenten an und verband Datenverarbeitung, Excel-Erstellung, Diagramme, Anhänge und E-Mail-Versand zu einem Workflow.",
      },
      decisions: [
        { en: "Automate the low-creativity handoffs around an established KPI process", de: "Die wenig kreativen Übergaben rund um einen etablierten KPI-Prozess automatisieren" },
        { en: "Generate tables and charts directly from processed data", de: "Tabellen und Diagramme direkt aus verarbeiteten Daten erzeugen" },
        { en: "Keep the final market deliverable in a familiar Excel format", de: "Das finale Ergebnis für Märkte im vertrauten Excel-Format halten" },
      ],
      result: {
        en: "The weekly workflow for 75 markets now runs in under 15 minutes instead of requiring around eight hours of manual preparation and dispatch.",
        de: "Der wöchentliche Workflow für 75 Märkte läuft nun in weniger als 15 Minuten statt rund acht Stunden manueller Aufbereitung und Versandarbeit zu benötigen.",
      },
      evidence: [
        { en: "8h → <15m", de: "8 Std. → <15 Min." },
        { en: "75 markets", de: "75 Märkte" },
        { en: "Automated Excel + email delivery", de: "Automatisierte Excel- und E-Mail-Zustellung" },
      ],
    },
    image: "",
    alt: { en: "Illustrative diagram of the automated KPI-mailing workflow", de: "Illustratives Diagramm des automatisierten KPI-Mailing-Workflows" },
    logo: assetPath("/assets/logo-dm.webp"),
    logoAlt: "dm-drogerie markt",
    tags: ["Python", "PySpark", "Excel", "Microsoft automation"],
  },
  {
    id: "copilot",
    number: "03",
    shortTitle: { en: "Internal automation", de: "Interne Automatisierung" },
    kicker: { en: "dm · Internal automation tool", de: "dm · Internes Automatisierungstool" },
    title: { en: "Automating work inside an internal data tool", de: "Arbeit in einem internen Datentool automatisieren" },
    description: {
      en: "I am building automations that connect internal context, APIs, databases, and PySpark generation. Adoption is still being learned—not forecast.",
      de: "Ich entwickle Automatisierungen, die internen Kontext, APIs, Datenbanken und PySpark-Generierung verbinden. Adoption wird noch gelernt—nicht prognostiziert.",
    },
    impact: { en: "Internal tool · adoption in progress", de: "Internes Tool · Adoption im Aufbau" },
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
        en: "Designing and building automations around internal context, APIs, databases, and PySpark workflows.",
        de: "Konzeption und Bau von Automatisierungen rund um internen Kontext, APIs, Datenbanken und PySpark-Workflows.",
      },
      outcome: {
        en: "The tool is being tested internally. Wider adoption is not yet measured, so no user forecast is claimed.",
        de: "Das Tool wird intern getestet. Breitere Adoption ist noch nicht gemessen, daher wird keine Nutzerprognose behauptet.",
      },
    },
    caseStudy: {
      challenge: {
        en: "Some recurring data tasks depended on technical context spread across APIs, databases, and specialist knowledge.",
        de: "Einige wiederkehrende Datenaufgaben hingen von technischem Kontext aus APIs, Datenbanken und Spezialwissen ab.",
      },
      contribution: {
        en: "I am building automations inside an internal tool, connecting context and shaping reusable PySpark workflows while testing what is genuinely useful.",
        de: "Ich entwickle Automatisierungen in einem internen Tool, verbinde Kontext und gestalte wiederverwendbare PySpark-Workflows, während ich teste, was tatsächlich nützlich ist.",
      },
      decisions: [
        { en: "Ground outputs in internal context instead of generic AI responses", de: "Outputs im internen Kontext statt in generischen AI-Antworten verankern" },
        { en: "Automate repeated work before expanding feature scope", de: "Wiederkehrende Arbeit automatisieren, bevor der Feature-Scope wächst" },
        { en: "Describe adoption honestly until usage is measured", de: "Adoption ehrlich beschreiben, bis Nutzung gemessen ist" },
      ],
      result: {
        en: "This remains an internal automation effort with adoption in progress. The portfolio intentionally makes no projected user-count claim.",
        de: "Dies bleibt eine interne Automatisierungsinitiative mit Adoption im Aufbau. Das Portfolio macht bewusst keine prognostizierte Nutzerzahl.",
      },
      evidence: [
        { en: "Internal tool", de: "Internes Tool" },
        { en: "API + database context", de: "API- + Datenbankkontext" },
        { en: "Adoption not yet measured", de: "Adoption noch nicht gemessen" },
      ],
    },
    image: "",
    alt: { en: "Illustrative architecture of an internal automation workflow", de: "Illustrative Architektur eines internen Automatisierungsworkflows" },
    logo: assetPath("/assets/logo-dm.webp"),
    logoAlt: "dm-drogerie markt",
    tags: ["Automation", "APIs", "Databases", "PySpark"],
  },
];

const impactCases: ImpactCase[] = [
  {
    id: "speed",
    label: { en: "Automation", de: "Automatisierung" },
    metric: "8h → <15m",
    metricLabel: { en: "weekly preparation and delivery", de: "wöchentliche Erstellung und Zustellung" },
    title: { en: "A repetitive report became a reliable workflow.", de: "Aus einem wiederkehrenden Bericht wurde ein zuverlässiger Workflow." },
    copy: {
      en: "Python/PySpark processing and Microsoft automation generate and distribute KPI reports for 75 markets.",
      de: "Python/PySpark-Verarbeitung und Microsoft-Automatisierung erzeugen und versenden KPI-Berichte für 75 Märkte.",
    },
    proof: [
      { en: "75 markets", de: "75 Märkte" },
      { en: "Excel tables and charts", de: "Excel-Tabellen und Diagramme" },
      { en: "Automated email delivery", de: "Automatisierter E-Mail-Versand" },
    ],
  },
  {
    id: "adoption",
    label: { en: "Self-service analytics", de: "Self-Service-Analytics" },
    metric: "~30",
    metricLabel: { en: "regular users (estimate)", de: "regelmäßige Nutzer (Schätzung)" },
    title: { en: "Standard views became immediately accessible.", de: "Standardsichten wurden unmittelbar zugänglich." },
    copy: {
      en: "Assortment teams can inspect recurring KPIs themselves instead of waiting several weeks for an initial analysis.",
      de: "Sortimentsteams können wiederkehrende KPIs selbst prüfen, statt mehrere Wochen auf eine erste Analyse zu warten.",
    },
    proof: [
      { en: "Estimate based on recurring contacts", de: "Schätzung anhand wiederkehrender Kontakte" },
      { en: "Weeks → immediate standard view", de: "Wochen → sofortige Standardsicht" },
      { en: "Shared KPI logic", de: "Gemeinsame KPI-Logik" },
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
    metric: "Shift flow",
    metricLabel: { en: "expanded responsibility", de: "erweiterte Verantwortung" },
    title: { en: "Initiative became responsibility.", de: "Aus Initiative wurde Verantwortung." },
    copy: {
      en: "At Flink, I moved from picking orders to coordinating shifts, deliveries, order accuracy, and communication while improving the hub layout and picking system.",
      de: "Bei Flink entwickelte ich mich von der Kommissionierung zur Koordination von Schichten, Lieferungen, Auftragsqualität und Kommunikation und verbesserte Hub-Layout sowie Kommissioniersystem.",
    },
    proof: [
      { en: "Documented Ops Associate Plus role", de: "Dokumentierte Rolle Ops Associate Plus" },
      { en: "Shift and delivery coordination", de: "Schicht- und Lieferkoordination" },
      { en: "Layout and picking-system improvements", de: "Verbesserungen an Layout und Kommissioniersystem" },
    ],
  },
];

const sideProjects = [
  {
    title: "Paws from Georgia",
    theme: "paws",
    logo: assetPath("/assets/logo-paws-georgia.png"),
    href: "https://paws-for-georgia.onrender.com/",
    copy: {
      en: "A social-impact adoption experience for Georgian dogs.",
      de: "Eine gemeinnützige Vermittlungsplattform für Hunde aus Georgien.",
    },
  },
  {
    title: "Flights History",
    theme: "flights",
    logo: assetPath("/assets/logo-flights-history.png"),
    href: "https://flights-history.onrender.com/",
    copy: {
      en: "Personal flight and travel data turned into an explorable product.",
      de: "Persönliche Flug- und Reisedaten als interaktives Datenprodukt.",
    },
  },
  {
    title: "Маня",
    theme: "manya",
    logo: assetPath("/assets/logo-manya.png"),
    href: "https://pashkinzon.github.io/manya-platform-prototype/",
    copy: {
      en: "Research-based mental-health information in Russian, made clear and accessible.",
      de: "Forschungsbasierte Informationen zu psychischer Gesundheit auf Russisch, klar und zugänglich aufbereitet.",
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
          <div><strong>75</strong><span>{lang === "en" ? "markets in automated KPI mailing" : "Märkte im automatisierten KPI-Mailing"}</span></div>
          <div><strong>8h → &lt;15m</strong><span>{lang === "en" ? "weekly reporting workflow" : "wöchentlicher Reporting-Workflow"}</span></div>
          <div><strong>~30</strong><span>{lang === "en" ? "regular dashboard users (estimate)" : "regelmäßige Dashboard-Nutzer (Schätzung)"}</span></div>
          <div><strong>2,000+</strong><span>{lang === "en" ? "stores in analytical scope" : "Märkte im analytischen Wirkungsbereich"}</span></div>
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
                    <span>{lang === "en" ? "Automated KPI mailing · 75 markets" : "Automatisiertes KPI-Mailing · 75 Märkte"}</span>
                    <strong>8h → &lt;15m</strong>
                  </div>
                  <div className="kpi-flow">
                    {[
                      [lang === "en" ? "Process" : "Verarbeiten", lang === "en" ? "KPI data" : "KPI-Daten"],
                      [lang === "en" ? "Generate" : "Erzeugen", lang === "en" ? "Excel + charts" : "Excel + Diagramme"],
                      [lang === "en" ? "Attach" : "Anhängen", lang === "en" ? "Market reports" : "Marktberichte"],
                      [lang === "en" ? "Deliver" : "Versenden", lang === "en" ? "Automated email" : "Automatisierte E-Mail"],
                    ].map(([step, note], index) => (
                      <div key={step}><span>0{index + 1}</span><strong>{step}</strong><small>{note}</small></div>
                    ))}
                  </div>
                  <div className="kpi-slide-foot">
                    <span>{lang === "en" ? "75 market reports generated and distributed" : "75 Marktberichte erzeugt und versendet"}</span>
                    <span>{lang === "en" ? "~8h weekly → <15m · no internal data shown" : "~8 Std. wöchentlich → <15 Min. · keine internen Daten gezeigt"}</span>
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
                    <span><strong>{lang === "en" ? "Internal tool" : "Internes Tool"}</strong>{lang === "en" ? " being tested" : " wird getestet"}</span>
                    <span><strong>{lang === "en" ? "Adoption" : "Adoption"}</strong>{lang === "en" ? " not yet measured" : " noch nicht gemessen"}</span>
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
                    [lang === "en" ? "Recognize" : "Erkennen", lang === "en" ? "Similar questions repeatedly required similar views." : "Ähnliche Fragen benötigten wiederholt ähnliche Sichten."],
                    [lang === "en" ? "Propose" : "Vorschlagen", lang === "en" ? "Initiated one unified self-service dashboard." : "Ein einheitliches Self-Service-Dashboard initiiert."],
                    [lang === "en" ? "Build" : "Bauen", lang === "en" ? "Developed KPI logic, data pipeline, frontend, and deployment." : "KPI-Logik, Datenpipeline, Frontend und Bereitstellung entwickelt."],
                    [lang === "en" ? "Improve" : "Verbessern", lang === "en" ? "Incorporated feedback and supported regular users." : "Feedback eingearbeitet und regelmäßige Nutzer unterstützt."],
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
                  <div>{lang === "en" ? "No projected user count. Adoption is still being learned." : "Keine prognostizierte Nutzerzahl. Adoption wird noch gelernt."}</div>
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
            <div className="org-logo"><img src={assetPath("/assets/logo-dm.webp")} alt="dm-drogerie markt" /></div>
            <span className="career-date">{t(ui.now, lang)}</span>
            <h3>{t(ui.dmRole, lang)}</h3>
            <p>{t(ui.dmCopy, lang)}</p>
            <div className="career-chip"><span className="status-dot" />{t(ui.today, lang)}</div>
          </article>
          <article className="career-card">
            <div className="org-logo flink"><img src={assetPath("/assets/logo-flink.png")} alt="Flink SE" /></div>
            <span className="career-date">{t(ui.flinkDate, lang)}</span>
            <h3>{t(ui.flinkRole, lang)}</h3>
            <p>{t(ui.flinkCopy, lang)}</p>
            <div className="career-metric">OPS+</div>
          </article>
          <article className="education-card">
            <span className="education-mark">UH</span>
            <div>
              <span className="career-date">{lang === "en" ? "Since 2023" : "Seit 2023"}</span>
              <h3>Universität Heidelberg</h3>
              <p>{t(ui.studyHeidelberg, lang)} · 2,4</p>
            </div>
          </article>
          <article className="education-card">
            <span className="education-mark uf">UF</span>
            <div>
              <span className="career-date">2021 — 2023</span>
              <h3>University of Florida</h3>
              <p>{t(ui.studyFlorida, lang)} · 71/120 Credits</p>
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
