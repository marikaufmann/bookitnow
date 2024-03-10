/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        headerbg: "#1F2D5A",
        bg: "#FDFDFD",
        primary: "#2F76DB",
        title: "#263141",
        secondary: "#474F5A",
        mutedbgblue: "#F2F5F9",
        mutedbggray: "#DDE3EB",
        mutedtext: "#A1ABB9",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    // container: {
    //   padding: {
    //     md: "2rem",
    //   },
    // },
  },
  plugins: [],
};
