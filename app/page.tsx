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
    en: "Data analysis · automation · rapid prototyping",
    de: "Datenanalyse · Automatisierung · Rapid Prototyping",
  },
  heroLine1: { en: "Build fast.", de: "Schnell bauen." },
  heroLine2: { en: "Test what matters.", de: "Testen, was zählt." },
  heroManifesto: {
    en: "Technical analyst. Fast prototypes. Early feedback.",
    de: "Technischer Analyst. Schnelle Prototypen. Frühes Feedback.",
  },
  heroCopy: {
    en: "I turn slow, unclear workflows into working dashboards and automations—then put them in front of users before investing in the wrong solution.",
    de: "Ich verwandle langsame, unklare Workflows in funktionierende Dashboards und Automatisierungen—und teste sie mit Nutzern, bevor zu viel in die falsche Lösung investiert wird.",
  },
  heroContext: {
    en: "Currently a working-student Data Analyst at dm. Open to data analysis, data science, and automation-focused roles.",
    de: "Aktuell Werkstudent als Data Analyst bei dm. Offen für Rollen in Datenanalyse, Data Science und Automatisierung.",
  },
  explore: { en: "See how I work", de: "Meine Arbeitsweise ansehen" },
  cv: { en: "Open CV (DE)", de: "Lebenslauf öffnen" },
  workKicker: { en: "Selected builds", de: "Ausgewählte Builds" },
  workTitle: { en: "Prototype. Learn. Narrow.", de: "Prototyp. Lernen. Fokussieren." },
  workIntro: {
    en: "My strongest work starts with a hypothesis, reaches a rough prototype quickly, and gets narrower—not bigger—when early feedback reveals what people actually need.",
    de: "Meine stärkste Arbeit beginnt mit einer Hypothese, wird schnell zum ersten Prototyp und wird durch frühes Feedback fokussierter—nicht größer.",
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
    en: "I would rather test a hypothesis than debate it for a week.",
    de: "Ich teste lieber eine Hypothese, als eine Woche darüber zu diskutieren.",
  },
  aboutLead: {
    en: "Although I am a working student, colleagues tend to treat me like a full-time teammate because I show up, take initiative, and build.",
    de: "Obwohl ich Werkstudent bin, behandeln mich Kolleginnen und Kollegen oft wie ein vollwertiges Teammitglied, weil ich präsent bin, Initiative übernehme und umsetze.",
  },
  aboutCopy: {
    en: "My edge is forming a hypothesis, building a rough version, and course-correcting with real feedback instead of circling an idea. I am direct when something is outside my capacity or needs more time or support. I also know I sometimes take on too much—and I am actively getting better at setting that boundary.",
    de: "Meine Stärke ist, eine Hypothese zu bilden, eine erste Version zu bauen und mit echtem Feedback früh zu korrigieren, statt eine Idee lange zu umkreisen. Ich sage direkt, wenn etwas außerhalb meiner Kapazität liegt oder mehr Zeit beziehungsweise Unterstützung braucht. Gleichzeitig weiß ich, dass ich manchmal zu viel Verantwortung übernehme—und arbeite aktiv daran, diese Grenze besser zu setzen.",
  },
  linkedin: { en: "LinkedIn profile", de: "LinkedIn-Profil" },
  contactKicker: { en: "Have an unclear problem?", de: "Ein noch unklares Problem?" },
  contactTitle1: { en: "Let’s make it", de: "Machen wir es" },
  contactTitle2: { en: "useful.", de: "nützlich." },
  discuss: { en: "Discuss a role or project", de: "Über eine Rolle oder ein Projekt sprechen" },
  footer: { en: "Data analysis · automation · rapid prototyping", de: "Datenanalyse · Automatisierung · Rapid Prototyping" },
  top: { en: "Back to top", de: "Nach oben" },
};

