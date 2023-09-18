const withOpacity = (variableName) => {
  return ({ opacityValue }) => {
    if (!opacityValue) {
      return `rgba(${variableName})`;
    }
    return `rgba(${variableName}, ${opacityValue})`;
  };
};

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: "var(--color-text)",
          accent: "var(--color-text-accent)",
        },
      },
      backgroundColor: {
        skin: {
          base: withOpacity("var(--color-bg)"),
          hover: withOpacity("var(--color-bg-hover)"),
          accent: withOpacity("var(--color-bg-accent)"),
          fill: withOpacity("var(--color-fill)"),
        },
      },
    },
  },
  plugins: [],
};
