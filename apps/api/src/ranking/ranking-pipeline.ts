import { FetchedPage, ScoredPage } from "@ai-search/shared";
import { scoreResult } from "../search/query-scorer.js";
import { TITLE_WEIGHT,SNIPPET_WEIGHT,CONTENT_WEIGHT } from "../utils/constants.js";

export const rankPages = (
  query: string,
  pages: FetchedPage[]
): ScoredPage[] => {
  return pages
    .map((page) => {
      const relevance = scoreResult(query, page);

      const finalScore =
        relevance.titleScore * TITLE_WEIGHT +
        relevance.snippetScore * SNIPPET_WEIGHT +
        relevance.textContentScore * CONTENT_WEIGHT;

      return {
        ...page,
        score: finalScore
      };
    })
    .sort((a, b) => b.score - a.score);
};