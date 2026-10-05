import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { SearchService } from "../../../src/search/search.service.js";
import type { SearchProvider } from "../../../src/search/providers/search-provider.js";

describe("SearchService", () => {
  let searchMock: Mock<SearchProvider["search"]>;
  let searchService: SearchService;

  beforeEach(() => {
    searchMock = vi.fn();

    const searchProvider = {
      search: searchMock,
    };

    searchService = new SearchService(searchProvider);
  });

  it("delegate the query to search provider and returns the result", async () => {
    const result = [
      {
        title: "React 19 features",
        url: "https://reactjs.org/blog/2024/01/01/react-19-features.html",
        snippet: "React 19 introduces several new features and improvements...",
        source: "reactjs.org",
      },
    ];
    searchMock.mockResolvedValue(result);

    const searchResult = await searchService.search("react 19 features");

    expect(searchMock).toHaveBeenCalledWith("react 19 features");
    expect(searchResult).toEqual(result);
  });

  it("propagate the error to search service when search provider fails", async () => {
    const testError = new Error("Something went wrong");
    searchMock.mockRejectedValue(testError);

    await expect(searchService.search("ai search")).rejects.toBe(testError);

    expect(searchMock).toHaveBeenCalledWith("ai search");
  });
});
