import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Spacing, Typography, BorderRadius } from '@theme/index';

// ─── Tipos ────────────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

interface ToastConfig {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  action?: { label: string; onPress: () => void };
}

interface ToastContextValue {
  show: (config: Omit<ToastConfig, 'id'>) => void;
  hide: (id: string) => void;
  success: (message: string, duration?: number) => void;
  error:   (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info:    (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast deve ser usado dentro de ToastProvider');
  return ctx;
};

// ─── Cores por tipo ───────────────────────────────────────────────────────────
const ICON: Record<ToastType, string> = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

// ─── Item individual ─────────────────────────────────────────────────────────
interface ToastItemProps extends ToastConfig {
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({
  id, message, type = 'info', duration = 3500, position = 'top', action, onDismiss,
}) => {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(position === 'top' ? -80 : 80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const bgColor: Record<ToastType, string> = {
    success: theme.colors.successDark,
    error:   theme.colors.errorDark,
    warning: theme.colors.warningDark,
    info:    theme.colors.infoDark,
  };

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: position === 'top' ? -80 : 80, duration: 250, useNativeDriver: true }),
      Animated.timing(opacity,    { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => onDismiss(id));
  }, [id, opacity, onDismiss, position, translateY]);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 6, speed: 12 }),
      Animated.timing(opacity,    { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [dismiss, duration, opacity, translateY]);

  return (
    <Animated.View
      style={[
        styles.item,
        { backgroundColor: bgColor[type], opacity, transform: [{ translateY }] },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Text style={styles.itemIcon}>{ICON[type]}</Text>
      <Text style={styles.itemMessage} numberOfLines={3}>{message}</Text>
      <View style={styles.itemActions}>
        {action && (
          <TouchableOpacity onPress={() => { action.onPress(); dismiss(); }} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={dismiss} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// ─── Provider ────────────────────────────────────────────────────────────────
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);
  const insets = useSafeAreaInsets();

  const show = useCallback((config: Omit<ToastConfig, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev.slice(-2), { ...config, id }]);
  }, []);

  const hide = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((message: string, duration?: number) => show({ message, type: 'success', duration }), [show]);
  const error   = useCallback((message: string, duration?: number) => show({ message, type: 'error',   duration }), [show]);
  const warning = useCallback((message: string, duration?: number) => show({ message, type: 'warning', duration }), [show]);
  const info    = useCallback((message: string, duration?: number) => show({ message, type: 'info',    duration }), [show]);

  const topToasts    = toasts.filter((t) => (t.position ?? 'top') === 'top');
  const bottomToasts = toasts.filter((t) => t.position === 'bottom');

  return (
    <ToastContext.Provider value={{ show, hide, success, error, warning, info }}>
      {children}
      <View style={[styles.container, { top: insets.top + Spacing.sm }]} pointerEvents="box-none">
        {topToasts.map((t) => <ToastItem key={t.id} {...t} onDismiss={hide} />)}
      </View>
      <View style={[styles.container, { bottom: insets.bottom + Spacing.lg }]} pointerEvents="box-none">
        {bottomToasts.map((t) => <ToastItem key={t.id} {...t} onDismiss={hide} />)}
      </View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    zIndex: 9999,
    gap: Spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  itemIcon:    { fontSize: 18 },
  itemMessage: { ...Typography.label, color: '#fff', flex: 1, lineHeight: 18 },
  itemActions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  actionLabel: { ...Typography.captionStrong, color: '#fff', textDecorationLine: 'underline' },
  closeIcon:   { fontSize: 14, color: '#fff', fontWeight: '700', opacity: 0.8 },
});

export default ToastProvider;
