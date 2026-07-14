import { AppTheme } from './types';
import { Spacing, Typography, BorderRadius, FontFamily } from './tokens';

export const darkTheme: AppTheme = {
  mode: 'dark',

  colors: {
    // ─── Backgrounds ───────────────────────────────────────
    background:       '#1A1218',   // base muito escura com toque rosado
    backgroundAlt:    '#231820',   // alternativo levemente mais claro
    surface:          '#2C2028',   // cards, modais
    surfaceRaised:    '#352830',   // cards elevados

    // ─── Marca / Accent ────────────────────────────────────
    primary:          '#F48FB1',   // mantém o rosa — funciona bem no escuro
    primaryLight:     '#3D1F2B',   // rosa muito escuro para fundos de badge
    primaryDark:      '#F8BBD0',   // inverte: mais claro para contraste no dark

    // ─── Texto ─────────────────────────────────────────────
    text:             '#F0E6E0',   // creme claro — leitura confortável
    textSecondary:    '#C4A59D',   // marrom claro
    textDisabled:     '#5C4A48',   // discreto
    textOnPrimary:    '#1A1218',   // texto sobre botão accent

    // ─── Borders ───────────────────────────────────────────
    border:           '#3D2C34',
    borderFocused:    '#F48FB1',
    borderError:      '#EF9A9A',

    // ─── Estados Semânticos ────────────────────────────────
    success:          '#81C784',
    successLight:     '#1B2E1C',
    successDark:      '#A5D6A7',
    warning:          '#FFB74D',
    warningLight:     '#2E2010',
    warningDark:      '#FFCC80',
    error:            '#EF9A9A',
    errorLight:       '#2E1212',
    errorDark:        '#FFCDD2',
    info:             '#64B5F6',
    infoLight:        '#0D1E35',
    infoDark:         '#90CAF9',

    // ─── Neutros ───────────────────────────────────────────
    white:            '#FFFFFF',
    black:            '#000000',
    grayLight:        '#2C2028',
    grayMedium:       '#8C7B80',
    grayDark:         '#C4A59D',

    // ─── Overlay ───────────────────────────────────────────
    overlay:          'rgba(0,0,0,0.60)',
    overlayLight:     'rgba(0,0,0,0.30)',
    overlayDark:      'rgba(0,0,0,0.80)',
  },

  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    xs: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 1,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.30,
      shadowRadius: 8,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.40,
      shadowRadius: 20,
      elevation: 6,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.50,
      shadowRadius: 30,
      elevation: 10,
    },
  },

  spacing: Spacing,
  typography: Typography,
  borderRadius: BorderRadius,
  fontFamily: FontFamily,
};
