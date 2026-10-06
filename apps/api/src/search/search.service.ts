import { SearchProvider } from './providers/search-provider.js'
import { deduplicateResults } from './deduplicate-results.js';
import type {ScoredPage} from '@ai-search/shared'
import { WebContentPipeline } from '../web-content/web-content-pipeline.js';
import { rankPages } from '../ranking/ranking-pipeline.js';

export class SearchService {
    constructor(
        private readonly searchProvider: SearchProvider, 
        private readonly webContentpipeline: WebContentPipeline
    ){}

    async search(query: string): Promise<ScoredPage[]>  {
        const results = await this.searchProvider.search(query);

        const uniqueResults =  deduplicateResults(results);

        const fetchedPageResults = await this.webContentpipeline.fetchPages(uniqueResults)
        
        return rankPages(query,fetchedPageResults)
    }
}