import { SearchProvider } from './providers/search-provider.js'
import type {SearchResult} from '@ai-search/shared'

export class SearchService {
    constructor(private readonly searchProvider: SearchProvider){}

    async search(query: string): Promise<SearchResult[]>  {
        return this.searchProvider.search(query)
    }
}