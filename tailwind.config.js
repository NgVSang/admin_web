/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  purge: [],
  darkMode: false, // hoặc 'class' nếu bạn muốn kích hoạt chế độ tối dựa trên lớp CSS
  theme: {
    extend: {
      backgroundColor: {
        // 'accent-10': '#...', // Định nghĩa màu sắc cho lớp bg-accent-10
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

