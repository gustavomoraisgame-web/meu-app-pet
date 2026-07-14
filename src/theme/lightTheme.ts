import { AppTheme } from './types';
import { Spacing, Typography, BorderRadius, FontFamily } from './tokens';

export const lightTheme: AppTheme = {
  mode: 'light',

  colors: {
    // ─── Backgrounds ───────────────────────────────────────
    background:       '#FFF9F2',   // tela principal
    backgroundAlt:    '#F8E8DC',   // alternativo (cards flat, separadores)
    surface:          '#FFFFFF',   // cards, modais, sheets
    surfaceRaised:    '#FFFFFF',   // cards elevados

    // ─── Marca / Accent ────────────────────────────────────
    primary:          '#F48FB1',   // rosa principal
    primaryLight:     '#F8BBD0',   // rosa claro
    primaryDark:      '#C2185B',   // rosa escuro

    // ─── Texto ─────────────────────────────────────────────
    text:             '#6D4C41',   // texto padrão
    textSecondary:    '#A1887F',   // texto secundário
    textDisabled:     '#D7CCC8',   // texto desabilitado/placeholder
    textOnPrimary:    '#FFFFFF',   // texto sobre fundo accent

    // ─── Borders ───────────────────────────────────────────
    border:           '#F8E8DC',
    borderFocused:    '#F48FB1',
    borderError:      '#F44336',

    // ─── Estados Semânticos ────────────────────────────────
    success:          '#4CAF50',
    successLight:     '#E8F5E9',
    successDark:      '#2E7D32',
    warning:          '#FF9800',
    warningLight:     '#FFF3E0',
    warningDark:      '#E65100',
    error:            '#F44336',
    errorLight:       '#FFEBEE',
    errorDark:        '#C62828',
    info:             '#2196F3',
    infoLight:        '#E3F2FD',
    infoDark:         '#1565C0',

    // ─── Neutros ───────────────────────────────────────────
    white:            '#FFFFFF',
    black:            '#000000',
    grayLight:        '#F5F5F5',
    grayMedium:       '#A1887F',
    grayDark:         '#6D4C41',

    // ─── Overlay ───────────────────────────────────────────
    overlay:          'rgba(0,0,0,0.30)',
    overlayLight:     'rgba(0,0,0,0.10)',
    overlayDark:      'rgba(0,0,0,0.50)',
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
      shadowOpacity: 0.03,
      shadowRadius: 4,
      elevation: 1,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 20,
      elevation: 6,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.12,
      shadowRadius: 30,
      elevation: 10,
    },
  },

  spacing: Spacing,
  typography: Typography,
  borderRadius: BorderRadius,
  fontFamily: FontFamily,
};
