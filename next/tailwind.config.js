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
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        tilt: 'tilt 10s infinite linear',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(2deg)',
          },
          '75%': {
            transform: 'rotate(-2deg)',
          },
        },
      },
      fill: {
        skin: {
          base: withOpacity('var(--color-fill)'),
        },
      },

      stroke: {
        skin: {
          base: withOpacity('var(--color-fill)'),
          accent: withOpacity('var(--color-border)'),
        },
      },
      ringColor: {
        skin: {
          base: withOpacity('var(--color-fill)'),
        },
      },

      ringOffsetColor: {
        skin: {
          base: withOpacity('var(--color-bg)'),
        },
      },

      borderColor: {
        skin: {
          base: withOpacity('var(--color-border)'),
        },
      },
      textColor: {
        skin: {
          base: withOpacity('var(--color-text)'),
          accent: withOpacity('var(--color-text-accent)'),
          fill: withOpacity('var(--color-fill)'),
        },
      },
      shadow: {
        skin: {
          base: withOpacity('var(--color-shadow)'),
        },
      },
      backgroundColor: {
        skin: {
          base: withOpacity('var(--color-bg)'),
          border: withOpacity('var(--color-border)'),
          hover: withOpacity('var(--color-bg-hover)'),
          accent: withOpacity('var(--color-bg-accent)'),
          fill: withOpacity('var(--color-fill)'),
          shadow: withOpacity('var(--color-shadow)'),
        },
      },
    },
  },
  plugins: [],
};
