import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { SearchService } from "../../../src/search/search.service.js";
import type { SearchProvider } from "../../../src/search/providers/search-provider.js";
import { WebContentPipeline } from "../../../src/web-content/web-content-pipeline.js";
import { rankPages } from "../../../src/ranking/ranking-pipeline.js";

vi.mock("../../../src/ranking/ranking-pipeline.js", () => ({
  rankPages: vi.fn(),
}));

describe("SearchService", () => {
  let searchMock: Mock<SearchProvider["search"]>;
  let fetchPagesMock: Mock<WebContentPipeline["fetchPages"]>;
  let searchService: SearchService;

  beforeEach(() => {
    searchMock = vi.fn();
    fetchPagesMock = vi.fn();

    const searchProvider = {
      search: searchMock,
    };

    const webContentPipeline = {
      fetchPages: fetchPagesMock,
    } as unknown as WebContentPipeline;

    searchService = new SearchService(searchProvider, webContentPipeline);
  });

  it("delegate the query to search provider and web content pipeline and returns the result", async () => {
    const result = [
      {
        id: crypto.randomUUID(),
        title: "React 19 features",
        url: "https://reactjs.org/blog/2024/01/01/react-19-features.html",
        snippet: "React 19 introduces several new features and improvements...",
      },
    ];
    searchMock.mockResolvedValue(result);

    const webResult = [
      {
        ...result[0],
        content: "<article>React 19</article>",
        textContent: "React 19",
        length: 8,
        excerpt: "React 19",
        byline: "Nitish",
        dir: "ltr",
        siteName: "reactjs.org",
        lang: "en",
        publishedTime: null,
      },
    ];
    fetchPagesMock.mockResolvedValue(webResult);

    const rankingResult = [
      {
        ...webResult[0],
        score: 0.85,
      },
    ];
    vi.mocked(rankPages).mockResolvedValue(rankingResult);

    const searchResult = await searchService.search("react 19 features");

    expect(searchMock).toHaveBeenCalledWith("react 19 features");

    expect(fetchPagesMock).toHaveBeenCalledWith(result);

    expect(rankPages).toHaveBeenCalledWith("react 19 features",webResult);

    expect(searchResult).toEqual(rankingResult);
  });

  it("propagate the error to search service when search provider fails", async () => {
    const testError = new Error("Something went wrong");
    searchMock.mockRejectedValue(testError);

    await expect(searchService.search("ai search")).rejects.toBe(testError);

    expect(searchMock).toHaveBeenCalledWith("ai search");
  });
});
