"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

type Theme = "light" | "light-out" | "dim";

const AppContext = createContext<{
  bg: Theme;
  setBg: Dispatch<SetStateAction<Theme>> | undefined;
}>({
  bg: "light",
  setBg: undefined,
});

const setAppBackground = (background: Theme) => {
  Cookies.set("background", background, {
    path: "/",
    domain: "localhost",
  });
  document.documentElement.classList.add(background);
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [bg, setBg] = useState<Theme>("light");

  useEffect(() => {
    const bgFromCookie = Cookies.get("background") as Theme;
    const colorFromCookie = Cookies.get("color");
    if (colorFromCookie) {
      document.documentElement.classList.add(colorFromCookie);
    }
    if (bgFromCookie) {
      setBg(bgFromCookie);
      document.documentElement.classList.add(bgFromCookie);
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setBg("light-out");
        setAppBackground("light-out")
      } else {
        setBg("light");
        setAppBackground("light")
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ bg, setBg }}>{children}</AppContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(AppContext);
  return ctx;
};
