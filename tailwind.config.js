/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        "primary": "#0b8",
        "primary-soft": "#0b86",
        "secondary": "#853",
        "secondary-soft": "#8536",
        "ink": "#0a0a0c",
      },
      boxShadow: {
        "glow-primary": "0 0 24px -6px #0b8a, 0 0 4px -1px #0b86",
        "glow-secondary": "0 0 24px -6px #d97a3aa0, 0 0 4px -1px #85360",
        "glow-soft": "0 0 18px -8px #fff4",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
