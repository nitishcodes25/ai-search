import React, { useState } from "react";

import { searchWeb} from "../api/search";
import type {SearchResultResponse} from '@ai-search/shared'

function Search() {
  const [hasSearched, setHasSearched] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await searchWeb(trimmedQuery);

      setResults(data);
    } catch {
      setError("Something went wrong while searching.");
      setResults([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  }

  return (
    <div>
      <h1>AI Search</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the web..."
        />

        <button type="submit" disabled={loading || !query.trim()}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p>{error}</p>}

      {hasSearched && !loading && !error && results.length === 0 && (
        <p>No results found.</p>
      )}

      {!loading && !error && hasSearched && results.length > 0 && (
        <p>{results.length} results found</p>
      )}

      <div>
        {results.map((result) => (
          <article key={result.id}>
            <h2>
              <a href={result.url} target="_blank" rel="noreferrer">
                {result.title}
              </a>
            </h2>

            <p>{result.snippet}</p>

            <small>{result.source}</small>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Search;
