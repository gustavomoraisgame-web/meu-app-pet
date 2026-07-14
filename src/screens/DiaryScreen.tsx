/**
 * DiaryScreen — Diário Íntimo
 *
 * Lógica:
 *  1. Rascunho do dia vem do DiarioContext (compartilhado com HomeScreen)
 *     → auto-save com useDebounce(1500ms) — sem botão "Salvar"
 *  2. Humor atual vem do DiarioContext também
 *  3. Botão "Guardar memória" salva uma EntradaDiario permanente via useEntradasDiario
 *     → limpa o rascunho após salvar
 *  4. Seção "Memórias Guardadas" lista EntradaDiario[] com:
 *     → data relativa (formatarDataRelativa)
 *     → badge de humor
 *     → preview do conteúdo (truncado)
 *     → long-press para remover
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDiario, useDebounce, useEntradasDiario } from '@hooks/index';
import { useTheme, makeStyles, Spacing, Typography, BorderRadius } from '@theme/index';
import type { AppTheme } from '@theme/index';

import { Badge } from '@components/index';

import { MOOD_OPTIONS } from '@constants/index';
import {
  formatarDataRelativa,
  getMensagemDiarioVazio,
  obterEmojiHumor,
} from '@utils/helpers';

import type { EntradaDiario, Humor } from '@types/index';
import type { MainAppScreenProps } from '@types/navigation';

type Props = MainAppScreenProps<'Diary'>;

// ─── Estilos ─────────────────────────────────────────────────────────────────
const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    flex:      { flex: 1 },
    container: { flex: 1, backgroundColor: theme.colors.background },
    scrollContent: { padding: Spacing.lg, paddingBottom: 100 },

    // ─── Cabeçalho da entrada ──────────────────────────────────────────
    entryHeader:  { marginBottom: Spacing.lg },
    screenTitle:  { ...Typography.h2, color: theme.colors.text },
    dateText:     { ...Typography.label, color: theme.colors.textSecondary, textTransform: 'capitalize', marginTop: 2, marginBottom: Spacing.sm },

    humorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      flexWrap: 'wrap',
    },
    humorBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primaryLight,
      borderRadius: BorderRadius.full,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      gap: Spacing.xs,
    },
    humorEmoji:  { fontSize: 15 },
    humorBadgeText: { ...Typography.caption, color: theme.colors.primaryDark, fontWeight: '700' },
    humorHint:   { ...Typography.caption, color: theme.colors.textSecondary, fontStyle: 'italic' },

    // ─── Card de escrita ───────────────────────────────────────────────
    writeCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.lg,
      ...theme.shadows.sm,
    },
    writeCardHint: {
      ...Typography.caption,
      color: theme.colors.textSecondary,
      marginBottom: Spacing.md,
      fontStyle: 'italic',
    },
    diaryInput: {
      minHeight: 180,
      ...Typography.body,
      color: theme.colors.text,
      lineHeight: 26,
      textAlignVertical: 'top',
    },
    autoSaveRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: Spacing.md,
      paddingTop: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    autoSaveText: { ...Typography.caption, color: theme.colors.textSecondary },
    saveMemoryBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.full,
      gap: Spacing.xs,
    },
    saveMemoryBtnDisabled: { opacity: 0.45 },
    saveMemoryBtnText: { ...Typography.captionStrong, color: theme.colors.white },

    // ─── Seção de memórias ─────────────────────────────────────────────
    memoriesHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.md,
    },
    sectionTitle:  { ...Typography.h3, color: theme.colors.text },

    emptyMemories: {
      backgroundColor: theme.colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.xl,
      alignItems: 'center',
      ...theme.shadows.xs,
    },
    emptyIcon: { fontSize: 32, marginBottom: Spacing.sm },
    emptyText: { ...Typography.body, color: theme.colors.textSecondary, textAlign: 'center' },

    // ─── Card de memória ───────────────────────────────────────────────
    memoriaCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      ...theme.shadows.xs,
    },
    memoriaCardPressed: { opacity: 0.75 },
    memoriaCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.sm,
    },
    memoriaDate:    { ...Typography.captionStrong, color: theme.colors.textSecondary },
    memoriaConteudo: {
      ...Typography.body,
      color: theme.colors.text,
      lineHeight: 22,
    },
    memoriaConteudoFaded: { color: theme.colors.textSecondary },
    memoriaDeleteHint: {
      ...Typography.micro,
      color: theme.colors.textDisabled,
      marginTop: Spacing.sm,
      textAlign: 'right',
    },
  })
);

// ─── Componente de memória individual ────────────────────────────────────────
interface MemoriaCardProps {
  entrada: EntradaDiario;
  onRemove: () => void;
  styles: ReturnType<typeof useStyles>;
}

const MemoriaCard: React.FC<MemoriaCardProps> = ({ entrada, onRemove, styles }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const emoji = obterEmojiHumor(entrada.humor);

  const handleLongPress = () => {
    Alert.alert(
      'Remover memória',
      'Deseja apagar esta entrada do diário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Apagar', style: 'destructive', onPress: onRemove },
      ]
    );
  };

  const onPressIn  = () => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 50 }).start();
  const onPressOut = () => Animated.spring(scaleAnim, { toValue: 1,    useNativeDriver: true, speed: 20 }).start();

  // Formata a data da entrada — pode ser string ISO salva no AsyncStorage
  const dataObj = entrada.data instanceof Date ? entrada.data : new Date(entrada.data);
  const dataLabel = formatarDataRelativa(dataObj);

  const preview = entrada.conteudo.length > 180
    ? entrada.conteudo.slice(0, 180) + '…'
    : entrada.conteudo;

  return (
    <Animated.View style={[styles.memoriaCard, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onLongPress={handleLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        delayLongPress={400}
        activeOpacity={1}
        accessibilityRole="button"
        accessibilityLabel={`Entrada de ${dataLabel}`}
        accessibilityHint="Segure para remover"
      >
        <View style={styles.memoriaCardHeader}>
          <Text style={styles.memoriaDate}>{dataLabel}</Text>
          <Badge label={`${emoji} ${entrada.humor}`} variant="primary" size="sm" />
        </View>
        <Text style={styles.memoriaConteudo} numberOfLines={4}>
          {preview}
        </Text>
        <Text style={styles.memoriaDeleteHint}>Segure para remover</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Tela principal ───────────────────────────────────────────────────────────
const DiaryScreen: React.FC<Props> = () => {
  const { diario, humor, setDiario } = useDiario();
  const { entradas, carregando, adicionarEntrada, removerEntrada } = useEntradasDiario();
  const { theme } = useTheme();
  const styles = useStyles(theme);

  // Auto-save: espera 1500ms de inatividade antes de persistir
  const diarioDebounced = useDebounce(diario, 1500);
  const [salvandoAuto, setSalvandoAuto] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const previousDiario = useRef(diario);

  // Dispara o setDiario (que persiste) quando o valor debounced muda
  useEffect(() => {
    if (diarioDebounced !== previousDiario.current) {
      previousDiario.current = diarioDebounced;
      setSalvandoAuto(true);
      setDiario(diarioDebounced).finally(() => {
        setSalvandoAuto(false);
        setSavedAt(new Date());
      });
    }
  }, [diarioDebounced, setDiario]);

  const [mensagemVazia] = useState(() => getMensagemDiarioVazio());

  // ─── Guardar memória ──────────────────────────────────────────────
  const handleGuardarMemoria = useCallback(async () => {
    if (!diario.trim()) return;
    const humorAtual: Humor = humor ?? 'Neutro';
    await adicionarEntrada(diario, humorAtual);
    // Limpa rascunho após guardar
    await setDiario('');
  }, [diario, humor, adicionarEntrada, setDiario]);

  // ─── Dados derivados ─────────────────────────────────────────────
  const humorAtual = useMemo(
    () => MOOD_OPTIONS.find((m) => m.nome === humor),
    [humor]
  );

  const hoje = useMemo(
    () => new Date().toLocaleDateString('pt-BR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }),
    []
  );

  const autoSaveLabel = useMemo(() => {
    if (salvandoAuto) return '💾 Salvando...';
    if (savedAt)      return `✓ Salvo às ${savedAt.getHours().toString().padStart(2,'0')}:${savedAt.getMinutes().toString().padStart(2,'0')}`;
    return '✎ As alterações são salvas automaticamente';
  }, [salvandoAuto, savedAt]);

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Cabeçalho */}
          <View style={styles.entryHeader}>
            <Text style={styles.screenTitle} accessibilityRole="header">
              Seu Diário Íntimo 📔
            </Text>
            <Text style={styles.dateText} numberOfLines={1}>
              {hoje}
            </Text>

            <View style={styles.humorRow}>
              {humorAtual ? (
                <View style={styles.humorBadge}>
                  <Text style={styles.humorEmoji}>{humorAtual.emoji}</Text>
                  <Text style={styles.humorBadgeText}>
                    Sentindo: {humorAtual.nome}
                  </Text>
                </View>
              ) : null}
              <Text style={styles.humorHint}>
                {humorAtual ? 'Altere na aba Meu Dia' : 'Registre seu humor na aba Meu Dia'}
              </Text>
            </View>
          </View>

          {/* Área de escrita com auto-save */}
          <View style={styles.writeCard}>
            <Text style={styles.writeCardHint}>
              Esse espaço é só seu. Escreva sem filtros. 💌
            </Text>

            <TextInput
              style={styles.diaryInput}
              placeholder="O que está no seu coração hoje?..."
              placeholderTextColor={theme.colors.textDisabled}
              multiline
              value={diario}
              onChangeText={(t) => setDiario(t)}
              textAlignVertical="top"
              accessibilityLabel="Rascunho do diário de hoje"
            />

            {/* Rodapé do card: status do auto-save + botão guardar */}
            <View style={styles.autoSaveRow}>
              <Text style={styles.autoSaveText}>{autoSaveLabel}</Text>

              <TouchableOpacity
                style={[
                  styles.saveMemoryBtn,
                  !diario.trim() && styles.saveMemoryBtnDisabled,
                ]}
                onPress={handleGuardarMemoria}
                disabled={!diario.trim()}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Guardar memória"
                accessibilityState={{ disabled: !diario.trim() }}
              >
                <Text style={styles.saveMemoryBtnText}>💾 Guardar memória</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Memórias guardadas */}
          <View>
            <View style={styles.memoriesHeader}>
              <Text style={styles.sectionTitle} accessibilityRole="header">
                💌 Memórias Guardadas
              </Text>
              {entradas.length > 0 && (
                <Badge
                  label={`${entradas.length}`}
                  variant="neutral"
                  size="sm"
                />
              )}
            </View>

            {carregando ? null : entradas.length === 0 ? (
              <View style={styles.emptyMemories}>
                <Text style={styles.emptyIcon}>📖</Text>
                <Text style={styles.emptyText}>{mensagemVazia}</Text>
              </View>
            ) : (
              entradas.map((entrada) => (
                <MemoriaCard
                  key={entrada.id}
                  entrada={entrada}
                  styles={styles}
                  onRemove={() => removerEntrada(entrada.id)}
                />
              ))
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DiaryScreen;
