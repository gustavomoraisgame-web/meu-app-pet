import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme, makeStyles, Spacing, Typography, BorderRadius } from '@theme/index';
import type { AppTheme } from '@theme/index';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  size?: ModalSize;
  dismissOnOverlay?: boolean;
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.xl,
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: BorderRadius.xl,
      overflow: 'hidden',
      width: '100%',
      ...theme.shadows.xl,
    },
    size_sm:   { maxHeight: '40%' },
    size_md:   { maxHeight: '60%' },
    size_lg:   { maxHeight: '80%' },
    size_full: { maxHeight: '95%' },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: { ...Typography.h4, color: theme.colors.text, flex: 1, marginRight: Spacing.md },
    closeBtn: {
      width: 32, height: 32, borderRadius: 16,
      backgroundColor: theme.colors.backgroundAlt,
      justifyContent: 'center', alignItems: 'center',
    },
    closeIcon: { fontSize: 14, color: theme.colors.textSecondary, fontWeight: '700' },
    body: { flexShrink: 1 },
    bodyContent: { padding: Spacing.xl },
    footer: {
      padding: Spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      gap: Spacing.sm,
    },
  })
);

export const AppModal: React.FC<AppModalProps> = ({
  visible,
  onClose,
  title,
  footer,
  size = 'md',
  dismissOnOverlay = true,
  children,
  contentStyle,
  testID,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      testID={testID}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={dismissOnOverlay ? onClose : undefined}
          accessibilityElementsHidden
        />
        <View style={[styles.container, styles[`size_${size}` as keyof typeof styles] as ViewStyle]}>
          {title !== undefined && (
            <View style={styles.header}>
              <Text style={styles.title} numberOfLines={2}>{title}</Text>
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeBtn}
                accessibilityLabel="Fechar modal"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          <ScrollView
            style={styles.body}
            contentContainerStyle={[styles.bodyContent, contentStyle]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AppModal;
