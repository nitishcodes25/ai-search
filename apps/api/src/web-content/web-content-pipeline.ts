import { SearchResult, FetchedPage } from "@ai-search/shared";
import { Webfetcher } from "./web-fetcher.js";
import { extractContent } from "./content-extractor.js";

export class WebContentPipeline {
  constructor(private readonly webfetcher: Webfetcher) {}

  async fetchPages(results: SearchResult[]): Promise<FetchedPage[]> {
    const fetchOperations = results.map(async (result) => {
      const html = await this.webfetcher.fetch(result.url);

      const extractedContent = extractContent(html,result.url)

      return {
        result,
        html,
        extractedContent
      };
    });

    const settledResult = await Promise.allSettled(fetchOperations);

    return settledResult
      .filter((result): result is PromiseFulfilledResult<FetchedPage> => result.status === "fulfilled")
      .map((result) => result.value);
  }
}
