import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useTheme, makeStyles, Spacing, BorderRadius } from '@theme/index';
import type { AppTheme } from '@theme/index';

export type CardVariant = 'default' | 'elevated' | 'flat' | 'outlined';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    base: {
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      backgroundColor: theme.colors.surface,
    },
    variant_default: { ...theme.shadows.sm },
    variant_elevated: { ...theme.shadows.lg },
    variant_flat: {
      backgroundColor: theme.colors.backgroundAlt,
      ...theme.shadows.none,
    },
    variant_outlined: {
      ...theme.shadows.none,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
    },
  })
);

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  onPress,
  style,
  contentStyle,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);

  const containerStyle = [
    styles.base,
    styles[`variant_${variant}` as keyof typeof styles],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        activeOpacity={0.75}
        style={containerStyle}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
      >
        <View style={contentStyle}>{children}</View>
      </TouchableOpacity>
    );
  }

  return (
    <View testID={testID} style={containerStyle}>
      <View style={contentStyle}>{children}</View>
    </View>
  );
};

export default Card;
