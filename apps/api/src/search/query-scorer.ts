import { FetchedPage, RelevanceScore } from "@ai-search/shared";

const tokenize = (query: string): string[] => {
  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
};

const matchScore = (query: string, text: string) => {
  const tokenizedQuery = tokenize(query);

  if (tokenizedQuery.length === 0) {
    return 0;
  }
  const tokenizedText = tokenize(text);

  let match = 0;

  for (const queryItem of tokenizedQuery) {
    if (tokenizedText.includes(queryItem)) {
      match++;
    }
  }

  return match / tokenizedQuery.length;
};

export const scoreResult = (query: string, fetchedPage: FetchedPage): RelevanceScore => {
  const { title, snippet, textContent } = fetchedPage;

  const titleScore = matchScore(query, title ?? "");
  const snippetScore = matchScore(query, snippet);
  const textContentScore =  matchScore(query, textContent ?? "");
 
  return {
    titleScore,
    snippetScore,
    textContentScore
  }
};
