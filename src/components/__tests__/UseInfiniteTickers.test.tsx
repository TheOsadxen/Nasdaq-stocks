import { describe, it, expect, vi, afterEach } from "vitest";
import { waitFor } from "@testing-library/react";
import { fetchTickers } from "../../services/polygonAPI";
import { renderHookWithClient } from "../../test/test-utils";
import { useInfiniteTickers } from "../../hooks/useInfiniteTickers";

vi.mock("../../services/polygonAPI", () => ({
  fetchTickers: vi.fn(),
}));

describe("useInfiniteTickers", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches the first page and resolves", async () => {
    (fetchTickers as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: [{ ticker: "AAPL" }],
      next_url: null,
    });

    const { result } = renderHookWithClient(() =>
      useInfiniteTickers({ search: "AAPL" })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await waitFor(() => expect((result as any).current.isSuccess).toBe(true));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result as any).current.data?.pages[0].results[0].ticker).toBe(
      "AAPL"
    );
  });
});
