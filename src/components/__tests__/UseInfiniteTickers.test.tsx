//@ts-nocheck
import { describe, it, expect, vi, afterEach } from "vitest";
import { waitFor, act } from "@testing-library/react";
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

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pages[0].results[0].ticker).toBe("AAPL");
  });
});
