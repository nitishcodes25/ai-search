import {
  describe,
  it,
  expect,
  vi,
  afterEach,
  beforeEach,
  type MockInstance,
} from "vitest";
import { searchWeb } from "../../../src/api/search.js";
import type { SearchResult } from "@ai-search/shared";

describe("Search API", () => {
  let fetchMock: MockInstance<typeof globalThis.fetch>;

  beforeEach(() => {
    fetchMock = vi.spyOn(globalThis, "fetch");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return search results for a valid query", async () => {
    const testResult: SearchResult[] = [
      {
        title: "React 19 features",
        url: "https://reactjs.org/blog/2024/01/01/react-19-features.html",
        snippet: "React 19 introduces several new features and improvements...",
        source: "reactjs.org",
      },
    ];

    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ results: testResult }),
    } as Response);

    const result = await searchWeb("react19 features");

    expect(result).toEqual(testResult);

    expect(fetchMock).toHaveBeenCalledWith(`/api/search?q=react19%20features`);
  });

  it("should throw an error for a failed search", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
    } as Response);
    
    await expect(searchWeb("react")).rejects.toEqual(
      new Error("Search failed")
    );

    expect(fetchMock).toHaveBeenCalledWith('/api/search?q=react');
  });
});
