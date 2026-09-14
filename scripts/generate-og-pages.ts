import type { Plugin } from "vite";
import { articles } from "../src/data/articles";

const SITE_URL = "https://techstream.kz";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildArticleHtml(article: (typeof articles)[number]): string {
  const title = escapeHtml(article.title);
  const description = escapeHtml(article.excerpt);
  const imageUrl = article.image.startsWith("http")
    ? article.image
    : `${SITE_URL}${article.image}`;
  const articleUrl = `${SITE_URL}/article/${article.id}`;

  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description}" />
    <title>${title} — TechStream.kz</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${articleUrl}" />
    <meta property="og:site_name" content="TechStream.kz" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
}

export function generateOgPages(): Plugin {
  return {
    name: "generate-og-pages",
    apply: "build",
    generateBundle() {
      for (const article of articles) {
        const html = buildArticleHtml(article);
        this.emitFile({
          type: "asset",
          fileName: `article/${article.id}/index.html`,
          source: html,
        });
      }
    },
  };
}
