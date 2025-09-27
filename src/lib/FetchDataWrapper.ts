import { applyRateLimit, checkRateLimit } from "../helpers/ratelimit";

export const fetchResource = async <T = unknown>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> => {
  const { blocked, wait } = checkRateLimit();
  if (blocked) {
    throw new Error(`Rate limit exceeded. Automatic Retry after ${wait}s`);
  }

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== undefined && v !== null && v !== ""
    )
  );

  const queryString = new URLSearchParams(
    Object.entries(filteredParams).map(([k, v]) => [k, String(v)])
  ).toString();

  const url = `${endpoint}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 429) {
    // Free tier → always 5 requests per minute, so block for 60s
    applyRateLimit(60);
    const err = await response.json().catch(() => ({}));
    throw new Error(
      err.error || "Rate limit exceeded. Please wait 60s before retrying."
    );
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
};
