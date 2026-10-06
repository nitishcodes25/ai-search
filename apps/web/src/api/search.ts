import type { SearchResultResponse } from "@ai-search/shared";

type SearchResponse = {
  results: SearchResultResponse[];
};

export const searchWeb = async (
  query: string,
): Promise<SearchResultResponse[]> => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Search failed");
  }

  const data: SearchResponse = await response.json();

  return data?.results;
};
