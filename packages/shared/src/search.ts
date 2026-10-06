export type SearchResult = {
  id: string;
  title: string;
  url: string;
  snippet: string;
  source: string;
};

export type FetchedPage = {
  result: SearchResult;
  html: string;
  extractedContent: ExtractedContent;
};

export type ExtractedContent = {
  title: string | null;
  content: string;
  text: string;
};

export type ScoredPage = {
  page: FetchedPage;
  score: number;
};

export type SearchResultResponse = SearchResult & {
  score: number
}