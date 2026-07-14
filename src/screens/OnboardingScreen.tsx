/**
 * OnboardingScreen
 *
 * Fluxo:
 *  1. Usuário preenche nome, aniversário e signo
 *  2. Cada campo valida ao perder foco (onBlur)
 *  3. Submit valida tudo de uma vez via validarPerfil
 *  4. atualizarPerfil() persiste no AsyncStorage
 *  5. RootNavigator detecta perfil !== null e redireciona automaticamente
 */

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePerfil } from '@hooks/index';
import { useForm } from '@hooks/index';
import { useTheme, makeStyles, Spacing, Typography, BorderRadius } from '@theme/index';
import type { AppTheme } from '@theme/index';

import { Input } from '@components/index';
import { Button } from '@components/index';

import { ZODIAC_SIGNS } from '@constants/index';
import {
  validarNomeComMensagem,
  validarDataComMensagem,
} from '@utils/validations';

import type { Signo } from '@types/index';
import type { RootStackScreenProps } from '@types/navigation';

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Props = RootStackScreenProps<'Onboarding'>;

interface OnboardingForm {
  nome: string;
  aniversario: string;
  signo: Signo | '';
}

// ─── Estilos ─────────────────────────────────────────────────────────────────
const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    container:     { flex: 1, backgroundColor: theme.colors.background },
    scrollContent: { flexGrow: 1, justifyContent: 'center', padding: Spacing.xl },

    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: BorderRadius.xxl,
      padding: Spacing.xxl,
      alignItems: 'center',
      ...theme.shadows.md,
    },

    heroIcon:  { fontSize: 56, marginBottom: Spacing.lg },
    title:     { ...Typography.h1, color: theme.colors.text, marginBottom: Spacing.sm, textAlign: 'center' },
    subtitle:  { ...Typography.body, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xxl },

    fieldGroup: { width: '100%', marginBottom: Spacing.lg },

    // ─── Picker de signo ─────────────────────────────────────────────
    pickerTrigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 2,
      borderColor: theme.colors.borderFocused,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      backgroundColor: theme.colors.background,
      minHeight: 48,
    },
    pickerTriggerError: {
      borderColor: theme.colors.borderError,
    },
    pickerTriggerText: { ...Typography.body, color: theme.colors.text },
    pickerTriggerPlaceholder: { ...Typography.body, color: theme.colors.textDisabled },
    pickerChevron: { fontSize: 16, color: theme.colors.textSecondary },

    pickerDropdown: {
      marginTop: Spacing.xs,
      borderWidth: 2,
      borderColor: theme.colors.borderFocused,
      borderRadius: BorderRadius.md,
      backgroundColor: theme.colors.surface,
      maxHeight: 220,
      overflow: 'hidden',
      ...theme.shadows.sm,
    },
    pickerItem: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    pickerItemSelected: { backgroundColor: theme.colors.primaryLight },
    pickerItemText:         { ...Typography.body, color: theme.colors.text },
    pickerItemTextSelected: { ...Typography.bodyStrong, color: theme.colors.primaryDark },
    pickerErrorText: {
      ...Typography.caption,
      color: theme.colors.error,
      marginTop: Spacing.xs,
      marginLeft: Spacing.xs,
    },
    pickerLabel: {
      ...Typography.label,
      color: theme.colors.text,
      marginBottom: Spacing.sm,
    },

    // ─── Botão ───────────────────────────────────────────────────────
    buttonWrapper: { width: '100%', marginTop: Spacing.md },

    // ─── Rodapé / hint ────────────────────────────────────────────────
    footerHint: {
      ...Typography.caption,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: Spacing.lg,
    },
  })
);

