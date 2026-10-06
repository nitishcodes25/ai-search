import { load } from "cheerio";

export function htmlToText(html: string | null | undefined): string {
  if(!html){
    return ""
  }
  const $ = load(html);

  $("script, style, noscript, nav, footer").remove();

  return $("body").text().replace(/\s+/g, " ").trim();
}