import React, { useEffect, useMemo, useRef, useState } from "react";
import { TickerCard } from "../components/TickerCard";
import { useInfiniteTickers } from "../hooks/useInfiniteTickers";
import { SkeletonTickerCard } from "../components/SkeletonTickerCard";
import { checkRateLimit } from "../helpers/ratelimit";
import { useDebounce } from "../hooks/useDebounce";
import { Header } from "../components/Header";

const PAGE_SIZE = 20;

export function ExploreStocks(): React.ReactElement {
  const [waitTime, setWaitTime] = useState(0);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const hasRetried = useRef(false);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteTickers({
    search: debouncedSearch,
    limit: PAGE_SIZE,
  });

  // auto retry when cooldown ends (fire once)
  useEffect(() => {
    if (waitTime === 0 && isError && !hasRetried.current) {
      refetch();
      hasRetried.current = true;
    }
  }, [waitTime, isError, refetch]);

  // flatten pages
  const tickers = useMemo(
    () => data?.pages.flatMap((item) => item.results) ?? [],
    [data]
  );

  // countdown updater
  useEffect(() => {
    const interval = setInterval(() => {
      const { wait } = checkRateLimit();
      setWaitTime(wait);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // sentinel observer
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            if (waitTime > 0) return; // still locked
            fetchNextPage();
          }
        });
      },
      { root: null, rootMargin: "300px", threshold: 0.1 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, waitTime]);

  return (
    <div className="min-h-[60vh]">
      <Header
        onSearchChange={(searchQuery) => setSearch(searchQuery)}
        searchText={search}
      />

      {/* Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {/* initial loading skeletons */}
        {isLoading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <SkeletonTickerCard key={`skeleton-${i}`} />
          ))}

        {/* data */}
        {!isLoading &&
          tickers?.map((item) => <TickerCard key={item.ticker} data={item} />)}
      </main>

      {/* loading / load more area + handling rate-limiting */}
      <div className="p-4 flex flex-col items-center justify-center">
        {isError && waitTime > 0 ? (
          <div className="text-red-600 text-center mt-4 dark:text-red-500">
            Rate limit exceeded. Automatic Retry will be triggered in {waitTime}
            s.
          </div>
        ) : isFetchingNextPage ? (
          <div className="py-2 dark:text-white">Loading more...</div>
        ) : (
          !hasNextPage &&
          !isFetchingNextPage &&
          !isLoading && (
            <div className="py-2 text-sm text-gray-500">No more results</div>
          )
        )}

        {/* the sentinel observed by IntersectionObserver */}
        <div ref={sentinelRef} className="h-1 w-full" />
      </div>
    </div>
  );
}
