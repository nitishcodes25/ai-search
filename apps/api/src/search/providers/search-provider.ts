import type {SearchResult} from '@ai-search/shared'

export interface SearchProvider {
    search(query: string): Promise<SearchResult[]>;
}