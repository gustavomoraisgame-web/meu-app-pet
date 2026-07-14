/**
 * Ponto de entrada único do sistema de estilos.
 *
 * Importação recomendada nos componentes:
 *   import { useTheme, makeStyles, Spacing, BorderRadius } from '@theme/index';
 */

// ─── Tokens (valores fixos, modo-agnósticos) ──────────────────────────────────
export {
  Screen,
  Spacing,
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  Typography,
  BorderRadius,
  ZIndex,
} from './tokens';

// ─── Tipos ────────────────────────────────────────────────────────────────────
export type {
  AppTheme,
  ColorPalette,
  ShadowStyle,
  ShadowScale,
  ThemeContextValue,
} from './types';

// ─── Temas concretos ──────────────────────────────────────────────────────────
export { lightTheme } from './lightTheme';
export { darkTheme } from './darkTheme';

// ─── Context + hook ───────────────────────────────────────────────────────────
export { ThemeProvider, ThemeContext, useTheme } from './ThemeContext';

// ─── Utilitários de estilo ────────────────────────────────────────────────────
export {
  createShadow,
  hitSlop,
  rs,
  vs,
  makeStyles,
  absoluteFill,
  centered,
  row,
  flexSpacer,
  safeBottomPadding,
  gapY,
  gapX,
} from './styleUtils';

// ─── Atalhos retrocompatíveis (usado nos componentes já criados) ───────────────
// Componentes das etapas 5 e 6 importam Colors, Spacing, Typography, BorderRadius
// diretamente de '@theme/index'. Exportamos aliases para não quebrar nada.
import { lightTheme } from './lightTheme';

/** @deprecated Prefira useTheme().theme.colors para suporte a dark mode */
export const Colors = lightTheme.colors;

/** Re-exportado de tokens — sem mudança de API */
// Spacing, Typography, BorderRadius já estão exportados acima via tokens
