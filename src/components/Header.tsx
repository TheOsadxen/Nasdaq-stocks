import NasdaqLogo from "../assets/nasdaq-logo.svg?react";
import { ThemeSwitcher } from "./ThemeSwitcher";

type Props = {
  searchText: string;
  onSearchChange: (text: string) => void;
};

/**
 * Header component for the Nasdaq Stocks app.
 *
 * Includes:
 * - Nasdaq logo
 * - Search input for filtering tickers
 * - Theme switcher for toggling dark/light mode
 *
 * Uses Tailwind CSS for styling, including dark mode classes.
 *
 * @component
 * @param {Props} props - Component props.
 * @param {string} props.searchText - Current search input value.
 * @param {(text: string) => void} props.onSearchChange - Callback when the search input changes.
 *
 * @example
 * ```tsx
 * <Header
 *   searchText={search}
 *   onSearchChange={(value) => setSearch(value)}
 * />
 * ```
 */
export function Header({
  searchText,
  onSearchChange,
}: Props): React.ReactElement {
  return (
    <header className="flex w-full flex-col md:flex-row md:items-center md:justify-between mb-6 shadow-md sticky top-0 z-40 p-4 bg-white/50 backdrop-blur dark:bg-container-dark gap-3 md:gap-4">
      {/* This container groups the logo and switcher.
        - On mobile: It's a flex row, placing them side-by-side.
        - On desktop (`md:`): `md:contents` makes this div "disappear" for layout purposes,
          promoting the Logo and ThemeSwitcher to be direct flex items of the <header>. */}
      <div className="flex w-full items-center justify-between md:contents">
        {/* Logo - Becomes the 1st item on desktop */}
        <div className="text-2xl font-bold flex-shrink-0 md:order-1">
          <NasdaqLogo className="w-28" />
        </div>

        {/* ThemeSwitcher - Becomes the 3rd item on desktop */}
        <div className="md:order-3">
          <ThemeSwitcher />
        </div>
      </div>

      {/* Search input - Becomes the 2nd item on desktop */}
      <input
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search stocks..."
        className="px-4 dark:text-white py-2 w-full max-w-xl rounded-lg border border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto md:order-2 md:mx-4"
      />
    </header>
  );
}
