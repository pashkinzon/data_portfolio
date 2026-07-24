"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  number: string;
  kicker: string;
  title: string;
  description: string;
  impact: string;
  image: string;
  alt: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: "layout",
    number: "01",
    kicker: "Featured · Internal product",
    title: "Layout impact dashboard",
    description:
      "A decision tool conceived and built from scratch—from the KPI logic to the complete working dashboard.",
    impact: "30 people use it every week",
    image:
      "https://pashkinzon.github.io/portfolio/assets/project-layout-dashboard.png",
    alt: "Layout impact dashboard with KPI cards and charts",
    tags: ["Looker", "PySpark", "SQL", "Product thinking"],
  },
  {
    id: "assortment",
    number: "02",
    kicker: "Analysis workflow",
    title: "Assortment review, made visual",
    description:
      "A faster way to turn product movement into a structured review workflow for non-technical users.",
    impact: "20 monthly users",
    image:
      "https://pashkinzon.github.io/portfolio/assets/project-fuks-dashboard.png",
    alt: "Assortment analysis dashboard",
    tags: ["Data analysis", "Excel", "Automation", "UX"],
  },
  {
    id: "cafe",
    number: "03",
    kicker: "Local business",
    title: "A menu that works like a product",
    description:
      "A practical website for price review, ordering, and contact—built so the café team can maintain it.",
    impact: "Public and staff-maintainable",
    image:
      "https://pashkinzon.github.io/portfolio/assets/project-cafe-website.png",
    alt: "Local restaurant website",
    tags: ["JavaScript", "HTML/CSS", "Content design"],
  },
];

const buildSteps = [
  {
    label: "Find the friction",
    title: "Start with the repeated question.",
    copy: "I look for the spreadsheet passed around every week, the answer hidden across tabs, or the task everyone knows is slower than it should be.",
  },
  {
    label: "Make the logic visible",
    title: "Turn ambiguity into a model.",
    copy: "I define the decisions, KPIs, edge cases, and data flow before polishing the interface. The useful answer comes first.",
  },
  {
    label: "Build for adoption",
    title: "Ship the smallest tool people trust.",
    copy: "Clear labels, quick feedback, and practical handover matter as much as the code. A tool only works when people actually use it.",
  },
];

