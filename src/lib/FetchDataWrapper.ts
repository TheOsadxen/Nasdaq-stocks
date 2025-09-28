import { applyRateLimit, checkRateLimit } from "../helpers/ratelimit";

/**
 * Generic HTTP GET resource fetcher with built-in rate limit handling.
 *
 * This function:
 * - Checks if a client-side rate limit is currently active via `checkRateLimit`.
 *   - If blocked, it immediately throws an error with the wait time remaining.
 * - Filters out any undefined, null, or empty query parameters.
 * - Constructs a query string and performs a `fetch` request to the given endpoint.
 * - Handles HTTP 429 (Too Many Requests) by applying a 60-second block using `applyRateLimit`.
 * - Parses and throws error messages from failed responses.
 *
 * @template T - The expected response type (parsed JSON object).
 *
 * @param {string} endpoint - The base API endpoint (without query params).
 * @param {Record<string, string | number>} [params={}] - Optional query parameters.
 *   - Parameters with `undefined`, `null`, or empty string values are removed automatically.
 *
 * @throws {Error} If:
 *   - The client is currently rate-limited (`checkRateLimit`).
 *   - The API responds with HTTP 429 (rate limit exceeded).
 *   - The API responds with a non-OK status (>=400).
 *
 * @returns {Promise<T>} A promise that resolves with the parsed JSON response.
 *
 * @example
 * ```ts
 * // Fetch 20 tickers from XNAS exchange
 * const data = await fetchResource<{ results: Ticker[] }>(
 *   "https://api.polygon.io/v3/reference/tickers",
 *   { limit: 20, exchange: "XNAS" }
 * );
 * console.log(data.results);
 * ```
 */
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
