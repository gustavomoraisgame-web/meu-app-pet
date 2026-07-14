/**
 * HomeScreen — Meu Dia
 *
 * Seções:
 *  1. Header com saudação por horário + botão drawer
 *  2. Seletor de humor com descrição dinâmica do humor selecionado
 *  3. Entrada rápida de diário (compartilha estado com DiaryScreen via DiarioContext)
 *  4. Lista de tarefas com:
 *     - Adicionar (input + botão)
 *     - Alternar conclusão (tap)
 *     - Remover (long-press → confirmação)
 *     - Progresso percentual + contador
 *     - Mensagem vazia aleatória
 */

import React, { useState, useCallback, useMemo } from 'react';
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

import { usePerfil, useDiario, useTarefas } from '@hooks/index';
import { useTheme, makeStyles, Spacing, Typography, BorderRadius } from '@theme/index';
import type { AppTheme } from '@theme/index';

import { Card, Badge } from '@components/index';

import { MOOD_OPTIONS } from '@constants/index';
import {
  gerarSaudacao,
  obterDescricaoHumor,
  getMensagemTarefasVazias,
  percentualConclusao,
} from '@utils/helpers';

import type { Humor, Tarefa } from '@types/index';
import type { MainAppScreenProps } from '@types/navigation';

type Props = MainAppScreenProps<'Home'>;

// ─── Estilos ─────────────────────────────────────────────────────────────────
const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    flex:      { flex: 1 },
    container: { flex: 1, backgroundColor: theme.colors.background },

    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      ...theme.shadows.xs,
    },
    menuBtn:      { padding: Spacing.sm, marginRight: Spacing.sm },
    menuIcon:     { fontSize: 22, color: theme.colors.text },
    headerTitles: { flex: 1 },
    greeting:     { ...Typography.label, color: theme.colors.primary, letterSpacing: 0.5 },
    dateText:     { ...Typography.h4, color: theme.colors.text, marginTop: 1 },
    headerSpacer: { width: 38 },

    scrollContent: { padding: Spacing.lg, paddingBottom: 100 },

    // ─── Card de humor ──────────────────────────────────────────────────
    cardTitle:    { ...Typography.h4, color: theme.colors.text, marginBottom: Spacing.md },
    moodRow:      { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.xs },
    moodItem: {
      alignItems: 'center',
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.xs,
      borderRadius: BorderRadius.md,
      borderWidth: 2,
      borderColor: 'transparent',
      flex: 1,
    },
    moodItemSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight,
    },
    moodEmoji:      { fontSize: 26 },
    moodLabel:      { ...Typography.micro, color: theme.colors.textSecondary, marginTop: 3, textAlign: 'center' },
    moodLabelSelected: { color: theme.colors.primaryDark, fontWeight: '700' },
    moodDescription: {
      ...Typography.caption,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: Spacing.md,
      fontStyle: 'italic',
      paddingHorizontal: Spacing.sm,
    },

    // ─── Card de diário ─────────────────────────────────────────────────
    diaryInput: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      minHeight: 90,
      ...Typography.body,
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      lineHeight: 22,
    },
    diaryHint: {
      ...Typography.caption,
      color: theme.colors.textSecondary,
      marginTop: Spacing.xs,
      fontStyle: 'italic',
    },

    // ─── Seção de tarefas ───────────────────────────────────────────────
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.md,
    },
    sectionTitle: { ...Typography.h3, color: theme.colors.text },

    // Barra de progresso
    progressWrapper: { marginBottom: Spacing.md },
    progressInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: Spacing.xs,
    },
    progressLabel:   { ...Typography.caption, color: theme.colors.textSecondary },
    progressPercent: { ...Typography.captionStrong, color: theme.colors.primary },
    progressTrack: {
      height: 6,
      backgroundColor: theme.colors.backgroundAlt,
      borderRadius: BorderRadius.full,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: theme.colors.primary,
      borderRadius: BorderRadius.full,
    },

    // Input de nova tarefa
    addTodoRow: { flexDirection: 'row', marginBottom: Spacing.md, gap: Spacing.sm },
    todoInput: {
      flex: 1,
      borderWidth: 2,
      borderColor: theme.colors.borderFocused,
      borderRadius: BorderRadius.md,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
      ...Typography.body,
      color: theme.colors.text,
      backgroundColor: theme.colors.surface,
    },
    addButton: {
      width: 48, height: 48,
      backgroundColor: theme.colors.primary,
      borderRadius: BorderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    addButtonText: { color: theme.colors.white, fontSize: 24, fontWeight: '700', lineHeight: 28 },

    // Estado vazio
    emptyTodo: {
      alignItems: 'center',
      padding: Spacing.xl,
      backgroundColor: theme.colors.surface,
      borderRadius: BorderRadius.lg,
      ...theme.shadows.xs,
    },
    emptyIcon:  { fontSize: 32, marginBottom: Spacing.sm },
    emptyText:  { ...Typography.body, color: theme.colors.textSecondary, textAlign: 'center' },

    // Item de tarefa
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      ...theme.shadows.xs,
    },
    todoItemCompleted: { opacity: 0.55 },
    todoCheckBtn: {
      width: 28, height: 28,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: theme.colors.borderFocused,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    todoCheckBtnDone: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    todoCheckMark: { fontSize: 14, color: theme.colors.white },
    todoText: {
      ...Typography.body,
      color: theme.colors.text,
      flex: 1,
    },
    todoTextCompleted: {
      textDecorationLine: 'line-through',
      color: theme.colors.textSecondary,
    },
    todoDeleteHint: {
      ...Typography.micro,
      color: theme.colors.textDisabled,
      marginLeft: Spacing.sm,
    },
  })
);

