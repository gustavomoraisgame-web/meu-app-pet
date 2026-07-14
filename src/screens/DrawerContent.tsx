import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { usePerfil } from '@hooks/index';
import { useTheme, makeStyles, Spacing, Typography, BorderRadius } from '@theme/index';
import type { AppTheme } from '@theme/index';
import { MENU_OPTIONS, ZODIAC_SIGNS } from '@constants/index';

const useStyles = makeStyles((theme: AppTheme) =>
  StyleSheet.create({
    scrollContent: { flex: 1, backgroundColor: theme.colors.surface },
    profileSection: {
      padding: Spacing.xl,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    avatar: {
      width: 80, height: 80, borderRadius: 40,
      backgroundColor: theme.colors.primaryLight,
      justifyContent: 'center', alignItems: 'center',
      marginBottom: Spacing.md,
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
    avatarText:          { fontSize: 36 },
    profileName:         { ...Typography.h3, color: theme.colors.text, marginBottom: Spacing.xs },
    profileSigno:        { ...Typography.label, color: theme.colors.textSecondary, marginBottom: Spacing.xs },
    profileAniversario:  { ...Typography.caption, color: theme.colors.textSecondary },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: Spacing.lg,
      marginVertical: Spacing.sm,
    },
    menuSection: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.md,
      gap: Spacing.md,
    },
    menuIcon:  { fontSize: 20, width: 28, textAlign: 'center' },
    menuLabel: { ...Typography.body, color: theme.colors.text },
    footerSection: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.md },
    sairBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.md,
      gap: Spacing.md,
    },
    sairIcon: { fontSize: 20, width: 28, textAlign: 'center' },
    sairText: { ...Typography.body, color: theme.colors.error },
  })
);

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { perfil, limparPerfil } = usePerfil();
  const { theme } = useTheme();
  const styles = useStyles(theme);

  const signoEmoji = ZODIAC_SIGNS.find((s) => s.value === perfil?.signo)?.emoji ?? '';

  const handleMenuOption = (id: string) => {
    props.navigation.closeDrawer();
    switch (id) {
      case 'profile':
        props.navigation.getParent()?.navigate('Onboarding');
        break;
      case 'settings':
        Alert.alert('Em breve', 'Configurações serão adicionadas em breve! ⚙️');
        break;
      case 'pet':
        Alert.alert('Em breve', 'Seu Pet Virtual está a caminho! 🐾');
        break;
    }
  };

  const handleSair = () => {
    Alert.alert(
      'Sair',
      'Deseja apagar seu perfil e recomeçar do início?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: async () => { await limparPerfil(); } },
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
      {/* Perfil */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🌸</Text>
        </View>
        <Text style={styles.profileName}>{perfil?.nome ?? ''}</Text>
        {perfil?.signo     ? <Text style={styles.profileSigno}>{signoEmoji} {perfil.signo}</Text> : null}
        {perfil?.aniversario ? <Text style={styles.profileAniversario}>🎂 {perfil.aniversario}</Text> : null}
      </View>

      <View style={styles.divider} />

      {/* Menu */}
      <View style={styles.menuSection}>
        {MENU_OPTIONS.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuOption(item.id)} activeOpacity={0.7}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Rodapé */}
      <View style={styles.footerSection}>
        <TouchableOpacity style={styles.sairBtn} onPress={handleSair} activeOpacity={0.7}>
          <Text style={styles.sairIcon}>🚪</Text>
          <Text style={styles.sairText}>Recomeçar do início</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
