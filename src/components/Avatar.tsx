import React from 'react';
import { View, Text, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme, makeStyles } from '@theme/index';
import type { AppTheme } from '@theme/index';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

const SIZE_MAP: Record<AvatarSize, number> = { xs: 28, sm: 36, md: 48, lg: 64, xl: 80 };
const FONT_MAP: Record<AvatarSize, number> = { xs: 11, sm: 14, md: 18, lg: 24, xl: 30 };

const STATUS_COLOR = (theme: AppTheme): Record<AvatarStatus, string> => ({
  online:  theme.colors.success,
  offline: theme.colors.grayMedium,
  away:    theme.colors.warning,
  busy:    theme.colors.error,
});

const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    wrapper: { position: 'relative' },
    circle: {
      backgroundColor: theme.colors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      overflow: 'hidden',
    },
    initials: { fontWeight: '700', color: theme.colors.primaryDark, lineHeight: undefined },
    statusDot: { position: 'absolute', borderWidth: 2, borderColor: theme.colors.surface },
  })
);

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

interface AvatarProps {
  uri?: string;
  name?: string;
  emoji?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri, name, emoji = '🌸', size = 'md', status, style, testID,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const dimension = SIZE_MAP[size];
  const fontSize = FONT_MAP[size];
  const statusSize = Math.max(10, Math.round(dimension * 0.25));
  const statusColors = STATUS_COLOR(theme);

  return (
    <View style={[styles.wrapper, style]} testID={testID} accessibilityRole="image" accessibilityLabel={name ?? 'Avatar'}>
      <View style={[styles.circle, { width: dimension, height: dimension, borderRadius: dimension / 2 }]}>
        {uri ? (
          <Image source={{ uri }} style={{ width: dimension, height: dimension, borderRadius: dimension / 2 }} resizeMode="cover" />
        ) : name ? (
          <Text style={[styles.initials, { fontSize }]}>{getInitials(name)}</Text>
        ) : (
          <Text style={{ fontSize: fontSize * 0.9 }}>{emoji}</Text>
        )}
      </View>

      {status && (
        <View style={[
          styles.statusDot,
          {
            width: statusSize, height: statusSize,
            borderRadius: statusSize / 2,
            backgroundColor: statusColors[status],
            bottom: 0, right: 0,
          },
        ]} />
      )}
    </View>
  );
};

export default Avatar;
