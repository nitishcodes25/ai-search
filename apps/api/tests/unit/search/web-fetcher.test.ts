import { describe, expect, it, vi, beforeEach } from "vitest";
import { Webfetcher } from "../../../src/web-content/web-fetcher";

describe("Webfetcher", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  it("test the successful reponse", async () => {
    const htmlContent = `<html>
                            <head>
                                <title>Web page</title>
                            </head>
                            <body>
                                <h1>header</header>
                                <main>
                                <div>
                                    <text>Main content</text>
                                </div>
                                </main>
                                
                            </body>
                        </html>`;

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(htmlContent, {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }),
    );

    const webfetcher = new Webfetcher();

    const result = await webfetcher.fetch("https://example.com");

    expect(result).toEqual(htmlContent);
  });

 it("should throw when the response is not successful", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Not Found", {
        status: 404,
        statusText: "Not Found",
        headers: {
          "Content-Type": "text/html",
        },
      }),
    );

    const webfetcher = new Webfetcher();

    await expect(
      webfetcher.fetch("https://example.com"),
    ).rejects.toThrow("Failed to search webpage: 404");
  });
});
