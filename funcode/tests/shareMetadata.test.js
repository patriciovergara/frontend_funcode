import { readFile } from "node:fs/promises";
import { Buffer } from "node:buffer";
import { test } from "node:test";
import assert from "node:assert/strict";

import { pageShares, productShare } from "../src/data/shareMetadata.js";

const dist = new URL("../dist/", import.meta.url);
const read = (path) => readFile(new URL(path, dist), "utf8");

test("las páginas públicas generan metadatos para compartir sin ejecutar React", async () => {
  const home = await read("index.html");
  assert.match(home, /property="og:title" content="Funcode — Diseño y desarrollo digital"/);
  assert.match(home, /property="og:image" content="https:\/\/funcode\.cl\/social\/funcode-preview\.png"/);

  for (const [path, metadata] of Object.entries(pageShares)) {
    const html = await read(`${path}/index.html`);
    assert.ok(html.includes(`property="og:title" content="${metadata.title}"`), path);
    assert.ok(html.includes(`property="og:description" content="${metadata.description}"`), path);
    assert.ok(html.includes(`property="og:url" content="https://funcode.cl/${path}"`), path);
    assert.match(html, /<script type="module" crossorigin src="\/assets\//);
  }
});

test("los productos usan una vista común sin asociarlos a otro enlace", async () => {
  const html = await read("_social/producto.html");
  const redirects = await read("_redirects");
  assert.ok(html.includes(`property="og:title" content="${productShare.title}"`));
  assert.doesNotMatch(html, /property="og:url"/);
  assert.match(redirects, /^\/productos\/:id[ \t]+\/_social\/producto[ \t]+200[ \t]*$/m);
  assert.match(redirects, /^\/productos\/:id\/[ \t]+\/_social\/producto[ \t]+200[ \t]*$/m);
});

test("la imagen compartida es un PNG de 1200 por 630", async () => {
  const image = await readFile(new URL("social/funcode-preview.png", dist));
  assert.deepEqual(image.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
  await readFile(new URL("favicon-funcode.svg", dist));
});
