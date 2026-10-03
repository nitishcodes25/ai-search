export type SearchSource = {
  title: string;
  url: string;
};

export type SearchResult = {
  query: string;
  sources: SearchSource[];
};