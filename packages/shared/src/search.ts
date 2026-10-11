export type SearchResult = {
  id: string;
  title: string;
  url: string;
  snippet: string;
};

export type ExtractedContent = {
  title: string | null;
  content: string | null;
  textContent: string | null;
  length: number | null;
  excerpt: string | null;
  byline: string | null;
  dir: string | null;
  siteName: string | null;
  lang: string | null;
  publishedTime: string | null;
};

export type FetchedPage = ExtractedContent & {
  id: string;
  url: string;
  snippet: string;
};

export type RelevanceScore = {
  titleScore: number;
  snippetScore: number;
  textContentScore: number;
};

export type ScoredPage = FetchedPage & {
  score: number;
};

export type SearchResultResponse = SearchResult & {
  excerpt: string | null;
  lang: string | null;
  dir: string | null;
  publishedTime: string | null;
  score: number;
};
