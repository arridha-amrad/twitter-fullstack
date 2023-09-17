const switchTheme = (currTheme: string) => {
  if (currTheme === "dark") {
    document.cookie = "theme=light";
    document.documentElement.classList.remove("dark");
  } else {
    document.cookie = "theme=dark";
    document.documentElement.classList.add("dark");
  }
};

export default switchTheme;
