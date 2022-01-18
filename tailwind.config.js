module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      height: {        
        '80': '80vh',      
      },
      maxWidth: {     
         'xxs': '250px',    
        }
    },
  },
  plugins: [],
}