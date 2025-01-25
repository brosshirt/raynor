import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {  // Add this section
    themes: [
      {
        light: {
          "base-100": "#ffffff",
          "base-content": "#000000"
        }
      }
    ],
    darkTheme: "light"
  }
} satisfies Config;
