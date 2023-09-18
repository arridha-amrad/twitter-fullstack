"use client";

import { getFromCookie } from "@/utils/getFromCookie";
import { cookies } from "next/headers";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

const AppContext = createContext<{
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>> | undefined;
}>({
  theme: "light",
  setTheme: undefined,
});

const toDarkMode = (setTheme: (v: string) => void) => {
  setTheme("dark");
  document.cookie = "theme=dark";
  document.documentElement.classList.add("dark");
};

const toLightMode = (setTheme: (v: string) => void) => {
  setTheme("light");
  document.cookie = "theme=light";
  document.documentElement.classList.remove("dark");
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // const themeCookie = getFromCookie("theme");
    // if (themeCookie) {
    //   const isDark = themeCookie.split("=")[1] === "dark";
    //   if (isDark) {
    //     toDarkMode(() => setTheme("dark"));
    //   } else {
    //     toLightMode(() => setTheme("light"));
    //   }
    // } else {
    //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //     toDarkMode(() => setTheme("dark"));
    //   } else {
    //     toLightMode(() => setTheme("light"));
    //   }
    // }
  }, []);

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(AppContext);
  return ctx;
};
