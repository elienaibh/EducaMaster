/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Cores principais
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c1ff',
          300: '#66a3ff',
          400: '#3384ff',
          500: '#0066ff', // Cor principal
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        // Cores secundárias
        secondary: {
          50: '#fff2e6',
          100: '#ffe6cc',
          200: '#ffc999',
          300: '#ffad66',
          400: '#ff9033',
          500: '#ff7400', // Cor secundária
          600: '#cc5d00',
          700: '#994600',
          800: '#662e00',
          900: '#331700',
        },
        // Cores de sucesso
        success: {
          50: '#e6ffec',
          100: '#ccffd9',
          200: '#99ffb3',
          300: '#66ff8c',
          400: '#33ff66',
          500: '#00ff40', // Cor de sucesso
          600: '#00cc33',
          700: '#009926',
          800: '#00661a',
          900: '#00330d',
        },
        // Cores de perigo
        danger: {
          50: '#ffe6e6',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#ff0000', // Cor de perigo
          600: '#cc0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
        // Cores de aviso
        warning: {
          50: '#fffbe6',
          100: '#fff7cc',
          200: '#ffef99',
          300: '#ffe766',
          400: '#ffdf33',
          500: '#ffd700', // Cor de aviso
          600: '#ccac00',
          700: '#998100',
          800: '#665600',
          900: '#332b00',
        },
        // Cores neutras
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Cores do Boss
        boss: {
          health: '#ff0000',
          armor: '#3366ff',
          energy: '#ffcc00',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'button': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dropdown': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'floating': 'floating 3s ease-in-out infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}