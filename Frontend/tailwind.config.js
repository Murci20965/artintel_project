/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "#ffffff", // Light mode background
          dark: "#00031b", // Dark mode background
        },
        foreground: {
          DEFAULT: "#000000", // Light mode text
          dark: "#ffffff", // Dark mode text
        },
        primary: {
          DEFAULT: "#00cbdd", // Light mode primary color
          dark: "#003bdd", // Dark mode primary color
        },
        secondary: {
          DEFAULT: "#007c91", // Adjusted secondary for light mode
          dark: "#004c5c", // Adjusted secondary for dark mode
        },
        accent: {
          DEFAULT: "#00a3b1", // Light mode accent
          dark: "#006d7b", // Dark mode accent
        },
        muted: {
          DEFAULT: "#f1f1f1", // Light muted background
          dark: "#1a1a2e", // Dark muted background
        },
        destructive: {
          DEFAULT: "#e3342f", // Light mode destructive
          dark: "#ff4f4f", // Dark mode destructive
        },
        popover: {
          DEFAULT: "#f9f9f9", // Light popover
          dark: "#1e1e2e", // Dark popover
        },
        card: {
          DEFAULT: "#ffffff", // Light mode card
          dark: "#121221", // Dark mode card
        },
      },
      borderRadius: {
        none: "0px", // No round edges on blocks
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": { opacity: 0.8 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "#ffffff", // Light mode background
          dark: "#00031b", // Dark mode background
        },
        foreground: {
          DEFAULT: "#000000", // Light mode text
          dark: "#ffffff", // Dark mode text
        },
        primary: {
          DEFAULT: "#00cbdd", // Light mode primary color
          dark: "#003bdd", // Dark mode primary color
        },
        secondary: {
          DEFAULT: "#007c91", // Adjusted secondary for light mode
          dark: "#004c5c", // Adjusted secondary for dark mode
        },
        accent: {
          DEFAULT: "#00a3b1", // Light mode accent
          dark: "#006d7b", // Dark mode accent
        },
        muted: {
          DEFAULT: "#f1f1f1", // Light muted background
          dark: "#1a1a2e", // Dark muted background
        },
        destructive: {
          DEFAULT: "#e3342f", // Light mode destructive
          dark: "#ff4f4f", // Dark mode destructive
        },
        popover: {
          DEFAULT: "#f9f9f9", // Light popover
          dark: "#1e1e2e", // Dark popover
        },
        card: {
          DEFAULT: "#ffffff", // Light mode card
          dark: "#121221", // Dark mode card
        },
      },
      borderRadius: {
        none: "0px", // No round edges on blocks
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": { opacity: 0.8 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

