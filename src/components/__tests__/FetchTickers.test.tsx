import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { fetchResource } from "../../lib/FetchDataWrapper";
import { fetchTickers } from "../../services/polygonAPI";

vi.mock("../../lib/FetchDataWrapper", () => ({
  fetchResource: vi.fn(),
}));

describe("fetchTickers", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("calls fetchResource with provided params and an API key", async () => {
    (fetchResource as Mock).mockResolvedValue({
      results: [],
      next_url: null,
    });

    await fetchTickers({ limit: 10, exchange: "XNAS", search: "A" });

    expect(fetchResource).toHaveBeenCalledWith(
      "https://api.polygon.io/v3/reference/tickers",
      expect.objectContaining({
        limit: 10,
        exchange: "XNAS",
        search: "A",
        apiKey: expect.any(String),
      })
    );
  });
});
