import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme, makeStyles, BorderRadius, Spacing } from '@theme/index';
import type { AppTheme } from '@theme/index';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    base: { backgroundColor: theme.colors.backgroundAlt },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      ...theme.shadows.sm,
    },
    cardRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
    cardLines: { flex: 1, gap: 6 },
    textGroup: { width: '100%' },
  })
);

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%', height = 16, borderRadius = BorderRadius.sm, style, testID,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1,   duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 750, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel="Carregando"
      style={[styles.base, { width, height, borderRadius, opacity }, style]}
    />
  );
};

export const SkeletonText: React.FC<{ lines?: number; style?: StyleProp<ViewStyle> }> = ({ lines = 3, style }) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={[styles.textGroup, style]}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 && lines > 1 ? '65%' : '100%'}
          height={14}
          style={i > 0 ? { marginTop: 8 } : undefined}
        />
      ))}
    </View>
  );
};

export const SkeletonCard: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={[styles.card, style]}>
      <View style={styles.cardRow}>
        <Skeleton width={48} height={48} borderRadius={24} />
        <View style={styles.cardLines}>
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={12} style={{ marginTop: 6 }} />
        </View>
      </View>
      <SkeletonText lines={3} style={{ marginTop: 12 }} />
    </View>
  );
};

export default Skeleton;
