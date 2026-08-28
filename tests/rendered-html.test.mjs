import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports the finished portfolio as static HTML", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(html, /Pavel Polishchuk/);
  assert.match(html, /Define clearly/i);
  assert.match(html, /Build what helps/i);
  assert.match(html, /−73%/);
  assert.match(html, /760k/);
  assert.match(html, /8h/);
  assert.match(html, /Data Products with Measurable Impact/);
  assert.match(html, /og-kpi\.png/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/i);
});

test("ships bilingual content and GitHub Pages configuration", async () => {
  const [page, layout, nextConfig, workflow] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/deploy-pages.yml", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Klar definieren/);
  assert.match(page, /Bauen, was hilft/);
  assert.match(page, /pavel-portfolio-language/);
  assert.match(page, /14 assortment projects/);
  assert.match(page, /~80% request coverage/);
  assert.match(page, /~€760k/);
  assert.match(page, /2,000 messages/);
  assert.match(page, /75 stores/);
  assert.match(page, /8h → <15m/);
  assert.match(page, /Pavel_Polishchuk_CV_DE\.pdf/);
  assert.match(page, /Open full case study/);
  assert.match(page, /Assortment potential model/);
  assert.match(page, /Microsoft Power Automate/);
  assert.match(page, /paws-from-georgia\.svg/);
  assert.match(page, /manya\.svg/);
  assert.match(page, /setonsi\.svg/);
  assert.doesNotMatch(page, /30-minute|30-Minuten|~90%|90 %|15%|15 %|Operational Manager/i);
  assert.match(layout, /pashkinzon\.github\.io\/data_portfolio/);
  assert.match(nextConfig, /output: "export"/);
  assert.match(nextConfig, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /enablement: true/);
  assert.match(workflow, /path: \.\/out/);
});
