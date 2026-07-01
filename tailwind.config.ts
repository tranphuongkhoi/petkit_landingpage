import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101820",
        leaf: "#6fbf73",
        mint: "#dff7ec",
        cloud: "#f7faf8",
      },
      boxShadow: {
        soft: "0 24px 80px rgba(16, 24, 32, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
