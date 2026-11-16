import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pageShares, productShare } from "./src/data/shareMetadata.js";

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function staticSharePages() {
  let outputDirectory;

  function renderPage(html, { title, description }, url) {
    const replacements = [
      [/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`],
      [/(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/, (_, start, end) => `${start}${escapeHtml(description)}${end}`],
      [/(<meta property="og:title" content=")[^"]*("\s*\/>)/, (_, start, end) => `${start}${escapeHtml(title)}${end}`],
      [/(<meta property="og:description" content=")[^"]*("\s*\/>)/, (_, start, end) => `${start}${escapeHtml(description)}${end}`],
      [/(<meta name="twitter:title" content=")[^"]*("\s*\/>)/, (_, start, end) => `${start}${escapeHtml(title)}${end}`],
      [/(<meta name="twitter:description" content=")[^"]*("\s*\/>)/, (_, start, end) => `${start}${escapeHtml(description)}${end}`],
      [/<meta property="og:url" content="[^"]*"\s*\/>/, url ? `<meta property="og:url" content="${url}" />` : ""],
    ];

    return replacements.reduce((result, [pattern, replacement]) => {
      if (!pattern.test(result)) throw new Error(`Metadato no encontrado: ${pattern}`);
      return result.replace(pattern, replacement);
    }, html);
  }

  return {
    name: "static-share-pages",
    apply: "build",
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const html = await readFile(join(outputDirectory, "index.html"), "utf8");
      for (const [path, metadata] of Object.entries(pageShares)) {
        const directory = join(outputDirectory, path);
        await mkdir(directory, { recursive: true });
        await writeFile(join(directory, "index.html"), renderPage(html, metadata, `https://funcode.cl/${path}`));
      }
      const directory = join(outputDirectory, "_social");
      await mkdir(directory, { recursive: true });
      await writeFile(join(directory, "producto.html"), renderPage(html, productShare));
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    staticSharePages(),
  ],
});