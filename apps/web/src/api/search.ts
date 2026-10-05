import type {SearchResult} from '@ai-search/shared'

export type SearchReponse = {
  results: SearchResult[];
};

export const searchWeb = async (query: string): Promise<SearchResult[]> => {
  const response = await fetch(
    `/api/search?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Search failed");
  }

  const data: SearchReponse = await response.json();

  return data.results;
};
