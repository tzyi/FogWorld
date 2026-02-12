/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#252525',
        card: '#ffffff',
        'card-foreground': '#252525',
        primary: '#030213',
        'primary-foreground': '#ffffff',
        secondary: '#f3f3f5',
        'secondary-foreground': '#030213',
        muted: '#ececf0',
        'muted-foreground': '#717182',
        accent: '#e9ebef',
        'accent-foreground': '#030213',
        destructive: '#d4183d',
        'destructive-foreground': '#ffffff',
        border: '#e5e5e5',
        input: '#f3f3f5',
      },
      borderRadius: {
        'lg': '10px',
        'md': '8px',
        'sm': '6px',
      },
    },
  },
  plugins: [],
}
