import React, { useEffect, useRef, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
  ScrollView,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, makeStyles, Spacing, Typography, BorderRadius } from '@theme/index';
import type { AppTheme } from '@theme/index';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DRAG_THRESHOLD = 80;

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  snapPoint?: number;
  dismissOnOverlay?: boolean;
  showHandle?: boolean;
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.colors.overlay },
    sheet: {
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: BorderRadius.xl,
      borderTopRightRadius: BorderRadius.xl,
      ...theme.shadows.xl,
    },
    handleZone: {
      paddingTop: Spacing.md,
      paddingBottom: Spacing.sm,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    handle: {
      width: 40, height: 4, borderRadius: 2,
      backgroundColor: theme.colors.grayMedium,
      opacity: 0.4,
      marginBottom: Spacing.sm,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: Spacing.xl,
      paddingBottom: Spacing.sm,
    },
    title: { ...Typography.h4, color: theme.colors.text, flex: 1 },
    closeBtn: {
      width: 28, height: 28, borderRadius: 14,
      backgroundColor: theme.colors.backgroundAlt,
      justifyContent: 'center', alignItems: 'center',
    },
    closeIcon: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: '700' },
    content: { flex: 1 },
    contentInner: { padding: Spacing.xl },
  })
);

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  snapPoint = 0.6,
  dismissOnOverlay = true,
  showHandle = true,
  children,
  contentStyle,
  testID,
}) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const insets = useSafeAreaInsets();
  const sheetHeight = SCREEN_HEIGHT * snapPoint;

  const translateY = useRef(new Animated.Value(sheetHeight)).current;
  const dragY = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const openSheet = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 4, speed: 14 }),
      Animated.timing(overlayOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
  }, [overlayOpacity, translateY]);

  const closeSheet = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: sheetHeight, duration: 280, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => onClose());
  }, [onClose, overlayOpacity, sheetHeight, translateY]);

  useEffect(() => {
    if (visible) {
      translateY.setValue(sheetHeight);
      dragY.setValue(0);
      openSheet();
    }
  }, [visible, openSheet, sheetHeight, translateY, dragY]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dy) > 5,
      onPanResponderMove: (_, gs) => { if (gs.dy > 0) dragY.setValue(gs.dy); },
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > DRAG_THRESHOLD || gs.vy > 0.5) {
          dragY.setValue(0);
          closeSheet();
        } else {
          Animated.spring(dragY, { toValue: 0, useNativeDriver: true, bounciness: 8 }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={closeSheet} statusBarTranslucent testID={testID}>
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={dismissOnOverlay ? closeSheet : undefined}
          accessibilityElementsHidden
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.sheet,
          { height: sheetHeight, paddingBottom: insets.bottom, transform: [{ translateY: Animated.add(translateY, dragY) }] },
        ]}
      >
        <View {...panResponder.panHandlers} style={styles.handleZone}>
          {showHandle && <View style={styles.handle} />}
          {title && (
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>{title}</Text>
              <TouchableOpacity onPress={closeSheet} style={styles.closeBtn} accessibilityLabel="Fechar" hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ScrollView style={styles.content} contentContainerStyle={[styles.contentInner, contentStyle]} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" bounces={false}>
          {children}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
