import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports the finished portfolio as static HTML", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(html, /Pavel Polishchuk/);
  assert.match(html, /Build fast/i);
  assert.match(html, /Test what matters/i);
  assert.match(html, /8h/);
  assert.match(html, /Data Analyst &amp; Automation Builder/);
  assert.match(html, /og-v6\.png/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/i);
});

test("ships bilingual content and GitHub Pages configuration", async () => {
  const [page, layout, nextConfig, workflow] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/deploy-pages.yml", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Schnell bauen/);
  assert.match(page, /Testen, was zählt/);
  assert.match(page, /pavel-portfolio-language/);
  assert.match(page, /30-minute first prototype/);
  assert.match(page, /Adoption not yet measured/);
  assert.match(page, /2,000\+/);
  assert.match(page, /Pavel_Polishchuk_CV_DE\.pdf/);
  assert.match(page, /Open full case study/);
  assert.match(page, /universal notebook from existing script snippets/);
  assert.match(page, /covering ~90% of requests/);
  assert.match(page, /Systems thinking/);
  assert.doesNotMatch(page, /75 stores|five-person team|individual KPI emails/i);
  assert.match(layout, /pashkinzon\.github\.io\/data_portfolio/);
  assert.match(nextConfig, /output: "export"/);
  assert.match(nextConfig, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /path: \.\/out/);
});