// ─── Componente de item de tarefa ─────────────────────────────────────────────
interface TarefaItemProps {
  tarefa: Tarefa;
  onToggle: () => void;
  onRemove: () => void;
  styles: ReturnType<typeof useStyles>;
}

const TarefaItem: React.FC<TarefaItemProps> = ({ tarefa, onToggle, onRemove, styles }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 50 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
  };

  const handleLongPress = () => {
    Alert.alert(
      'Remover tarefa',
      `Remover "${tarefa.texto}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: onRemove },
      ]
    );
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.todoItem, tarefa.concluida && styles.todoItemCompleted]}
        onPress={onToggle}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        delayLongPress={400}
        activeOpacity={1}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: tarefa.concluida }}
        accessibilityLabel={tarefa.texto}
        accessibilityHint="Toque para alternar, segure para remover"
      >
        {/* Checkbox visual */}
        <View style={[styles.todoCheckBtn, tarefa.concluida && styles.todoCheckBtnDone]}>
          {tarefa.concluida && <Text style={styles.todoCheckMark}>✓</Text>}
        </View>

        <Text
          style={[styles.todoText, tarefa.concluida && styles.todoTextCompleted]}
          numberOfLines={2}
        >
          {tarefa.texto}
        </Text>

        {!tarefa.concluida && (
          <Text style={styles.todoDeleteHint}>⋯</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Tela principal ────────────────────────────────────────────────────────────
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { perfil } = usePerfil();
  const { diario, humor, setDiario, setHumor } = useDiario();
  const { tarefas, adicionarTarefa, alternarConclusao, removerTarefa } = useTarefas();
  const { theme } = useTheme();
  const styles = useStyles(theme);

  const [novaTarefa, setNovaTarefa] = useState('');
  // Mensagem vazia calculada uma vez por montagem da tela
  const [mensagemVazia] = useState(() => getMensagemTarefasVazias());

  // ─── Dados derivados ────────────────────────────────────────────────
  const saudacao     = useMemo(() => gerarSaudacao(perfil ?? null), [perfil]);
  const descHumor    = useMemo(() => humor ? obterDescricaoHumor(humor) : null, [humor]);
  const progresso    = useMemo(() => percentualConclusao(tarefas), [tarefas]);
  const concluidas   = useMemo(() => tarefas.filter((t) => t.concluida).length, [tarefas]);

  const hoje = useMemo(() =>
    new Date().toLocaleDateString('pt-BR', {
      weekday: 'long', day: 'numeric', month: 'long',
    }), []
  );

  // ─── Handlers ───────────────────────────────────────────────────────
  const openDrawer = useCallback(() => {
    (navigation as any).getParent('Drawer')?.openDrawer();
  }, [navigation]);

  const handleAdicionarTarefa = useCallback(async () => {
    const texto = novaTarefa.trim();
    if (!texto) return;
    await adicionarTarefa(texto);
    setNovaTarefa('');
  }, [novaTarefa, adicionarTarefa]);

  const handleHumor = useCallback(async (nome: Humor) => {
    await setHumor(humor === nome ? null : nome);
  }, [humor, setHumor]);

  // ─── Render ─────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={openDrawer}
          style={styles.menuBtn}
          activeOpacity={0.7}
          accessibilityLabel="Abrir menu"
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.greeting} numberOfLines={1}>{saudacao}</Text>
          <Text style={styles.dateText} numberOfLines={1} accessibilityRole="header">
            {hoje}
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

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
          {/* ── Humor ───────────────────────────────────────────────── */}
          <Card variant="default" style={{ marginBottom: Spacing.lg }}>
            <Text style={styles.cardTitle}>Como você está se sentindo?</Text>
            <View style={styles.moodRow}>
              {MOOD_OPTIONS.map((item) => {
                const selected = humor === item.nome;
                return (
                  <TouchableOpacity
                    key={item.nome}
                    style={[styles.moodItem, selected && styles.moodItemSelected]}
                    onPress={() => handleHumor(item.nome)}
                    activeOpacity={0.7}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    accessibilityLabel={item.nome}
                  >
                    <Text style={styles.moodEmoji}>{item.emoji}</Text>
                    <Text style={[styles.moodLabel, selected && styles.moodLabelSelected]}>
                      {item.nome}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {descHumor ? (
              <Text style={styles.moodDescription}>{descHumor}</Text>
            ) : null}
          </Card>

          {/* ── Diário rápido ──────────────────────────────────────── */}
          <Card variant="default" style={{ marginBottom: Spacing.lg }}>
            <Text style={styles.cardTitle}>✨ Me conta sobre o seu dia... 💖</Text>
            <TextInput
              style={styles.diaryInput}
              placeholder="Escreva livremente, esse cantinho é só seu..."
              placeholderTextColor={theme.colors.textDisabled}
              multiline
              numberOfLines={4}
              value={diario}
              onChangeText={(t) => setDiario(t)}
              textAlignVertical="top"
              accessibilityLabel="Entrada rápida do diário"
            />
            <Text style={styles.diaryHint}>
              Salvo automaticamente · visível também na aba Diário 📔
            </Text>
          </Card>

          {/* ── Tarefas ────────────────────────────────────────────── */}
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle} accessibilityRole="header">
                🌟 Coisinhas Importantes
              </Text>
              {tarefas.length > 0 && (
                <Badge
                  label={`${concluidas}/${tarefas.length}`}
                  variant={progresso === 100 ? 'success' : 'primary'}
                  size="sm"
                />
              )}
            </View>

            {/* Barra de progresso */}
            {tarefas.length > 0 && (
              <View style={styles.progressWrapper}>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressLabel}>
                    {progresso === 100
                      ? 'Tudo concluído! 🎉'
                      : `${concluidas} de ${tarefas.length} concluídas`}
                  </Text>
                  <Text style={styles.progressPercent}>{progresso}%</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${progresso}%` }]} />
                </View>
              </View>
            )}

            {/* Input nova tarefa */}
            <View style={styles.addTodoRow}>
              <TextInput
                style={styles.todoInput}
                placeholder="Adicionar uma coisinha..."
                placeholderTextColor={theme.colors.textDisabled}
                value={novaTarefa}
                onChangeText={setNovaTarefa}
                onSubmitEditing={handleAdicionarTarefa}
                returnKeyType="done"
                maxLength={200}
                accessibilityLabel="Nova tarefa"
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAdicionarTarefa}
                activeOpacity={0.8}
                accessibilityLabel="Adicionar tarefa"
                accessibilityRole="button"
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Lista */}
            {tarefas.length === 0 ? (
              <View style={styles.emptyTodo}>
                <Text style={styles.emptyIcon}>🫧</Text>
                <Text style={styles.emptyText}>{mensagemVazia}</Text>
              </View>
            ) : (
              tarefas.map((tarefa) => (
                <TarefaItem
                  key={tarefa.id}
                  tarefa={tarefa}
                  styles={styles}
                  onToggle={() => alternarConclusao(tarefa.id)}
                  onRemove={() => removerTarefa(tarefa.id)}
                />
              ))
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
