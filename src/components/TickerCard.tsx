import React from "react";
import type { Ticker } from "../types/custom/polygon";

interface TickerCardProps {
  data: Partial<Ticker>;
}

/**
 * Displays a single stock ticker card with symbol, company name, currency, and type.
 *
 * Supports dark mode styling with Tailwind CSS `dark:` classes.
 *
 * @component
 * @param {TickerCardProps} props - Component props.
 * @param {Partial<Ticker>} props.data - The ticker data object. Can include:
 *   - `ticker`: The stock symbol.
 *   - `name`: Company name.
 *   - `currency_name`: Currency code.
 *   - `type`: Ticker type.
 *
 * @example
 * ```tsx
 * <TickerCard
 *   data={{
 *     ticker: "AAPL",
 *     name: "Apple Inc.",
 *     currency_name: "USD",
 *     type: "Common Stock"
 *   }}
 * />
 * ```
 */
export const TickerCard: React.FC<TickerCardProps> = ({ data }) => {
  const { ticker, name, currency_name, type } = data;
  return (
    <div className="bg-white rounded-xl border dark:bg-neutral-950 border-gray-100 dark:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col">
      {/* Symbol */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
        {ticker}
      </h2>

      {/* Company name */}
      <p className="text-sm text-gray-600 truncate dark:text-text-dark">
        {name}
      </p>

      {/* Divider */}
      <div className="border-t border-gray-100 my-3" />

      {/* Meta info */}
      <div className="flex justify-between text-xs dark:text-gray-700 text-gray-500">
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
          {currency_name?.toUpperCase()}
        </span>
        <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-200 dark:text-blue-800 font-medium">
          {type}
        </span>
      </div>
    </div>
  );
};
