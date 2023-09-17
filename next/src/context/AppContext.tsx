"use client";

import { cookies } from "next/headers";
import { ReactNode, createContext, useEffect, useState } from "react";

const AppContext = createContext({
  theme: "light",
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.cookie = "theme=dark";
  }, []);

  // useEffect(() => {
  //   if (
  //     localStorage.theme === "dark" ||
  //     (!("theme" in localStorage) &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches)
  //   ) {
  //     setTheme("dark");
  //     // localStorage.setItem("theme", "dark");
  //     document.cookie = "theme=dark";
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     setTheme("light");
  //     document.cookie = "theme=light";
  //     // localStorage.setItem("theme", "light");
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, []);

  return (
    <AppContext.Provider value={{ theme }}>{children}</AppContext.Provider>
  );
};
