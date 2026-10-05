import type {Request, Response} from 'express'
import { SearchService } from './search.service.js';
import { searchQuerySchema } from './search.schema.js';

export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    async search(req:Request, res: Response): Promise<void>{
        const {q} = searchQuerySchema.parse(req.query);

        const results = await this.searchService.search(q)

        res.json({
            results
        })
    }
}