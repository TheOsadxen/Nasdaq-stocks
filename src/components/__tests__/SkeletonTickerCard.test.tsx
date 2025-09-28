import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SkeletonTickerCard } from "../SkeletonTickerCard";

describe("SkeletonTickerCard", () => {
  it("renders skeleton with animate-pulse", () => {
    const { container } = render(<SkeletonTickerCard />);
    expect(container.querySelector(".animate-pulse")).toBeTruthy();
  });
});
