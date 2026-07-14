import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useTheme, makeStyles, Spacing, BorderRadius } from '@theme/index';
import type { AppTheme } from '@theme/index';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BorderRadius.full,
      gap: Spacing.sm,
    },
    fullWidth: { width: '100%' },
    disabled: { opacity: 0.45 },

    // ─── Variantes ───────────────────────────────────────
    variant_primary: {
      backgroundColor: theme.colors.primary,
      ...theme.shadows.md,
    },
    variant_secondary: {
      backgroundColor: theme.colors.backgroundAlt,
    },
    variant_outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    variant_ghost: {
      backgroundColor: 'transparent',
    },
    variant_danger: {
      backgroundColor: theme.colors.error,
      ...theme.shadows.md,
    },

    // ─── Tamanhos ────────────────────────────────────────
    size_sm: { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md, minHeight: 36 },
    size_md: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl, minHeight: 48 },
    size_lg: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xxl, minHeight: 56 },

    // ─── Labels ──────────────────────────────────────────
    label:              { fontWeight: '700', textAlign: 'center' },
    label_primary:      { color: theme.colors.textOnPrimary },
    label_secondary:    { color: theme.colors.text },
    label_outline:      { color: theme.colors.primary },
    label_ghost:        { color: theme.colors.primary },
    label_danger:       { color: theme.colors.white },
    labelDisabled:      { opacity: 0.7 },
    labelSize_sm:       { fontSize: 13, lineHeight: 18 },
    labelSize_md:       { fontSize: 15, lineHeight: 22 },
    labelSize_lg:       { fontSize: 17, lineHeight: 24 },
  })
);

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  testID,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const isDisabled = disabled || loading;

  const spinnerColor =
    variant === 'outline' || variant === 'ghost'
      ? theme.colors.primary
      : theme.colors.white;

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        styles[`variant_${variant}` as keyof typeof styles],
        styles[`size_${size}` as keyof typeof styles],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={label}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <>
          {leftIcon}
          <Text
            style={[
              styles.label,
              styles[`label_${variant}` as keyof typeof styles],
              styles[`labelSize_${size}` as keyof typeof styles],
              isDisabled && styles.labelDisabled,
              textStyle,
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