const skills = [
  "Python",
  "PySpark",
  "SQL",
  "JavaScript",
  "HTML/CSS",
  "Looker",
  "Zeppelin",
  "Jupyter",
  "Excel",
  "BDA Cluster",
  "VBA",
  "APIs",
  "Microsoft Workflows",
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [activeStep, setActiveStep] = useState(0);
  const [activeSkill, setActiveSkill] = useState("Python");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <main id="top">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <button className="brand" onClick={() => jumpTo("top")} aria-label="Back to top">
          <span className="brand-mark">PP</span>
          <span>Pavel Polishchuk</span>
        </button>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          {["Work", "Approach", "About"].map((item) => (
            <button key={item} onClick={() => jumpTo(item.toLowerCase())}>
              {item}
            </button>
          ))}
        </nav>

        <a className="header-cta" href="mailto:pavel.polishchuk@proton.me">
          Let&apos;s talk <Arrow diagonal />
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="eyebrow reveal-up">
          <span className="status-dot" />
          Data analyst · builder · mathematics student
        </div>
        <h1 className="hero-title reveal-up delay-1">
          I turn messy data
          <br />
          into <em>clear decisions</em>
          <span className="question-mark">?</span>
        </h1>
        <p className="hero-copy reveal-up delay-2">
          Dashboards, automations, and useful interfaces for people who need
          answers—not another complicated tool.
        </p>
        <div className="hero-actions reveal-up delay-3">
          <button className="button button-primary" onClick={() => jumpTo("work")}>
            Explore the work <Arrow />
          </button>
          <a
            className="button button-secondary"
            href="https://pashkinzon.github.io/portfolio/assets/Pavel_Polishchuk_CV.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Open CV <Arrow diagonal />
          </a>
        </div>
        <button className="scroll-cue" onClick={() => jumpTo("work")} aria-label="Scroll to selected work">
          <span>Scroll to explore</span>
          <span className="scroll-line" />
        </button>
      </section>

      <div className="ticker" aria-label="Portfolio highlights">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-set" key={copy} aria-hidden={copy === 1}>
              <span>DATA WITH A POINT</span><i>✦</i>
              <span>BUILT FOR PEOPLE</span><i>✦</i>
              <span>NO BLACK BOXES</span><i>✦</i>
              <span>USEFUL FROM DAY ONE</span><i>✦</i>
            </div>
          ))}
        </div>
      </div>

      <section className="work section-shell" id="work">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Selected work</span>
            <h2>Proof, not promises.</h2>
          </div>
          <p>
            Three examples of turning recurring business questions into tools
            people can actually use.
          </p>
        </div>

        <div className="project-stage">
          <div className="project-visual" key={activeProject.id}>
            <img src={activeProject.image} alt={activeProject.alt} />
            <div className="project-visual-topline">
              <span>{activeProject.kicker}</span>
              <span>{activeProject.number} / 03</span>
            </div>
            <div className="project-impact">
              <span className="impact-pulse" />
              {activeProject.impact}
            </div>
          </div>

          <div className="project-content">
            <div className="project-switcher" role="tablist" aria-label="Selected projects">
              {projects.map((project) => (
                <button
                  key={project.id}
                  role="tab"
                  aria-selected={activeProject.id === project.id}
                  className={activeProject.id === project.id ? "is-active" : ""}
                  onClick={() => setActiveProject(project)}
                >
                  <span>{project.number}</span>
                  {project.title}
                  <Arrow />
                </button>
              ))}
            </div>

            <div className="project-detail">
              <span className="section-kicker">{activeProject.kicker}</span>
              <h3>{activeProject.title}</h3>
              <p>{activeProject.description}</p>
              <div className="tag-list">
                {activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="mini-projects">
          <a href="https://paws-for-georgia.onrender.com/" target="_blank" rel="noreferrer">
            <span className="mini-index">04</span>
            <div>
              <span className="section-kicker">Independent build</span>
              <h3>Paws from Georgia</h3>
              <p>Adoption website for Georgian dogs.</p>
            </div>
            <span className="mini-arrow"><Arrow diagonal /></span>
          </a>
          <a href="https://flights-history.onrender.com/" target="_blank" rel="noreferrer">
            <span className="mini-index">05</span>
            <div>
              <span className="section-kicker">Personal data product</span>
              <h3>Flights History</h3>
              <p>My flight and travel history, made explorable.</p>
            </div>
            <span className="mini-arrow"><Arrow diagonal /></span>
          </a>
          <a href="https://pashkinzon.github.io/manya-platform-prototype/" target="_blank" rel="noreferrer">
            <span className="mini-index">06</span>
            <div>
              <span className="section-kicker">Prototype</span>
              <h3>Маня</h3>
              <p>Free mental-health articles in Russian.</p>
            </div>
            <span className="mini-arrow"><Arrow diagonal /></span>
          </a>
        </div>
      </section>

      <section className="approach section-shell" id="approach">
        <div className="section-heading">
          <div>
            <span className="section-kicker">How I build</span>
            <h2>3 steps—then useful.</h2>
          </div>
          <p>
            The best data product is rarely the one with the most features. It
            is the one that makes the next decision obvious.
          </p>
        </div>

        <div className="approach-grid">
          <div className="step-controls" role="tablist" aria-label="Build approach">
            {buildSteps.map((step, index) => (
              <button
                key={step.label}
                role="tab"
                aria-selected={activeStep === index}
                onClick={() => setActiveStep(index)}
                className={activeStep === index ? "is-active" : ""}
              >
                <span>0{index + 1}</span>
                {step.label}
                <span className="step-plus">{activeStep === index ? "−" : "+"}</span>
              </button>
            ))}
          </div>
          <div className="step-display" key={activeStep}>
            <span className="step-number">0{activeStep + 1}</span>
            <div>
              <h3>{buildSteps[activeStep].title}</h3>
              <p>{buildSteps[activeStep].copy}</p>
            </div>
            <div className="step-orbit" aria-hidden="true">
              <span>{["ASK", "MODEL", "SHIP"][activeStep]}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="toolbox section-shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Toolbox</span>
            <h2>Click around.</h2>
          </div>
          <p>
            I choose tools for the problem. The active ingredient is always
            understanding what the user needs next.
          </p>
        </div>
        <div className="skill-board">
          <div className="skill-cloud" aria-label="Skills">
            {skills.map((skill) => (
              <button
                key={skill}
                className={activeSkill === skill ? "is-active" : ""}
                onClick={() => setActiveSkill(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
          <div className="skill-readout">
            <span>Currently selected</span>
            <strong>{activeSkill}</strong>
            <span className="readout-cursor">_</span>
          </div>
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="about-photo">
          <img
            src="https://pashkinzon.github.io/portfolio/assets/about-photo.jpg"
            alt="Pavel Polishchuk at home with his dog"
          />
          <div className="photo-label">Pavel + the real project manager</div>
        </div>
        <div className="about-copy">
          <span className="section-kicker">Behind the dashboards</span>
          <h2>I like the point where math meets everyday work.</h2>
          <p className="about-lead">
            I&apos;m a mathematics student in Germany and a working student in a
            data, business, and IT role.
          </p>
          <p>
            My projects usually begin with scattered files, repeated manual
            work, and a business question that needs structure. I make the
            answer clear enough that non-technical users can act on it.
          </p>
          <div className="experience-strip">
            <div>
              <span>Oct 2024—now</span>
              <strong>Data Analyst · Working Student</strong>
            </div>
            <div>
              <span>Oct 2023—Sep 2024</span>
              <strong>Operations Associate → Operational Manager</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-star" aria-hidden="true">✦</div>
        <span className="section-kicker">Have a messy question?</span>
        <h2>Let&apos;s make it<br /><em>obvious.</em></h2>
        <a className="button button-primary contact-button" href="mailto:pavel.polishchuk@proton.me">
          pavel.polishchuk@proton.me <Arrow diagonal />
        </a>
      </section>

      <footer>
        <button className="brand" onClick={() => jumpTo("top")}>
          <span className="brand-mark">PP</span>
          <span>Pavel Polishchuk</span>
        </button>
        <span>Data portfolio · 2026</span>
        <button className="back-top" onClick={() => jumpTo("top")}>
          Back to top ↑
        </button>
      </footer>
    </main>
  );
}
