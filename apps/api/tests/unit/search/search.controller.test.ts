import { describe, it, expect, vi, type Mock, beforeEach } from "vitest";
import { SearchController } from "../../../src/search/search.controller.js";
import type { SearchService } from "../../../src/search/search.service.js";
import type { SearchResult } from "@ai-search/shared/dist/search.js";
import type { Request, Response } from "express";

describe("SearchController", () => {
  let searchMock: Mock<SearchService["search"]>;
  let controller: SearchController;
  let req: Request;
  let res: Response;
  
  beforeEach(() => {
    searchMock = vi.fn<(query: string) => Promise<SearchResult[]>>();
    req = {
      query: {
        q: "",
      },
    } as unknown as Request;
    res = {
      json: vi.fn(),
    } as unknown as Response;
    const mockSearchService = {
      search: searchMock,
    } as unknown as SearchService;
    controller = new SearchController(mockSearchService);
  });

  it("test valid query gives valid result", async () => {
    const testResult: SearchResult[] = [
      {
        title: "React 19 features",
        url: "https://reactjs.org/blog/2024/01/01/react-19-features.html",
        snippet: "React 19 introduces several new features and improvements...",
        source: "reactjs.org",
      },
    ];

    searchMock.mockResolvedValue(testResult);

    req.query.q = "react 19 features";

    await controller.search(req, res);

    expect(searchMock).toHaveBeenCalledWith("react 19 features");
    expect(res.json).toHaveBeenCalledWith({
      results: testResult,
    });
  });

  it("throws error when query is empty", async () => {
    searchMock.mockRejectedValue(new Error("Search query is required"));

    await expect(controller.search(req, res)).rejects.toThrow(
      "Search query is required",
    );

    expect(searchMock).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
