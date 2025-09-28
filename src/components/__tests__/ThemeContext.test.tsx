import { act, fireEvent, render } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useTheme } from "../../hooks/useTheme";
import { ThemeProvider } from "../../context/ThemeContextProvider";

function Consumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to dark and toggles theme", async () => {
    localStorage.removeItem("theme");
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );

    expect(getByTestId("theme").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Toggle (wrapped in act)
    act(() => {
      fireEvent.click(getByText("toggle"));
    });

    // after toggle it becomes light
    expect(getByTestId("theme").textContent).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
