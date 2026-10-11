
import { FetchedPage } from "@ai-search/shared";
import { db } from "./client.js";

export type DocumentRow = {
  id: string;
  url: string;
  title: string | null;
  snippet: string | null;
  content: string | null;
  text_content: string | null;
  excerpt: string | null;
  length: number | null;
  byline: string | null;
  dir: string | null;
  site_name: string | null;
  lang: string | null;
  published_time: Date | null;
  created_at: Date;
  updated_at: Date;
};

export class DocumentsRepository {
  async save(page: FetchedPage): Promise<DocumentRow> {
    const publishedTime =
      page.publishedTime &&
      !Number.isNaN(Date.parse(page.publishedTime))
        ? new Date(page.publishedTime)
        : null;

    const result = await db.query<DocumentRow>(
      `
        INSERT INTO documents (
          url,
          title,
          snippet,
          content,
          text_content,
          excerpt,
          length,
          byline,
          dir,
          site_name,
          lang,
          published_time
        )
        VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11, $12
        )
        ON CONFLICT (url)
        DO UPDATE SET
          title = EXCLUDED.title,
          snippet = EXCLUDED.snippet,
          content = EXCLUDED.content,
          text_content = EXCLUDED.text_content,
          excerpt = EXCLUDED.excerpt,
          length = EXCLUDED.length,
          byline = EXCLUDED.byline,
          dir = EXCLUDED.dir,
          site_name = EXCLUDED.site_name,
          lang = EXCLUDED.lang,
          published_time = EXCLUDED.published_time,
          updated_at = NOW()
        RETURNING *
      `,
      [
        page.url,
        page.title,
        page.snippet,
        page.content,
        page.textContent,
        page.excerpt,
        page.length,
        page.byline,
        page.dir,
        page.siteName,
        page.lang,
        publishedTime,
      ],
    );

    return result.rows[0]!;
  }

  async findByUrl(url: string): Promise<DocumentRow | null> {
    const result = await db.query<DocumentRow>(
      "SELECT * FROM documents WHERE url = $1",
      [url],
    );

    return result.rows[0] ?? null;
  }
}