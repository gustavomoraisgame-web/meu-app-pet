import { StyleSheet, Dimensions, Platform, ViewStyle } from 'react-native';
import { ShadowStyle } from './types';
import { Spacing, Screen } from './tokens';

// ─── Sombra cross-platform ────────────────────────────────────────────────────
/**
 * Cria objeto de sombra compatível com iOS (shadow*) e Android (elevation).
 *
 * @example
 * const style = createShadow({ color: '#000', offset: { w: 0, h: 4 }, opacity: 0.08, radius: 12, elevation: 4 })
 */
export const createShadow = (s: ShadowStyle): ShadowStyle => s;

// ─── Hit slop padrão ─────────────────────────────────────────────────────────
/**
 * Gera um hitSlop uniforme para aumentar a área de toque.
 * Padrão recomendado pela Apple HIG: mínimo 44×44 pontos.
 */
export const hitSlop = (size: number = 8) => ({
  top: size,
  bottom: size,
  left: size,
  right: size,
});

// ─── Tamanho responsivo ───────────────────────────────────────────────────────
const BASE_WIDTH = 375; // iPhone SE / base de design

/**
 * Escala um valor numérico proporcionalmente à largura da tela.
 * @param size Tamanho no design base (375px)
 * @param min Valor mínimo (evita ficar pequeno demais)
 * @param max Valor máximo (evita ficar grande demais)
 */
export const rs = (size: number, min?: number, max?: number): number => {
  const scaled = (Screen.width / BASE_WIDTH) * size;
  if (min !== undefined && scaled < min) return min;
  if (max !== undefined && scaled > max) return max;
  return Math.round(scaled);
};

/**
 * Escala vertical (baseado na altura).
 */
export const vs = (size: number, min?: number, max?: number): number => {
  const BASE_HEIGHT = 812;
  const scaled = (Screen.height / BASE_HEIGHT) * size;
  if (min !== undefined && scaled < min) return min;
  if (max !== undefined && scaled > max) return max;
  return Math.round(scaled);
};

// ─── makeStyles ───────────────────────────────────────────────────────────────
/**
 * Factory de estilos que recebe o tema e retorna um StyleSheet.
 * Uso:
 *   const useStyles = makeStyles((theme) => ({ ... }));
 *   // dentro do componente:
 *   const styles = useStyles(theme);
 *
 * @example
 * const useStyles = makeStyles((theme) => ({
 *   container: { backgroundColor: theme.colors.background },
 * }));
 */
export const makeStyles = <T extends StyleSheet.NamedStyles<T>>(
  factory: (theme: import('./types').AppTheme) => T
) => {
  const cache = new Map<string, T>();
  return (theme: import('./types').AppTheme): T => {
    const key = theme.mode;
    if (cache.has(key)) return cache.get(key)!;
    const styles = StyleSheet.create(factory(theme));
    cache.set(key, styles);
    return styles;
  };
};

// ─── Utilitários de layout ────────────────────────────────────────────────────
/** Estilo absoluto cobrindo todo o pai */
export const absoluteFill: ViewStyle = StyleSheet.absoluteFillObject;

/** Flex 1 centrado */
export const centered: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

/** Row centrado */
export const row: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

/** Separador horizontal */
export const flexSpacer: ViewStyle = { flex: 1 };

// ─── Padding seguro para bottom ───────────────────────────────────────────────
/** Extra padding iOS para evitar que conteúdo fique sob a home indicator */
export const safeBottomPadding: ViewStyle = {
  paddingBottom: Platform.OS === 'ios' ? Spacing.xl : Spacing.md,
};

// ─── Gap polyfill (RN <0.71 não suporta gap) ─────────────────────────────────
/**
 * Aplica marginBottom em todos os filhos exceto o último.
 * Use quando `gap` não estiver disponível.
 * @example gapY(8) → { marginBottom: 8 }
 */
export const gapY = (size: number): ViewStyle => ({ marginBottom: size });
export const gapX = (size: number): ViewStyle => ({ marginRight: size });
