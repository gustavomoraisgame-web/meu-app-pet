import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme, makeStyles, Spacing, Typography } from '@theme/index';
import type { AppTheme } from '@theme/index';

interface ListItemProps {
  leftContent?: React.ReactNode;
  label: string;
  sublabel?: string;
  rightContent?: React.ReactNode;
  onPress?: () => void;
  divider?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      minHeight: 52,
      justifyContent: 'center',
    },
    containerDisabled: { opacity: 0.45 },
    divider: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
    left: { justifyContent: 'center', alignItems: 'center', minWidth: 32 },
    textBlock: { flex: 1, justifyContent: 'center' },
    label: { ...Typography.body, color: theme.colors.text },
    labelDisabled: { color: theme.colors.textSecondary },
    sublabel: { ...Typography.caption, color: theme.colors.textSecondary, marginTop: 2 },
    right: { justifyContent: 'center', alignItems: 'flex-end', minWidth: 24 },
    chevron: { fontSize: 20, color: theme.colors.grayMedium, lineHeight: 24 },
  })
);

export const ListItem: React.FC<ListItemProps> = ({
  leftContent, label, sublabel, rightContent, onPress, divider = false, disabled = false, style, testID,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);

  const inner = (
    <View style={styles.row}>
      {leftContent ? <View style={styles.left}>{leftContent}</View> : null}
      <View style={styles.textBlock}>
        <Text style={[styles.label, disabled && styles.labelDisabled]} numberOfLines={1}>{label}</Text>
        {sublabel ? <Text style={styles.sublabel} numberOfLines={2}>{sublabel}</Text> : null}
      </View>
      {rightContent ? (
        <View style={styles.right}>{rightContent}</View>
      ) : onPress ? (
        <View style={styles.right}><Text style={styles.chevron}>›</Text></View>
      ) : null}
    </View>
  );

  return (
    <View testID={testID} style={[divider && styles.divider, style]}>
      {onPress ? (
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          activeOpacity={0.65}
          accessibilityRole="button"
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          style={[styles.container, disabled && styles.containerDisabled]}
        >
          {inner}
        </TouchableOpacity>
      ) : (
        <View style={[styles.container, disabled && styles.containerDisabled]}>{inner}</View>
      )}
    </View>
  );
};

export default ListItem;
