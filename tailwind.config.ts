// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
   './app/**/*.{ts,tsx}', 
  './components/**/*.{ts,tsx}',
  './styles/**/*.{css}'
  ],
  darkMode: "class", // <<< REQUIRED for toggle to work
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
