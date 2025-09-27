export interface Ticker {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  cik: string;
  last_updated_utc: string;
}

export type PolygonTickersPage = {
  results: Partial<Ticker>[];
  next_url?: string | null;
};

export type PolygonError = {
  status: string;
  request_id: string;
  error: string;
};

export type FetchResourceError = {
  message: string;
  statusCode: number;
  retryAfter?: number;
  polygonError?: PolygonError;
};

export interface RateLimitError {
  statusCode: number;
  retryAfter?: number;
}
