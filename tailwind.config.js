/**
 * Tailwind CSS — escopo WEB ONLY.
 *
 * O app React Native usa StyleSheet puro + src/theme/ (tokens, lightTheme, darkTheme).
 * NativeWind foi removido da configuração pois o projeto migrou para RN puro.
 *
 * Este arquivo é mantido caso a versão web (Vite) seja desenvolvida separadamente.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Escopo restrito: apenas arquivos web (não inclui src/screens, src/components, etc.)
  content: [
    './index.html',
    './src/main.jsx',
    './src/App.jsx',
    './src/App.css',
  ],
  theme: {
    extend: {
      // Espelha os tokens de src/theme/tokens.ts para consistência visual web/nativo
      colors: {
        background:     '#FFF9F2',
        'background-alt': '#F8E8DC',
        surface:        '#FFFFFF',
        primary:        '#F48FB1',
        'primary-light': '#F8BBD0',
        'primary-dark': '#C2185B',
        text:           '#6D4C41',
        'text-secondary': '#A1887F',
        'text-disabled': '#D7CCC8',
        success:        '#4CAF50',
        warning:        '#FF9800',
        error:          '#F44336',
        info:           '#2196F3',
      },
      spacing: {
        xs:   '4px',
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '20px',
        xxl:  '24px',
        xxxl: '32px',
      },
      fontSize: {
        xs:   ['11px', { lineHeight: '14px' }],
        sm:   ['12px', { lineHeight: '16px' }],
        md:   ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg:   ['18px', { lineHeight: '24px' }],
        xl:   ['20px', { lineHeight: '28px' }],
        '2xl':['24px', { lineHeight: '32px' }],
        '3xl':['28px', { lineHeight: '36px' }],
      },
      borderRadius: {
        xs:   '4px',
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '20px',
        xxl:  '28px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      fontWeight: {
        regular:   '400',
        medium:    '500',
        semibold:  '600',
        bold:      '700',
        extrabold: '800',
      },
    },
  },
  plugins: [],
};
