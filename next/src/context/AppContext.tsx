"use client";

import { getFromCookie } from "@/utils/getFromCookie";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "light-out" | "dim";

const AppContext = createContext<{
  bg: Theme;
  setBg: Dispatch<SetStateAction<Theme>> | undefined;
}>({
  bg: "light",
  setBg: undefined,
});

const toDarkMode = (setTheme: (v: string) => void) => {
  setTheme("light-out");
  document.cookie = "background=light-out";
  document.documentElement.classList.remove("dim");
  document.documentElement.classList.add("light-out");
};

const toLightMode = (setTheme: (v: string) => void) => {
  setTheme("light");
  document.cookie = "background=light";
  document.documentElement.classList.remove("light-out", "dim");
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [bg, setBg] = useState<Theme>("light");

  useEffect(() => {
    const bgFromCookie = getFromCookie("background");
    const colorCookie = getFromCookie("color");

    if (colorCookie) {
      const color = colorCookie.split("=")[1];
      document.documentElement.classList.add(color);
    }
    if (bgFromCookie) {
      const bg = bgFromCookie.split("=")[1] as Theme;
      setBg(bg);
      document.documentElement.classList.add(bg);
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        toDarkMode(() => setBg("light-out"));
      } else {
        toLightMode(() => setBg("light"));
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
