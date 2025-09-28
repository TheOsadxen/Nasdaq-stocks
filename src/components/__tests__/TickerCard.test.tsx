import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithClient } from "../../test/test-utils";
import { TickerCard } from "../TickerCard";

describe("TickerCard", () => {
  it("renders ticker, name, currency and type", () => {
    renderWithClient(
      <TickerCard
        data={{
          ticker: "AAPL",
          name: "Apple Inc",
          currency_name: "usd",
          type: "stock",
        }}
      />
    );

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("Apple Inc")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("stock")).toBeInTheDocument();
  });

  it("renders safely with partial data", () => {
    renderWithClient(<TickerCard data={{ ticker: "TSLA" }} />);
    expect(screen.getByText("TSLA")).toBeInTheDocument();
  });
});
