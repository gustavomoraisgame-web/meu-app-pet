/**
 * Design tokens do sistema de estilos.
 * Estes valores são modo-agnósticos — usados tanto no tema claro quanto no escuro.
 */

import { Dimensions, Platform } from 'react-native';

// ─── Tela ─────────────────────────────────────────────────────────────────────
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export const Screen = {
  width: SCREEN_W,
  height: SCREEN_H,
  isSmall: SCREEN_W < 360,
  isMedium: SCREEN_W >= 360 && SCREEN_W < 414,
  isLarge: SCREEN_W >= 414,
};

// ─── Espaçamento ──────────────────────────────────────────────────────────────
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 40,
} as const;

// ─── Tipografia ───────────────────────────────────────────────────────────────
export const FontFamily = {
  regular: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
  bold: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
} as const;

export const FontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
} as const;

export const LineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const FontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

/** Escala tipográfica pronta para uso */
export const Typography = {
  h1: { fontSize: FontSize['3xl'], fontWeight: FontWeight.extrabold, lineHeight: 36 },
  h2: { fontSize: FontSize['2xl'], fontWeight: FontWeight.extrabold, lineHeight: 32 },
  h3: { fontSize: FontSize.xl,    fontWeight: FontWeight.bold,      lineHeight: 28 },
  h4: { fontSize: FontSize.lg,    fontWeight: FontWeight.bold,      lineHeight: 24 },
  body: {       fontSize: FontSize.base, fontWeight: FontWeight.regular, lineHeight: 24 },
  bodyStrong:   { fontSize: FontSize.base, fontWeight: FontWeight.bold,    lineHeight: 24 },
  label:        { fontSize: FontSize.md,   fontWeight: FontWeight.bold,    lineHeight: 20 },
  caption:      { fontSize: FontSize.sm,   fontWeight: FontWeight.regular, lineHeight: 16 },
  captionStrong:{ fontSize: FontSize.sm,   fontWeight: FontWeight.bold,    lineHeight: 16 },
  micro:        { fontSize: FontSize.xs,   fontWeight: FontWeight.regular, lineHeight: 14 },
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────
export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 9999,
} as const;

// ─── Z-index ──────────────────────────────────────────────────────────────────
export const ZIndex = {
  base: 0,
  raised: 10,
  overlay: 100,
  modal: 200,
  toast: 300,
} as const;
