import { ScoredPage, SearchResultResponse } from "@ai-search/shared";

export const mapSearchResults = (scoredPages: ScoredPage[]): SearchResultResponse[] => {
    return scoredPages.map(scoredPage => {
        return {
           id: scoredPage?.id,
           title: scoredPage?.title ?? "",
           url: scoredPage?.url ,
           snippet: scoredPage?.snippet,
           excerpt: scoredPage?.excerpt ?? "",
           lang: scoredPage?.lang ?? "",
           dir: scoredPage?.dir ?? "",
           publishedTime: scoredPage?.publishedTime ?? "",
           score: scoredPage?.score
        }
    })
}