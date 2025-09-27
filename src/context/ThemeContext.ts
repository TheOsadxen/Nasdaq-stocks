import { createContext } from "react";
import type { ThemeContextType } from "../types/custom/context";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
