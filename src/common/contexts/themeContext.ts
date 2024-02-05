import { createContext, useContext } from "react";
import Theme, { darkTheme } from "../types/theme";

const ThemeContext = createContext<Theme>(darkTheme);

const useThemeContext = () => useContext(ThemeContext);

export { useThemeContext };
export default ThemeContext;