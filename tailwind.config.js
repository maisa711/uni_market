/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#041d2a',
        'primary-btn': '#35c09b',
        'primary-btn-hover': '#40caa4',
        'secondary-btn': '#f6fef9',
        'accent': '#37ae81',
        'main-text': "#fcfcfd",
        'product-card-bg': '#112935',
      },
    },
  },
  plugins: [],
}
