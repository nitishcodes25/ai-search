import { SearchResult, FetchedPage } from "@ai-search/shared";
import { Webfetcher } from "./web-fetcher.js";
import { extractContent } from "./content-extractor.js";

export class WebContentPipeline {
  constructor(private readonly webfetcher: Webfetcher) {}

  async fetchPages(results: SearchResult[]): Promise<FetchedPage[]> {
    const fetchOperations = results.map(
      async (result): Promise<FetchedPage> => {
        const html = await this.webfetcher.fetch(result.url);

        const extractedContent = extractContent(html, result.url);

        if (!extractedContent) {
          throw new Error(`Failed to extract content from ${result.url}`);
        }

        return {
          ...extractedContent,
          id: result.id,
          url: result.url,
          snippet: result.snippet,
          title: extractedContent?.title ?? result?.title ?? null,
        };
      },
    );

    const settledResult = await Promise.allSettled(fetchOperations);

    return settledResult
      .filter(
        (result): result is PromiseFulfilledResult<FetchedPage> =>
          result.status === "fulfilled",
      )
      .map((result) => result.value);
  }
}
