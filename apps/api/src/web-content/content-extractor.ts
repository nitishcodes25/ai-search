import { ExtractedContent } from "@ai-search/shared";
import { Readability } from "@mozilla/readability";
import { htmlToText } from "./html-to-text.js";
import { JSDOM } from "jsdom";

export function extractContent(html: string, url: string): ExtractedContent {
  const dom = new JSDOM(html, {
    url,
  });

  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  return {
    title: article?.title ?? null,
    content: article?.content ?? "",
    text: htmlToText(article?.content) ?? "",
  };
}
