import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        background: "#f4f6f6",
        foreground: "#1e2761",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1e2761",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1e2761",
        },
        primary: {
          DEFAULT: "#1e2761",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#89abe3",
          foreground: "#1e2761",
        },
        muted: {
          DEFAULT: "#d5dbdb",
          foreground: "#00246b",
        },
        accent: {
          DEFAULT: "#fee715",
          foreground: "#1e2761",
        },
        destructive: {
          DEFAULT: "#d4183d",
          foreground: "#ffffff",
        },
        border: "rgba(30, 39, 97, 0.1)",
        input: "transparent",
        "input-background": "#ffffff",
        "switch-background": "#d5dbdb",
        ring: "#89abe3",
        
        // Dark Mode Colors (will be applied via CSS variables)
        dark: {
          background: "#1a1a1a",
          foreground: "#e0e0e0",
          card: {
            DEFAULT: "#2a2a2a",
            foreground: "#e0e0e0",
          },
          popover: {
            DEFAULT: "#2a2a2a",
            foreground: "#e0e0e0",
          },
          primary: {
            DEFAULT: "#5c87b2",
            foreground: "#1a1a1a",
          },
          secondary: {
            DEFAULT: "#40b5ad",
            foreground: "#1a1a1a",
          },
          muted: {
            DEFAULT: "#3a3a3a",
            foreground: "#b0b0b0",
          },
          accent: {
            DEFAULT: "#ffd700",
            foreground: "#1a1a1a",
          },
          destructive: {
            DEFAULT: "#d4183d",
            foreground: "#e0e0e0",
          },
          border: "rgba(224, 224, 224, 0.1)",
          input: "#3a3a3a",
          "input-background": "#3a3a3a",
          "switch-background": "#4a4a4a",
          ring: "#5c87b2",
        },
      },
      borderRadius: {
        sm: "calc(0.625rem - 4px)",
        md: "calc(0.625rem - 2px)",
        lg: "0.625rem",
        xl: "calc(0.625rem + 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        base: "16px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

