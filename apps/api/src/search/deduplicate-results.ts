import { SearchResult } from "@ai-search/shared";
import { normalizeUrl } from "./url-normalizer.js";

export const deduplicateResults = (results: SearchResult[]): SearchResult[] => {
  const seen = new Set<string>();

  return results.filter((result) => {
    const normalizedUrl = normalizeUrl(result.url);

    if (seen.has(normalizedUrl)) {
      return false;
    }

    seen.add(normalizedUrl);

    return true;
  });
};
