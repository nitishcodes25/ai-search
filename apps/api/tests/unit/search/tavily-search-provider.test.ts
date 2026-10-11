import { describe, expect, it, vi, beforeEach } from "vitest";
import { TavilySearchProvider } from "../../../src/search/providers/tavily-search-provider";

vi.mock("../../../src/config/env.js", () => ({
  env: {
    TAVILY_API_KEY: "test-api-key",
  },
}));

describe("TavilySearchProvider", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should normalize the search result", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          results: [
            {
              title: "React Documentation",
              url: "https://react.dev/learn",
              content: "Learn React",
            },
          ],
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    const searchProvider = new TavilySearchProvider();

    const results = await searchProvider.search("test query");
    expect(results).toHaveLength(1);

    expect(results).toMatchObject([
      {
        title: "React Documentation",
        url: "https://react.dev/learn",
        snippet: "Learn React",
      },
    ]);

    expect(results[0].id).toBeDefined();
    expect(results[0].id).toBeTruthy();

    expect(results[0].id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
  });
});
