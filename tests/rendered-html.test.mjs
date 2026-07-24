import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Pavel Polishchuk/);
  assert.match(html, /Build fast/i);
  assert.match(html, /Test what matters/i);
  assert.match(html, /8h/);
  assert.match(html, /Data Analyst &amp; Automation Builder/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/i);
});

test("ships bilingual builder content and required assets", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Schnell bauen/);
  assert.match(page, /Testen, was zählt/);
  assert.match(page, /pavel-portfolio-language/);
  assert.match(page, /30-minute first prototype/);
  assert.match(page, /Problem/);
  assert.match(page, /My role/);
  assert.match(page, /What changed/);
  assert.match(page, /Adoption not yet measured/);
  assert.match(page, /2,000\+/);
  assert.match(page, /logo-dm\.webp/);
  assert.match(page, /logo-flink\.png/);
  assert.match(page, /Pavel_Polishchuk_CV_DE\.pdf/);
  assert.match(page, /Open full case study/);
  assert.match(page, /My individual contribution/);
  assert.match(page, /Weekly reporting time fell/);
  assert.match(page, /Illustrative reconstruction/);
  assert.match(layout, /og-v5\.png/);
});
