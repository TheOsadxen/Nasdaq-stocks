import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedQuery, setDebouncedQuery] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedQuery;
}
