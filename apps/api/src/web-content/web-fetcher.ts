export class Webfetcher {
  async fetch(url: string): Promise<string> {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10_000),
      headers: {
        "User-Agent": "AI-Search-Bot/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to search webpage: ${response.status}`);
    }

    return response.text();
  }
}
