import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetchTickers } from "../services/polygonAPI";
import type { PolygonTickersPage } from "../types/custom/polygon";

/**
 * Custom React hook for fetching Nasdaq stock tickers with infinite scrolling support.
 *
 * Uses React Query's `useInfiniteQuery` to handle pagination, caching, and background fetching.
 * Supports searching tickers by name or symbol and automatically retrieves the next page when needed.
 *
 * @param {Object} options - Hook options.
 * @param {string} [options.search=""] - Optional search term for filtering tickers.
 * @param {number} [options.limit=20] - Number of tickers to fetch per page.
 *
 * @returns {ReturnType<typeof useInfiniteQuery>} The infinite query result object including:
 * - `data` - The fetched ticker pages (`InfiniteData<PolygonTickersPage>`).
 * - `isLoading` - `true` while the first page is loading.
 * - `isError` - `true` if an error occurs.
 * - `fetchNextPage` - Function to load the next page.
 * - `hasNextPage` - `true` if there are more pages to fetch.
 * - `isFetchingNextPage` - `true` if the next page is currently being fetched.
 * - `refetch` - Function to refetch all pages.
 *
 * @example
 * ```ts
 * const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteTickers({
 *   search: "AAPL",
 *   limit: 20
 * });
 *
 * // Access tickers
 * const tickers = data?.pages.flatMap(page => page.results) ?? [];
 *
 * // Load next page
 * if (hasNextPage) fetchNextPage();
 * ```
 */
export function useInfiniteTickers({
  search = "",
  limit = 20,
}: {
  search?: string;
  limit?: number;
}) {
  return useInfiniteQuery<
    PolygonTickersPage,
    Error,
    InfiniteData<PolygonTickersPage>,
    string[]
  >({
    queryKey: ["tickers", search],
    initialPageParam: undefined as unknown as string,

    queryFn: async ({ pageParam }) => {
      return fetchTickers({
        limit,
        cursor: pageParam as string | undefined,
        search: search || undefined,
        exchange: "XNAS",
      });
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage.next_url) return undefined;

      // Extract the cursor param from next_url
      const url = new URL(lastPage.next_url);
      return url.searchParams.get("cursor") || undefined;
    },

    refetchOnWindowFocus: false,
  });
}
