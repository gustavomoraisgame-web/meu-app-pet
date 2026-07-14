import React, { useState, forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme, makeStyles, Spacing, BorderRadius, Typography } from '@theme/index';
import type { AppTheme } from '@theme/index';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  hasError?: boolean;
}

const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    wrapper: { width: '100%' },
    label: { ...Typography.label, color: theme.colors.text, marginBottom: Spacing.sm },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.borderFocused,
      borderRadius: BorderRadius.md,
      backgroundColor: theme.colors.background,
      minHeight: 48,
    },
    inputRowMultiline: { alignItems: 'flex-start', minHeight: 100 },
    inputRowError: { borderColor: theme.colors.borderError },
    iconLeft:  { paddingLeft: Spacing.md, justifyContent: 'center', alignItems: 'center' },
    iconRight: { paddingRight: Spacing.md, justifyContent: 'center', alignItems: 'center' },
    iconText: { fontSize: 18 },
    input: {
      flex: 1,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
      ...Typography.body,
      color: theme.colors.text,
    },
    inputWithLeftIcon:  { paddingLeft: Spacing.sm },
    inputWithRightIcon: { paddingRight: Spacing.sm },
    inputMultiline: { paddingTop: Spacing.md, minHeight: 96 },
    errorText: { ...Typography.caption, color: theme.colors.error, marginTop: Spacing.xs, marginLeft: Spacing.xs },
    hintText:  { ...Typography.caption, color: theme.colors.textSecondary, marginTop: Spacing.xs, marginLeft: Spacing.xs },
  })
);

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      isPassword = false,
      containerStyle,
      hasError = false,
      multiline = false,
      ...textInputProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useStyles(theme);
    const [secureVisible, setSecureVisible] = useState(false);
    const showError = !!error || hasError;

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label ? <Text style={styles.label}>{label}</Text> : null}

        <View
          style={[
            styles.inputRow,
            multiline && styles.inputRowMultiline,
            showError && styles.inputRowError,
          ]}
        >
          {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}

          <TextInput
            ref={ref}
            style={[
              styles.input,
              leftIcon ? styles.inputWithLeftIcon : null,
              (isPassword || rightIcon) ? styles.inputWithRightIcon : null,
              multiline && styles.inputMultiline,
            ]}
            placeholderTextColor={theme.colors.textDisabled}
            secureTextEntry={isPassword && !secureVisible}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
            accessibilityLabel={label}
            {...textInputProps}
          />

          {isPassword ? (
            <TouchableOpacity
              style={styles.iconRight}
              onPress={() => setSecureVisible((v) => !v)}
              accessibilityLabel={secureVisible ? 'Ocultar senha' : 'Mostrar senha'}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.iconText}>{secureVisible ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          ) : rightIcon ? (
            <View style={styles.iconRight}>{rightIcon}</View>
          ) : null}
        </View>

        {error ? (
          <Text style={styles.errorText} accessibilityRole="alert">{error}</Text>
        ) : hint ? (
          <Text style={styles.hintText}>{hint}</Text>
        ) : null}
      </View>
    );
  }
);

Input.displayName = 'Input';
export default Input;
