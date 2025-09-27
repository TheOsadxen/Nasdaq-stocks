import NasdaqLogo from "../assets/nasdaq-logo.svg?react";
import { ThemeSwitcher } from "./ThemeSwitcher";
type Props = {
  searchText: string;
  onSearchChange: (text: string) => void;
};

export function Header({
  searchText,
  onSearchChange,
}: Props): React.ReactElement {
  return (
    <header className="flex items-center justify-between mb-6 shadow-md sticky top-0 z-40 p-4 bg-white/50 backdrop-blur dark:bg-container-dark">
      <div className="text-2xl font-bold">
        <NasdaqLogo className="w-28" />
      </div>

      <input
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search stocks..."
        className="px-4 dark:text-white py-2 mx-auto w-full max-w-xl rounded-lg border border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ThemeSwitcher />
    </header>
  );
}
