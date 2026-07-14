import { Spacing, Typography, BorderRadius, FontFamily } from './tokens';

// ─── Sombra tipada ────────────────────────────────────────────────────────────
export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export type ShadowScale = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ─── Paleta de cores ──────────────────────────────────────────────────────────
export interface ColorPalette {
  // Backgrounds
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceRaised: string;

  // Marca
  primary: string;
  primaryLight: string;
  primaryDark: string;

  // Texto
  text: string;
  textSecondary: string;
  textDisabled: string;
  textOnPrimary: string;

  // Borders
  border: string;
  borderFocused: string;
  borderError: string;

  // Semânticos
  success: string;
  successLight: string;
  successDark: string;
  warning: string;
  warningLight: string;
  warningDark: string;
  error: string;
  errorLight: string;
  errorDark: string;
  info: string;
  infoLight: string;
  infoDark: string;

  // Neutros
  white: string;
  black: string;
  grayLight: string;
  grayMedium: string;
  grayDark: string;

  // Overlay
  overlay: string;
  overlayLight: string;
  overlayDark: string;
}

// ─── Tema completo ────────────────────────────────────────────────────────────
export interface AppTheme {
  mode: 'light' | 'dark';
  colors: ColorPalette;
  shadows: Record<ShadowScale, ShadowStyle>;
  spacing: typeof Spacing;
  typography: typeof Typography;
  borderRadius: typeof BorderRadius;
  fontFamily: typeof FontFamily;
}

// ─── Contexto ─────────────────────────────────────────────────────────────────
export interface ThemeContextValue {
  theme: AppTheme;
  isDark: boolean;
  /** Alterna entre claro e escuro */
  toggleTheme: () => void;
  /** Define explicitamente */
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  themeMode: 'light' | 'dark' | 'system';
}
