import { FetchedPage } from "@ai-search/shared";

const TITLE_WEIGHT = 0.5;
const SNIPPET_WEIGHT = 0.3;
const CONTENT_WEIGHT = 0.2;

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

export const scoreResult = (query: string, fetchedPage: FetchedPage): number => {
  const { result, extractedContent } = fetchedPage;
  const { title, snippet } = result;
  const { text } = extractedContent;

  return (
    matchScore(query, title) * TITLE_WEIGHT +
    matchScore(query, snippet) * SNIPPET_WEIGHT +
    matchScore(query, text) * CONTENT_WEIGHT
  );
};
