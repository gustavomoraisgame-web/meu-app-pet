import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme, makeStyles, Spacing, BorderRadius, Typography } from '@theme/index';
import type { AppTheme } from '@theme/index';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  label?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const getBgFg = (theme: AppTheme, variant: BadgeVariant): [string, string] => {
  switch (variant) {
    case 'primary': return [theme.colors.primaryLight, theme.colors.primaryDark];
    case 'success': return [theme.colors.successLight, theme.colors.successDark];
    case 'warning': return [theme.colors.warningLight, theme.colors.warningDark];
    case 'error':   return [theme.colors.errorLight,   theme.colors.errorDark];
    case 'info':    return [theme.colors.infoLight,    theme.colors.infoDark];
    case 'neutral': return [theme.colors.backgroundAlt, theme.colors.grayDark];
  }
};

const DOT_SIZE: Record<BadgeSize, number> = { sm: 8, md: 10, lg: 14 };

const useStyles = makeStyles((_theme: AppTheme) =>
  StyleSheet.create({
    base: { borderRadius: BorderRadius.full, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' },
    size_sm: { paddingHorizontal: Spacing.sm, paddingVertical: 2, minWidth: 20 },
    size_md: { paddingHorizontal: Spacing.md, paddingVertical: 4, minWidth: 26 },
    size_lg: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xs, minWidth: 32 },
    label: { fontWeight: '700', textAlign: 'center' },
    labelSize_sm: { fontSize: 10, lineHeight: 14 },
    labelSize_md: { fontSize: 12, lineHeight: 16 },
    labelSize_lg: { fontSize: 13, lineHeight: 18 },
  })
);

export const Badge: React.FC<BadgeProps> = ({
  label, variant = 'primary', size = 'md', dot = false, style, testID,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const [bg, fg] = getBgFg(theme, variant);

  if (dot) {
    const d = DOT_SIZE[size];
    return (
      <View testID={testID} style={[{ width: d, height: d, borderRadius: d / 2, backgroundColor: bg, borderWidth: 1.5, borderColor: fg }, style]} accessibilityRole="none" />
    );
  }

  return (
    <View
      testID={testID}
      style={[styles.base, styles[`size_${size}` as keyof typeof styles] as ViewStyle, { backgroundColor: bg }, style]}
      accessibilityRole="text"
    >
      <Text style={[styles.label, styles[`labelSize_${size}` as keyof typeof styles], { color: fg }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};

export default Badge;
