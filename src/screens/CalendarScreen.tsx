import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, makeStyles, Spacing, Typography, BorderRadius } from '@theme/index';
import type { AppTheme } from '@theme/index';
import { CALENDAR_DAYS } from '@constants/index';
import type { MainAppScreenProps } from '@types/navigation';

type Props = MainAppScreenProps<'Calendar'>;

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    container:     { flex: 1, backgroundColor: theme.colors.background },
    scrollContent: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
    screenTitle:   { ...Typography.h2, color: theme.colors.text, marginBottom: Spacing.lg },
    monthNav: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    navBtn: {
      padding: Spacing.sm,
      borderRadius: BorderRadius.md,
      backgroundColor: theme.colors.surface,
      minWidth: 40,
      alignItems: 'center',
      ...theme.shadows.xs,
    },
    navArrow:   { fontSize: 24, color: theme.colors.primary, fontWeight: '700', lineHeight: 28 },
    monthLabel: { ...Typography.h3, color: theme.colors.text },
    calendarCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      marginBottom: Spacing.lg,
      ...theme.shadows.sm,
    },
    weekHeader: { flexDirection: 'row', marginBottom: Spacing.sm },
    daysGrid:   { flexDirection: 'row', flexWrap: 'wrap' },
    dayCell: {
      width: `${100 / 7}%`,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: BorderRadius.sm,
    },
    weekDayText:  { ...Typography.captionStrong, color: theme.colors.textSecondary, textAlign: 'center' },
    dayText:      { ...Typography.body, color: theme.colors.text },
    todayCell:    { backgroundColor: theme.colors.primaryLight },
    todayText:    { color: theme.colors.primaryDark, fontWeight: '700' },
    selectedCell: { backgroundColor: theme.colors.primary },
    selectedText: { color: theme.colors.textOnPrimary, fontWeight: '700' },
    selectedDayCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      ...theme.shadows.sm,
    },
    selectedDayTitle: { ...Typography.h4, color: theme.colors.text, marginBottom: Spacing.sm },
    selectedDayHint:  { ...Typography.body, color: theme.colors.textSecondary },
  })
);

const CalendarScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const styles = useStyles(theme);

  const today = new Date();
  const [selectedYear, setSelectedYear]   = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay]     = useState<number | null>(today.getDate());

  const { daysInMonth, startOffset } = useMemo(() => {
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const days     = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    return { daysInMonth: days, startOffset: firstDay };
  }, [selectedYear, selectedMonth]);

  const goToPrevMonth = () => {
    if (selectedMonth === 0) { setSelectedMonth(11); setSelectedYear((y) => y - 1); }
    else                     { setSelectedMonth((m) => m - 1); }
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) { setSelectedMonth(0); setSelectedYear((y) => y + 1); }
    else                      { setSelectedMonth((m) => m + 1); }
    setSelectedDay(null);
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    selectedMonth === today.getMonth() &&
    selectedYear === today.getFullYear();

  const cells: Array<number | null> = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Seu Mês 📅</Text>

        <View style={styles.monthNav}>
          <TouchableOpacity onPress={goToPrevMonth} style={styles.navBtn} activeOpacity={0.7}>
            <Text style={styles.navArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{MONTH_NAMES[selectedMonth]} {selectedYear}</Text>
          <TouchableOpacity onPress={goToNextMonth} style={styles.navBtn} activeOpacity={0.7}>
            <Text style={styles.navArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.weekHeader}>
            {CALENDAR_DAYS.map((dia, i) => (
              <View key={`header-${i}`} style={styles.dayCell}>
                <Text style={styles.weekDayText}>{dia}</Text>
              </View>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {cells.map((day, index) => {
              if (day === null) return <View key={`empty-${index}`} style={styles.dayCell} />;
              const isSelected  = selectedDay === day;
              const isTodayDay  = isToday(day);
              return (
                <TouchableOpacity
                  key={`day-${day}`}
                  style={[styles.dayCell, isTodayDay && styles.todayCell, isSelected && styles.selectedCell]}
                  onPress={() => setSelectedDay(day)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dayText, isTodayDay && styles.todayText, isSelected && styles.selectedText]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {selectedDay !== null && (
          <View style={styles.selectedDayCard}>
            <Text style={styles.selectedDayTitle}>
              {selectedDay} de {MONTH_NAMES[selectedMonth]}{isToday(selectedDay) ? ' — Hoje 🌸' : ''}
            </Text>
            <Text style={styles.selectedDayHint}>Nenhum evento registrado para este dia.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
