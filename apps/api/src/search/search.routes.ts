import { Router } from "express";
import { TavilySearchProvider } from "./providers/tavily-search-provider.js";
import { SearchService } from "./search.service.js";
import { SearchController } from "./search.controller.js";

const router = Router();

const searchprovider = new TavilySearchProvider();
const searchService = new SearchService(searchprovider);
const searchController = new SearchController(searchService);

router.get('/',searchController.search.bind(searchController));

export default router;