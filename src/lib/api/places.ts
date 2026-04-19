import { useEffect, useState } from "react";

import { apiFetch } from "@/lib/api/client";
import type { PlaceSearchResult, PlacesSearchResponse } from "@/types/places";

const DEFAULT_LIMIT = 8;

type RawPlacesSearchResponse =
  | PlaceSearchResult[]
  | {
      results?: PlaceSearchResult[];
      items?: PlaceSearchResult[];
    };

export async function searchPlaces(
  q: string,
  limit = DEFAULT_LIMIT,
  signal?: AbortSignal,
): Promise<PlacesSearchResponse> {
  const trimmedQuery = q.trim();

  if (!trimmedQuery) {
    return { results: [] };
  }

  const params = new URLSearchParams({
    q: trimmedQuery,
    limit: String(limit),
  });

  const response = await apiFetch(`/api/places/search?${params.toString()}`, {
    method: "GET",
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`place_search_failed_${response.status}`);
  }

  const payload = (await response.json()) as RawPlacesSearchResponse;

  if (Array.isArray(payload)) {
    return { results: payload };
  }

  if (payload?.results && Array.isArray(payload.results)) {
    return { results: payload.results };
  }

  if (payload?.items && Array.isArray(payload.items)) {
    return { results: payload.items };
  }

  return { results: [] };
}

type UsePlacesSearchArgs = {
  query: string;
  limit?: number;
  debounceMs?: number;
};

type UsePlacesSearchState = {
  results: PlaceSearchResult[];
  isLoading: boolean;
  error: Error | null;
  hasSearched: boolean;
};

export function usePlacesSearch({
  query,
  limit = DEFAULT_LIMIT,
  debounceMs = 300,
}: UsePlacesSearchArgs): UsePlacesSearchState {
  const [results, setResults] = useState<PlaceSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query, debounceMs]);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (!trimmedQuery) {
      setResults([]);
      setError(null);
      setHasSearched(false);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function runSearch() {
      setIsLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const payload = await searchPlaces(trimmedQuery, limit, controller.signal);
        setResults(payload.results);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        setResults([]);
        setError(err instanceof Error ? err : new Error("place_search_failed"));
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void runSearch();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, limit]);

  return { results, isLoading, error, hasSearched };
}
