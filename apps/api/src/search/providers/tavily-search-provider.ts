import { env } from "../../config/env.js";
import type {SearchResult} from '@ai-search/shared'
import { SearchProvider } from "./search-provider.js";

type TavilySearchReponse = {
  results: Array<{
    title: string;
    url: string;
    content: string;
    score: number;
  }>;
};

export class TavilySearchProvider implements SearchProvider {
  async search(query: string): Promise<SearchResult[]> {
    if (!env.TAVILY_API_KEY) {
      throw new Error("TAVILY_API_KEY is not configured");
    }

    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.TAVILY_API_KEY}`,
      },
      body: JSON.stringify({
        query,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Tavily search failed: ${response.status}`);
    }

    const data: TavilySearchReponse = await response.json();

    return data.results.map(
      (result): SearchResult => ({
        title: result.title,
        url: result.url,
        snippet: result.content,
        source: new URL(result.url).hostname,
      }),
    );
  }
}
