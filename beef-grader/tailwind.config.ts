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
        "brandTeel": "#0F505C",
        "brandDarkTeel": "#00444D",
        "brandLimeGreen": "#78C71C",
        "brandGray": "#707070",
        "brandLightGray": "#EAEAEA",
        "brandLightBlue": "#E8F6F8",
        "brandRed": "#9A2900",
        "brandYellow": "#FFD065",
        "brandBlue": "#99D2DD"
      },
      boxShadow: {
        '3xl': '0 1px 25px -15px rgba(0, 0, 0, 1)',
      }
    },
  },
  plugins: [],
} satisfies Config;
