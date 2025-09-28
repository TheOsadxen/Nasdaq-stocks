import React from "react";
import type { Ticker } from "../types/custom/polygon";

interface TickerCardProps {
  data: Partial<Ticker>;
}

export const TickerCard: React.FC<TickerCardProps> = ({ data }) => {
  const { ticker, name, currency_name, type } = data;
  return (
    <div className="bg-white rounded-xl border dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 border-gray-100 dark:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col">
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
      <div className="flex justify-between text-xs text-gray-500">
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
          {currency_name?.toUpperCase()}
        </span>
        <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
          {type}
        </span>
      </div>
    </div>
  );
};
