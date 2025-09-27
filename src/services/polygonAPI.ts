import { fetchResource } from "../lib/FetchDataWrapper";
import type { PolygonTickersPage } from "../types/custom/polygon";

const POLYGON_TICKERS_URL = "https://api.polygon.io/v3/reference/tickers";
const API_KEY = import.meta.env.VITE_POLYGON_API_KEY;

export async function fetchTickers(
  params: {
    limit?: number;
    cursor?: string;
    search?: string;
    exchange: string;
  } = {
    exchange: "XNAS",
  }
): Promise<PolygonTickersPage> {
  const response = await fetchResource<PolygonTickersPage>(
    POLYGON_TICKERS_URL,
    {
      ...params,
      apiKey: API_KEY,
    }
  );

  if ("error" in response) {
    throw response.error;
  }

  return response;
}
