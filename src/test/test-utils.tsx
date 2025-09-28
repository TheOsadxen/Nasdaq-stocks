// src/test/test-utils.tsx
import React from "react";
import { render, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../context/ThemeContextProvider";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
}

/**
 * renderWithClient - wraps UI with QueryClientProvider and ThemeProvider
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderWithClient(ui: React.ReactElement, options?: any) {
  const queryClient = createTestQueryClient();
  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{ui}</ThemeProvider>
      </QueryClientProvider>,
      options
    ),
    queryClient,
  };
}

/**
 * renderHookWithClient - helper for hooks tests
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderHookWithClient(hook: any, options: any = {}) {
  const queryClient = options.queryClient ?? createTestQueryClient();
  const wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return renderHook(hook, { wrapper, ...options });
}
