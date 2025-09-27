import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetchTickers } from "../services/polygonAPI";
import type { PolygonTickersPage } from "../types/custom/polygon";

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
