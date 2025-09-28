import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/tickers", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;

    if (page === 1) {
      return HttpResponse.json({
        results: [{ ticker: "AAPL" }],
        nextPage: 2,
      });
    }

    if (page === 2) {
      return HttpResponse.json({
        results: [{ ticker: "GOOGL" }],
        nextPage: undefined,
      });
    }

    return HttpResponse.json({ results: [] });
  }),
];

export const server = setupServer(...handlers);
