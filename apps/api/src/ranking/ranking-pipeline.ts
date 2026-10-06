import { FetchedPage, ScoredPage } from "@ai-search/shared";
import { scoreResult } from "../search/query-scorer.js";

export const rankPages = (query: string, pages: FetchedPage[]): ScoredPage[] => {
  return pages.map((page) => ({
    page,
    score: scoreResult(query, page),
  })).sort((a,b)=> b.score - a.score)
};
