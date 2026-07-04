import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0E14",
        surface: "#11151D",
        surface2: "#171C26",
        border: "#232936",
        text: "#E7ECF3",
        muted: "#8A94A6",
        accent: "#6C63FF",
        accent2: "#8F87FF",
        amber: "#F2B84B",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(108,99,255,0.08), transparent 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
