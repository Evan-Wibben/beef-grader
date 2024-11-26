import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      "colors": {
        // custom color pallet generated here: https://www.tints.dev/brand/4DD3FF
        "brandGreen": "#5a822b",
        "brandBrown": "#797370",
        "brandGray": "#566268",
        "brandLightGreen": "#f7f8f3",
      }
    },
  },
  plugins: [],
} satisfies Config;
