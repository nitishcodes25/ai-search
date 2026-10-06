import { Router } from "express";
import { TavilySearchProvider } from "./providers/tavily-search-provider.js";
import { SearchService } from "./search.service.js";
import { SearchController } from "./search.controller.js";
import { WebContentPipeline } from "../web-content/web-content-pipeline.js";
import { Webfetcher } from "../web-content/web-fetcher.js";

const router = Router();

const webfetcher = new Webfetcher()
const webContentPipeline = new WebContentPipeline(webfetcher);

const searchProvider = new TavilySearchProvider();
const searchService = new SearchService(searchProvider,webContentPipeline);
const searchController = new SearchController(searchService);

router.get('/',searchController.search.bind(searchController));

export default router;