const projects: Project[] = [
  {
    id: "assortment",
    number: "01",
    shortTitle: { en: "30-minute prototype", de: "30-Minuten-Prototyp" },
    kicker: { en: "dm · Assortment decision tool", de: "dm · Sortiments-Entscheidungstool" },
    title: { en: "The prototype got smaller—and more useful", de: "Der Prototyp wurde kleiner—und nützlicher" },
    description: {
      en: "A same-day dashboard draft replaced a slow Excel-table workflow. Early feedback showed the initial comparison idea was too broad, so I rebuilt it around one representative product per assortment segment.",
      de: "Ein Dashboard-Entwurf am selben Tag ersetzte einen langsamen Excel-Tabellen-Workflow. Frühes Feedback zeigte, dass die Vergleichsidee zu breit war—also baute ich das Tool um ein repräsentatives Produkt pro Sortimentssegment neu.",
    },
    impact: { en: "First usable draft in ~30 minutes", de: "Erster nutzbarer Entwurf in ~30 Minuten" },
    ownership: [
      { en: "Questioned the existing Excel workflow", de: "Bestehenden Excel-Workflow hinterfragt" },
      { en: "Built the first dashboard draft", de: "Ersten Dashboard-Entwurf gebaut" },
      { en: "Collected early user feedback", de: "Frühes Nutzerfeedback eingeholt" },
      { en: "Narrowed scope around the real decision", de: "Scope auf die echte Entscheidung fokussiert" },
    ],
    summary: {
      problem: {
        en: "Sentiment managers had to navigate an Excel table and manually look up product names and images in a catalogue and website.",
        de: "Sentiment Manager mussten eine Excel-Tabelle durchsuchen und Produktnamen sowie Bilder manuell in Katalog und Website nachschlagen.",
      },
      role: {
        en: "Built a dashboard prototype in about 30 minutes, showed it early, and used feedback to challenge my first scope.",
        de: "Baute in etwa 30 Minuten einen Dashboard-Prototyp, zeigte ihn früh und nutzte Feedback, um meinen ersten Scope zu hinterfragen.",
      },
      outcome: {
        en: "Repositioned the tool around the narrower need: one representative product for each assortment segment.",
        de: "Richtete das Tool auf den engeren Bedarf aus: ein repräsentatives Produkt pro Sortimentssegment.",
      },
    },
    caseStudy: {
      challenge: {
        en: "The existing proposal arrived as a plain Excel table. To understand it, sentiment managers had to move slowly through rows and manually search elsewhere for product names and images.",
        de: "Der bestehende Vorschlag kam als einfache Excel-Tabelle. Um ihn zu verstehen, mussten Sentiment Manager langsam durch Zeilen gehen und Produktnamen sowie Bilder manuell an anderer Stelle suchen.",
      },
      contribution: {
        en: "I formed a hypothesis that a visual dashboard would make the proposal easier to evaluate and built the first working draft in about 30 minutes. I showed it before polishing or expanding it.",
        de: "Ich bildete die Hypothese, dass ein visuelles Dashboard den Vorschlag leichter bewertbar macht, und baute den ersten funktionierenden Entwurf in etwa 30 Minuten. Ich zeigte ihn, bevor ich ihn ausarbeitete oder erweiterte.",
      },
      decisions: [
        { en: "Prototype the visual format before designing a full comparison product", de: "Visuelles Format prototypisieren, bevor ein vollständiges Vergleichsprodukt entsteht" },
        { en: "Ask users which decision they actually needed to make", de: "Nutzer fragen, welche Entscheidung sie tatsächlich treffen müssen" },
        { en: "Remove deep comparisons and focus on one representative product per segment", de: "Tiefe Vergleiche entfernen und auf ein repräsentatives Produkt pro Segment fokussieren" },
      ],
      result: {
        en: "The useful version was not the biggest version. Early feedback narrowed the dashboard from broad metric comparisons to a focused assortment decision view.",
        de: "Die nützliche Version war nicht die größte Version. Frühes Feedback fokussierte das Dashboard von breiten Kennzahlenvergleichen auf eine klare Sortimentsentscheidung.",
      },
      evidence: [
        { en: "~30-minute first prototype", de: "~30-Minuten-Erstprototyp" },
        { en: "Feedback before expansion", de: "Feedback vor Ausbau" },
        { en: "Sanitized reconstruction shown", de: "Sanitisierte Rekonstruktion gezeigt" },
      ],
    },
    image: "",
    alt: { en: "Sanitized before-and-after reconstruction of the assortment workflow", de: "Sanitisierte Vorher-Nachher-Rekonstruktion des Sortiments-Workflows" },
    logo: assetPath("/assets/logo-dm.webp"),
    logoAlt: "dm-drogerie markt",
    tags: ["Rapid prototyping", "Looker", "Feedback", "Dashboard UX"],
  },
  {
    id: "automation",
    number: "02",
    shortTitle: { en: "KPI automation", de: "KPI-Automation" },
    kicker: { en: "dm · Analysis infrastructure", de: "dm · Analyse-Infrastruktur" },
    title: { en: "One system replaced one-off analysis work", de: "Ein System ersetzte isolierte Einzelanalysen" },
    description: {
      en: "Every request used to start from zero: new code, a new PowerPoint or table, and no reusable methodology. I consolidated the work into one universal notebook and one dashboard that now cover roughly 90% of incoming analysis requests.",
      de: "Früher begann jede Anfrage bei null: neuer Code, eine neue PowerPoint oder Tabelle und keine wiederverwendbare Methodik. Ich bündelte die Arbeit in einem universellen Notebook und einem Dashboard, die heute rund 90 % der eingehenden Analyseanfragen abdecken.",
    },
    impact: { en: "8h → <15m", de: "8 Std. → <15 Min." },
    ownership: [
      { en: "Identified the manual, fragmented workflow", de: "Den manuellen, fragmentierten Workflow identifiziert" },
      { en: "Built a universal notebook from existing script snippets", de: "Aus bestehenden Skriptbausteinen ein universelles Notebook gebaut" },
      { en: "Built the unified dashboard", de: "Das einheitliche Dashboard gebaut" },
      { en: "Adopted by the team, now covering ~90% of requests", de: "Vom Team übernommen, deckt heute ~90 % der Anfragen ab" },
    ],
    summary: {
      problem: {
        en: "Every space, sentiment, or other analysis request was handled independently. Code, variables, methodology, and the final PowerPoint or table were rebuilt by hand each time.",
        de: "Jede Flächen-, Sentiment- oder andere Analyseanfrage wurde unabhängig bearbeitet. Code, Variablen, Methodik und die finale PowerPoint oder Tabelle wurden jedes Mal manuell neu erstellt.",
      },
      role: {
        en: "Combined one-off script snippets into a universal notebook and connected its generated output directly to one unified dashboard.",
        de: "Bündelte einmalige Skriptbausteine in einem universellen Notebook und verband dessen generierten Output direkt mit einem einheitlichen Dashboard.",
      },
      outcome: {
        en: "The live team tool now covers roughly 90% of incoming requests, cuts turnaround from eight hours to under 15 minutes, and keeps methodology consistent.",
        de: "Das heute im Team genutzte Tool deckt rund 90 % der eingehenden Anfragen ab, verkürzt die Bearbeitung von acht Stunden auf unter 15 Minuten und vereinheitlicht die Methodik.",
      },
    },
    caseStudy: {
      challenge: {
        en: "Every analysis request—space analysis, sentiment analysis, and others—was treated as a separate project. Someone wrote fresh code, assembled a PowerPoint or table manually, and sent it off. Variables and methodology from one request were not reused in the next, so the work never compounded.",
        de: "Jede Analyseanfrage—Flächenanalyse, Sentiment-Analyse und andere—wurde als eigenes Projekt behandelt. Dafür entstand neuer Code, eine PowerPoint oder Tabelle wurde manuell erstellt und versendet. Variablen und Methodik einer Anfrage wurden in der nächsten nicht wiederverwendet, sodass sich die Arbeit nie aufbaute.",
      },
      contribution: {
        en: "I assembled the strongest snippets from previously one-off scripts into one universal notebook, then built a unified dashboard around it. A user selects the analysis goal, the notebook generates the relevant output, and the result streams directly into the dashboard instead of becoming another disposable document.",
        de: "Ich bündelte die stärksten Bausteine aus zuvor einmaligen Skripten in einem universellen Notebook und baute darum ein einheitliches Dashboard. Nutzer wählen das Analyseziel, das Notebook erzeugt den passenden Output und das Ergebnis fließt direkt ins Dashboard, statt zum nächsten Wegwerfdokument zu werden.",
      },
      decisions: [
        { en: "Turn reusable script fragments into one maintained analysis system", de: "Wiederverwendbare Skriptbausteine in ein gepflegtes Analysesystem überführen" },
        { en: "Let the analysis goal determine the generated output", de: "Das Analyseziel den generierten Output bestimmen lassen" },
        { en: "Stream every result into one dashboard instead of creating another document", de: "Jedes Ergebnis in ein Dashboard leiten, statt ein weiteres Dokument zu erzeugen" },
      ],
      result: {
        en: "The dashboard is a live tool used by the team today and covers roughly 90% of incoming analysis requests. Turnaround fell from eight hours to under 15 minutes, methodology is now shared, and the time saved goes into deeper analysis where it is genuinely needed.",
        de: "Das Dashboard ist heute ein im Team genutztes Live-Tool und deckt rund 90 % der eingehenden Analyseanfragen ab. Die Bearbeitungszeit sank von acht Stunden auf unter 15 Minuten, die Methodik ist vereinheitlicht und die gewonnene Zeit fließt in tiefere Analysen, wo sie wirklich gebraucht wird.",
      },
      evidence: [
        { en: "8h → <15m", de: "8 Std. → <15 Min." },
        { en: "~90% of incoming requests", de: "~90 % der eingehenden Anfragen" },
        { en: "Live team tool", de: "Aktiv genutztes Team-Tool" },
      ],
    },
    image: "",
    alt: { en: "Illustrative diagram of the universal analysis system", de: "Illustratives Diagramm des universellen Analysesystems" },
    logo: assetPath("/assets/logo-dm.webp"),
    logoAlt: "dm-drogerie markt",
    tags: ["Python", "Automation", "Systems thinking"],
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
    metricLabel: { en: "analysis turnaround", de: "Bearbeitungszeit einer Analyse" },
    title: { en: "One system instead of starting over.", de: "Ein System statt jedes Mal von vorn." },
    copy: {
      en: "A universal notebook and dashboard now handle roughly 90% of incoming analysis requests with one shared methodology.",
      de: "Ein universelles Notebook und Dashboard bearbeiten heute rund 90 % der eingehenden Analyseanfragen mit einer gemeinsamen Methodik.",
    },
    proof: [
      { en: "~90% of requests covered", de: "~90 % der Anfragen abgedeckt" },
      { en: "One shared methodology", de: "Eine gemeinsame Methodik" },
      { en: "Live team tool", de: "Aktiv genutztes Team-Tool" },
    ],
  },
  {
    id: "adoption",
    label: { en: "Rapid prototyping", de: "Rapid Prototyping" },
    metric: "~30m",
    metricLabel: { en: "to the first dashboard prototype", de: "bis zum ersten Dashboard-Prototyp" },
    title: { en: "Feedback before overbuilding.", de: "Feedback vor dem Überbauen." },
    copy: {
      en: "A quick alternative to an Excel table exposed the real need early: not deep comparisons, but one representative product per assortment segment.",
      de: "Eine schnelle Alternative zur Excel-Tabelle zeigte den echten Bedarf früh: keine tiefen Vergleiche, sondern ein repräsentatives Produkt pro Sortimentssegment.",
    },
    proof: [
      { en: "Same-day user feedback", de: "Nutzerfeedback am selben Tag" },
      { en: "Scope narrowed early", de: "Scope früh fokussiert" },
      { en: "Sanitized reconstruction shown", de: "Sanitisierte Rekonstruktion gezeigt" },
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
          <a className="button button-secondary" href={assetPath("/Pavel_Polishchuk_CV_DE.pdf")} target="_blank" rel="noreferrer">
            {t(ui.cv, lang)} <Arrow diagonal />
          </a>
        </div>
        <div className="hero-metrics reveal-up delay-3">
          <div><strong>~30m</strong><span>{lang === "en" ? "to a first assortment prototype" : "bis zum ersten Sortiments-Prototyp"}</span></div>
          <div><strong>32×</strong><span>{lang === "en" ? "faster analysis turnaround" : "schnellere Analyse-Bearbeitung"}</span></div>
          <div><strong>~90%</strong><span>{lang === "en" ? "of analysis requests covered" : "der Analyseanfragen abgedeckt"}</span></div>
          <div><strong>2,000+</strong><span>{lang === "en" ? "stores in analytical scope" : "Märkte im analytischen Wirkungsbereich"}</span></div>
        </div>
      </section>

      <div className="ticker" aria-label={lang === "en" ? "Working process" : "Arbeitsprozess"}>
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-set" key={copy} aria-hidden={copy === 1}>
              <span>{lang === "en" ? "UNDERSTAND WHY IT’S STILL BROKEN" : "VERSTEHEN, WARUM ES NOCH NICHT FUNKTIONIERT"}</span><i>✦</i>
              <span>{lang === "en" ? "PROTOTYPE FAST" : "SCHNELL PROTOTYPISIEREN"}</span><i>✦</i>
              <span>{lang === "en" ? "GET FEEDBACK EARLY" : "FRÜH FEEDBACK HOLEN"}</span><i>✦</i>
              <span>{lang === "en" ? "DECIDE WHAT’S WORTH BUILDING" : "ENTSCHEIDEN, WAS SICH ZU BAUEN LOHNT"}</span><i>✦</i>
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
                      <div className="artifact-title"><span>{lang === "en" ? "Before" : "Vorher"}</span><strong>{lang === "en" ? "Spreadsheet proposal" : "Tabellenvorschlag"}</strong></div>
                      <div className="fake-sheet">
                        <div><b>Segment</b><b>SKU</b><b>{lang === "en" ? "Product" : "Produkt"}</b><b>{lang === "en" ? "Image" : "Bild"}</b></div>
                        {["A", "B", "C", "D"].map((segment, index) => (
                          <div key={segment}><span>{segment}</span><span>0{index + 1}42</span><span>{lang === "en" ? "Look up manually" : "Manuell suchen"}</span><span>—</span></div>
                        ))}
                      </div>
                      <small>{lang === "en" ? "Catalogue + website lookup required" : "Katalog- + Website-Suche erforderlich"}</small>
                    </section>
                    <div className="artifact-arrow" aria-hidden="true">→</div>
                    <section className="decision-artifact">
                      <div className="artifact-title"><span>{lang === "en" ? "After feedback" : "Nach Feedback"}</span><strong>{lang === "en" ? "Focused decision view" : "Fokussierte Entscheidungssicht"}</strong></div>
                      <div className="segment-cards">
                        {["Core", "Build", "Differentiate"].map((segment, index) => (
                          <article key={segment} className={index === 0 ? "is-standard" : ""}>
                            <span>{segment}</span><i aria-hidden="true">P{index + 1}</i><strong>{lang === "en" ? `Sample product ${index + 1}` : `Beispielprodukt ${index + 1}`}</strong><small>{index === 0 ? (lang === "en" ? "Representative standard" : "Repräsentativer Standard") : (lang === "en" ? "Assortment option" : "Sortimentsoption")}</small>
                          </article>
                        ))}
                      </div>
                    </section>
                  </div>
                  <blockquote>{lang === "en" ? "“We don’t need every comparison. Show one representative product per segment.”" : "„Wir brauchen nicht jeden Vergleich. Zeig ein repräsentatives Produkt pro Segment.“"}</blockquote>
                </div>
              ) : activeProject.id === "automation" ? (
                <div className="kpi-automation-slide" role="img" aria-label={t(activeProject.alt, lang)}>
                  <div className="kpi-slide-head">
                    <span>{lang === "en" ? "Universal analysis system" : "Universelles Analysesystem"}</span>
                    <strong>8h → &lt;15m</strong>
                  </div>
                  <div className="kpi-flow">
                    {[
                      [lang === "en" ? "Select" : "Wählen", lang === "en" ? "Analysis goal" : "Analyseziel"],
                      [lang === "en" ? "Run" : "Ausführen", lang === "en" ? "Universal notebook" : "Universelles Notebook"],
                      [lang === "en" ? "Stream" : "Übertragen", lang === "en" ? "Unified dashboard" : "Einheitliches Dashboard"],
                      [lang === "en" ? "Reuse" : "Wiederverwenden", lang === "en" ? "Shared methodology" : "Gemeinsame Methodik"],
                    ].map(([step, note], index) => (
                      <div key={step}><span>0{index + 1}</span><strong>{step}</strong><small>{note}</small></div>
                    ))}
                  </div>
                  <div className="kpi-slide-foot">
                    <span>{lang === "en" ? "~90% of incoming requests covered" : "~90 % der eingehenden Anfragen abgedeckt"}</span>
                    <span>{lang === "en" ? "Live team tool · no internal data shown" : "Aktiv genutztes Team-Tool · keine internen Daten gezeigt"}</span>
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
                    [lang === "en" ? "Ask" : "Frage", lang === "en" ? "Can this be better than an Excel table?" : "Geht das besser als mit einer Excel-Tabelle?"],
                    [lang === "en" ? "Build" : "Bauen", lang === "en" ? "First dashboard draft in about 30 minutes." : "Erster Dashboard-Entwurf in etwa 30 Minuten."],
                    [lang === "en" ? "Listen" : "Zuhören", lang === "en" ? "Users wanted one representative product—not deep comparisons." : "Nutzer wollten ein repräsentatives Produkt—keine tiefen Vergleiche."],
                    [lang === "en" ? "Narrow" : "Fokussieren", lang === "en" ? "Rebuilt around the smaller, useful decision." : "Um die kleinere, nützliche Entscheidung neu gebaut."],
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
