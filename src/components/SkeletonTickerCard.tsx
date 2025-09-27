import React from "react";

export const SkeletonTickerCard: React.FC = () => {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 shadow animate-pulse">
      <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-40 bg-gray-200 rounded mb-3"></div>
      <div className="h-6 w-20 bg-gray-200 rounded"></div>
    </div>
  );
};
