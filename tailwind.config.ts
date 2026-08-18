import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondo/overlay siempre-oscuro (portadas, videos, placeholders).
        ink: "#0a0a0a",
        // Fondo principal del sitio (antes claro, ahora oscuro).
        paper: "#141412",
        // Texto principal sobre "paper" (antes oscuro, ahora claro).
        cream: "#f4f2e8",
        // Bordes/divisores, pensados para verse sobre fondo oscuro.
        line: "#e9e7db",
        muted: "#9a9a90",
        // Acento neón de marca.
        lime: "#d7ff3d",
        // Panel verde oscuro (sidebar de About).
        forest: "#16281f",
      },
      fontFamily: {
        // font-serif se usa en todos los títulos grandes del sitio — acá
        // apunta a la tipografía display bold en vez de una serif clásica.
        serif: ["var(--font-display)", "Arial Black", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        // font-mono se usa para labels/nav en mayúsculas — acá también
        // apunta a la sans (el diseño de referencia no usa monoespaciada).
        mono: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
