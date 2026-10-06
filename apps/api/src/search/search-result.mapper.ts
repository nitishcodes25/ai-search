import { ScoredPage, SearchResultResponse } from "@ai-search/shared";

export const mapSearchResults = (scoredPages: ScoredPage[]): SearchResultResponse[] => {
    return scoredPages.map(scoredPage => {
        const {result: {id, title, url, snippet, source}} = scoredPage?.page
        return {
            id,
            title,
            url,
            snippet,
            source,
            score: Number(scoredPage.score.toFixed(2))
        }
    })
}