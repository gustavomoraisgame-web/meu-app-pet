import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Modal,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme, makeStyles, Spacing, Typography, BorderRadius } from '@theme/index';
import type { AppTheme } from '@theme/index';

// ─── Inline spinner ───────────────────────────────────────────────────────────
interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const useSpinnerStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    container: { alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.md },
    label: { ...Typography.body, color: theme.colors.textSecondary, marginTop: Spacing.sm },
  })
);

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'large', color, label, style }) => {
  const { theme } = useTheme();
  const styles = useSpinnerStyles(theme);
  return (
    <View style={[styles.container, style]} accessibilityRole="progressbar">
      <ActivityIndicator size={size} color={color ?? theme.colors.primary} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
};

// ─── Full-screen overlay ──────────────────────────────────────────────────────
interface LoadingOverlayProps {
  visible: boolean;
  label?: string;
  useModal?: boolean;
}

const useOverlayStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      backgroundColor: theme.colors.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xxl,
      alignItems: 'center',
      gap: Spacing.md,
      ...theme.shadows.xl,
      minWidth: 140,
    },
    label: { ...Typography.label, color: theme.colors.text },
  })
);

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  label = 'Carregando...',
  useModal = true,
}) => {
  const { theme } = useTheme();
  const styles = useOverlayStyles(theme);

  const content = (
    <View style={styles.container}>
      <View style={styles.box}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        {label ? <Text style={styles.label}>{label}</Text> : null}
      </View>
    </View>
  );

  if (useModal) {
    return (
      <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
        {content}
      </Modal>
    );
  }
  if (!visible) return null;
  return content;
};

// ─── Inline row ───────────────────────────────────────────────────────────────
interface LoadingInlineProps {
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const useInlineStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.xs },
    label: { ...Typography.caption, color: theme.colors.textSecondary },
  })
);

export const LoadingInline: React.FC<LoadingInlineProps> = ({ label, style }) => {
  const { theme } = useTheme();
  const styles = useInlineStyles(theme);
  return (
    <View style={[styles.container, style]} accessibilityRole="progressbar">
      <ActivityIndicator size="small" color={theme.colors.primary} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
};

const Loading = { Spinner: LoadingSpinner, Overlay: LoadingOverlay, Inline: LoadingInline };
export default Loading;
