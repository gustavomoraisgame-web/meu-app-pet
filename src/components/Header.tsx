import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme, makeStyles, Spacing, Typography } from '@theme/index';
import type { AppTheme } from '@theme/index';

interface HeaderAction {
  icon: React.ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
}

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showDrawer?: boolean;
  leftAction?: HeaderAction;
  rightActions?: HeaderAction[];
  style?: StyleProp<ViewStyle>;
  withSafeArea?: boolean;
}

const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      minHeight: 56,
    },
    side: { width: 48, alignItems: 'flex-start', justifyContent: 'center' },
    sideRight: { alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end', gap: Spacing.xs },
    center: { flex: 1, alignItems: 'center' },
    title: { ...Typography.h4, color: theme.colors.text },
    subtitle: { ...Typography.caption, color: theme.colors.textSecondary, marginTop: 2 },
    iconBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 18 },
    iconText: { fontSize: 20, color: theme.colors.text },
  })
);

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  showDrawer = false,
  leftAction,
  rightActions,
  style,
  withSafeArea = true,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleLeft = () => {
    if (leftAction) { leftAction.onPress(); return; }
    if (showBack) { navigation.goBack(); return; }
    if (showDrawer) { (navigation as any).getParent('Drawer')?.openDrawer(); }
  };

  const showLeftBtn = !!(leftAction || showBack || showDrawer);
  const leftIcon = leftAction?.icon ?? (showBack ? '←' : '☰');

  return (
    <View
      style={[
        styles.container,
        withSafeArea && { paddingTop: insets.top + Spacing.sm },
        style,
      ]}
    >
      <View style={styles.side}>
        {showLeftBtn && (
          <TouchableOpacity
            onPress={handleLeft}
            style={styles.iconBtn}
            accessibilityLabel={leftAction?.accessibilityLabel ?? (showBack ? 'Voltar' : 'Abrir menu')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {typeof leftIcon === 'string'
              ? <Text style={styles.iconText}>{leftIcon}</Text>
              : leftIcon}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}
      </View>

      <View style={[styles.side, styles.sideRight]}>
        {rightActions?.map((action, i) => (
          <TouchableOpacity
            key={i}
            onPress={action.onPress}
            style={styles.iconBtn}
            accessibilityLabel={action.accessibilityLabel}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {action.icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Header;
