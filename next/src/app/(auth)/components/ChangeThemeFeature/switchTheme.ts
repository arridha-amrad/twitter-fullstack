const switchTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme && theme === "dark") {
    // localStorage.setItem("theme", "light");
    document.cookie = "theme=dark";
    document.documentElement.classList.remove("dark");
  } else {
    document.cookie = "theme=test";
    document.documentElement.classList.add("dark");
  }
};

export default switchTheme;
