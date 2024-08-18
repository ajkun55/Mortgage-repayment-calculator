import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      Lime: "hsl(61, 70%, 52%)",
      "light-lime": "rgb(250, 250, 224)",
      Red: "hsl(4, 69%, 50%)",
      White: "hsl(0, 0%, 100%)",
      "Slate-100": "hsl(202, 86%, 94%)",
      "Slate-300": "hsl(203, 41%, 72%)",
      "Slate-500": "hsl(200, 26%, 54%)",
      "Slate-700": "hsl(200, 24%, 40%)",
      "Slate-900": "hsl(202, 55%, 16%)",
      "Slate-1000": "hsl(202, 55%, 12%)",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
