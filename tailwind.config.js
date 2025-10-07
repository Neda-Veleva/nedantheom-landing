/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: "#F5F0E8",
          100: "#FBF9F6",
          200: "#F5F0E8",
          300: "#EBE1D3"
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


