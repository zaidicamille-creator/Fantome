import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        creme: "#F6F0E4",
        creme2: "#EDE4D1",
        encre: "#1B1A17",
        brule: "#C2410C",
      },
      fontFamily: {
        titre: ["var(--font-fraunces)", "Georgia", "serif"],
        texte: ["var(--font-dmsans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
