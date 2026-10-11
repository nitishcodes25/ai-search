import { describe, it, expect, afterAll } from "vitest";
import { db } from "../../src/infrastructure/db/client";
import { DocumentsRepository } from "../../src/infrastructure/db/documents.repository";

const repository = new DocumentsRepository();

describe("document repository", () => {
  const testUrl = `https://example.com/test-document-4ecb496e-eb63-4467-806d-1f7740e5040c`;
  

//   afterAll(async () => {
//     await db.query("DELETE FROM documents WHERE url = $1", [testUrl]);
//     await db.end();
//   });

  it("saves a document and retrieve its by URL", async () => {
    const page = {
      id: crypto.randomUUID(),
      url: testUrl,
      title: "Integration Test Document",
      snippet: "A test snippet",
      content: "<article>Test content</article>",
      textContent: "Test content",
      length: 12,
      excerpt: "Test excerpt",
      byline: "Test Author",
      dir: null,
      siteName: "Example",
      lang: "en",
      publishedTime: null,
    };

    const savedDocument = await repository.save(page);

    expect(savedDocument.url).toBe(page.url);
    expect(savedDocument.title).toBe("Integration Test Document");
    expect(savedDocument.text_content).toBe("Test content");
    expect(savedDocument.id).toBeTruthy();

    const foundDocument = await repository.findByUrl(testUrl);

    expect(foundDocument).not.toBe(null);
    expect(foundDocument?.id).toBe(savedDocument.id);
    expect(foundDocument?.url).toBe(testUrl);
  });
});
