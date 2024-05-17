import type { Config } from "tailwindcss";
import TypeSystemPlugin from "./TypeSystemPlugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // serifs
    TypeSystemPlugin({
      default: {
        "serif-sm": {
          "font-family": "bookman-jf-pro",
          "font-size": "14px",
          "line-height": "20px",
          "letter-spacing": "-0.02em",
        },
        "serif-base": {
          "font-family": "bookman-jf-pro",
          "font-size": "16px",
          "line-height": "24px",
          "letter-spacing": "-0.02em",
        },
        "serif-md": {
          "font-family": "bookman-jf-pro",
          "font-size": "20px",
          "line-height": "28px",
          "letter-spacing": "-0.02em",
        },
        "serif-lg": {
          "font-family": "bookman-jf-pro",
          "font-size": "24px",
          "line-height": "32px",
          "letter-spacing": "-0.03em",
        },
        "serif-xl": {
          "font-family": "bookman-jf-pro",
          "font-size": "32px",
          "line-height": "36px",
          "letter-spacing": "-0.01em",
        },
        "serif-2xl": {
          "font-family": "bookman-jf-pro",
          "font-size": "44px",
          "line-height": "48px",
          "letter-spacing": "-0.01em",
        },
      },
    }),
    // sans
    TypeSystemPlugin({
      default: {
        "sans-xs": {
          "font-family": "var(--font-speedee-regular)",
          "font-size": "12px",
          "letter-spacing": "0.02em",
          "line-height": "20px",
        },
        "sans-sm": {
          "font-family": "var(--font-speedee-regular)",
          "font-size": "14px",
          "letter-spacing": "0.01em",
          "line-height": "24px",
        },
        "sans-base": {
          "font-family": "var(--font-speedee-regular)",
          "font-size": "16px",
          "letter-spacing": "0.01em",
          "line-height": "24px",
        },
      },
    }),
  ],
};
export default config;
