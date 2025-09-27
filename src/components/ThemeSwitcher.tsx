import { Fragment } from "react";
import MoonIcon from "../assets/moon.svg?react";
import SunIcon from "../assets/sun.svg?react";
import { useTheme } from "../hooks/useTheme";

export function ThemeSwitcher(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <Fragment>
      {theme === "light" ? (
        <MoonIcon
          className="transform cursor-pointer transition duration-150 hover:scale-90 active:scale-75 w-8 h-8"
          onClick={toggleTheme}
        />
      ) : (
        <SunIcon
          className="transform cursor-pointer transition duration-150 hover:scale-90 active:scale-75 w-8 h-8"
          onClick={toggleTheme}
        />
      )}
    </Fragment>
  );
}
