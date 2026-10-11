import { ExtractedContent } from "@ai-search/shared";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export function extractContent(
  html: string,
  url: string,
): ExtractedContent | null {
  const dom = new JSDOM(html, {
    url,
  });

  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article) {
    return null;
  }

  return {
    title: article.title ?? null,
    content: article.content ?? null,
    textContent: article.textContent ?? null,
    length: article.length ?? null,
    excerpt: article.excerpt ?? null,
    byline: article.byline ?? null,
    dir: article.dir ?? null,
    siteName: article.siteName ?? null,
    lang: article.lang ?? null,
    publishedTime: article.publishedTime ?? null,
  };
}