// ─── Componente ───────────────────────────────────────────────────────────────
const OnboardingScreen: React.FC<Props> = () => {
  const { atualizarPerfil } = usePerfil();
  const { theme } = useTheme();
  const styles = useStyles(theme);

  // useForm gerencia valores, touched e erros
  const { values, touched, errors, handleChange, handleBlur, setFieldError } =
    useForm<OnboardingForm>({ nome: '', aniversario: '', signo: '' });

  const [loading, setLoading] = useState(false);
  const [showSignoPicker, setShowSignoPicker] = useState(false);

  // ─── Validação por campo ────────────────────────────────────────────
  const validateNome = useCallback(() => {
    const result = validarNomeComMensagem(values.nome);
    if (!result.valid) setFieldError('nome', result.message ?? 'Nome inválido');
    else setFieldError('nome', '');
  }, [values.nome, setFieldError]);

  const validateAniversario = useCallback(() => {
    if (!values.aniversario) return; // opcional — não bloqueia submit
    const result = validarDataComMensagem(values.aniversario);
    if (!result.valid) setFieldError('aniversario', result.message ?? 'Data inválida');
    else setFieldError('aniversario', '');
  }, [values.aniversario, setFieldError]);

  const validateSigno = useCallback((): boolean => {
    if (!values.signo) {
      setFieldError('signo', 'Escolha seu signo');
      return false;
    }
    setFieldError('signo', '');
    return true;
  }, [values.signo, setFieldError]);

  // ─── Submit ─────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    // Dispara validação em todos os campos
    const nomeResult = validarNomeComMensagem(values.nome);
    if (!nomeResult.valid) {
      setFieldError('nome', nomeResult.message ?? 'Nome inválido');
      handleBlur('nome');
      return;
    }
    if (values.aniversario) {
      const dataResult = validarDataComMensagem(values.aniversario);
      if (!dataResult.valid) {
        setFieldError('aniversario', dataResult.message ?? 'Data inválida');
        handleBlur('aniversario');
        return;
      }
    }
    if (!validateSigno()) return;

    setLoading(true);
    try {
      await atualizarPerfil({
        nome: values.nome.trim(),
        aniversario: values.aniversario,
        signo: values.signo as Signo,
      });
      // RootNavigator redireciona automaticamente quando perfil !== null
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────
  const selectedSigno = ZODIAC_SIGNS.find((s) => s.value === values.signo);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Hero */}
          <Text style={styles.heroIcon}>✨</Text>
          <Text style={styles.title}>Bem-vinda!</Text>
          <Text style={styles.subtitle}>
            Vamos preparar o seu cantinho especial.
          </Text>

          {/* Campo: Nome */}
          <View style={styles.fieldGroup}>
            <Input
              label="Como quer ser chamada? 🌷"
              placeholder="Ex: Florzinha"
              value={values.nome}
              onChangeText={(v) => handleChange('nome', v)}
              onBlur={() => {
                handleBlur('nome');
                validateNome();
              }}
              error={touched.nome ? errors.nome : undefined}
              autoCapitalize="words"
              returnKeyType="next"
              autoCorrect={false}
            />
          </View>

          {/* Campo: Aniversário */}
          <View style={styles.fieldGroup}>
            <Input
              label="Quando é o seu aniversário? 🎂"
              placeholder="DD/MM/AAAA"
              value={values.aniversario}
              onChangeText={(v) => handleChange('aniversario', v)}
              onBlur={() => {
                handleBlur('aniversario');
                validateAniversario();
              }}
              error={touched.aniversario ? errors.aniversario : undefined}
              hint="Campo opcional"
              keyboardType={
                Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'
              }
              returnKeyType="next"
            />
          </View>

          {/* Campo: Signo — picker customizado */}
          <View style={styles.fieldGroup}>
            <Text style={styles.pickerLabel}>Qual o seu signo? 🔮</Text>

            <TouchableOpacity
              style={[
                styles.pickerTrigger,
                touched.signo && errors.signo
                  ? styles.pickerTriggerError
                  : null,
              ]}
              onPress={() => setShowSignoPicker((v) => !v)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Selecionar signo"
            >
              <Text
                style={
                  selectedSigno
                    ? styles.pickerTriggerText
                    : styles.pickerTriggerPlaceholder
                }
              >
                {selectedSigno ? selectedSigno.label : 'Selecione...'}
              </Text>
              <Text style={styles.pickerChevron}>
                {showSignoPicker ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {showSignoPicker && (
              <View style={styles.pickerDropdown}>
                <ScrollView
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {ZODIAC_SIGNS.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={[
                        styles.pickerItem,
                        values.signo === item.value &&
                          styles.pickerItemSelected,
                      ]}
                      onPress={() => {
                        handleChange('signo', item.value);
                        handleBlur('signo');
                        setFieldError('signo', '');
                        setShowSignoPicker(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          values.signo === item.value &&
                            styles.pickerItemTextSelected,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {touched.signo && errors.signo ? (
              <Text style={styles.pickerErrorText} accessibilityRole="alert">
                {errors.signo}
              </Text>
            ) : null}
          </View>

          {/* Botão */}
          <View style={styles.buttonWrapper}>
            <Button
              label="Começar jornada 💖"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
              fullWidth
              size="lg"
            />
          </View>

          <Text style={styles.footerHint}>
            Você pode editar isso depois no menu lateral ✨
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
