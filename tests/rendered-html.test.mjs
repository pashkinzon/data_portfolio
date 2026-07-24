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
  assert.match(html, /I don.t just analyze data/i);
  assert.match(html, /8h/);
  assert.match(html, /Data Product Owner &amp; Analyst/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/i);
});

test("ships bilingual ownership content and required assets", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Ich analysiere nicht nur Daten/);
  assert.match(page, /pavel-portfolio-language/);
  assert.match(page, /8h → &lt;15m/);
  assert.match(page, /5\+ → 100\+/);
  assert.match(page, /2,000\+/);
  assert.match(page, /logo-dm\.webp/);
  assert.match(page, /logo-flink\.png/);
  assert.match(page, /Pavel_Polishchuk_CV_DE\.pdf/);
  assert.match(layout, /og-v3\.png/);
});
