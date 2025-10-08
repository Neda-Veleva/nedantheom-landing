/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette tuned to the screenshot (dark navy + steel blue)
        navy: {
          900: "#0B1B2B",
          800: "#0F2436",
          700: "#132C44"
        },
        steel: {
          600: "#3E566B",
          500: "#4B6A86",
          400: "#5E7F9B"
        },
        beige: {
          DEFAULT: "#E9EFF6",
          100: "#F6FAFF",
          200: "#E9EFF6",
          300: "#DEE8F2"
        },
        brown: {
          DEFAULT: "#6B4F4F",
          600: "#5E4444",
          700: "#523C3C"
        },
        mint: {
          DEFAULT: "#A3D9A5",
          300: "#CBEED0",
          400: "#B8E4BB",
          500: "#A3D9A5"
        }
      },
      boxShadow: {
        soft: "0 10px 20px rgba(0,0,0,0.05)",
        elevated: "0 20px 60px rgba(0,0,0,0.35)",
      },
      keyframes: {
        swing: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      animation: {
        'swing-slow': 'swing 4s ease-in-out infinite',
      },
      transformOrigin: {
        'top-center': 'top center',
      },
    },
  },
  plugins: [],
};


