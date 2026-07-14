import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';

// ─── Root Stack (auth guard) ──────────────────────────────────────────────────
export type RootStackParamList = {
  Onboarding: undefined;
  MainApp: undefined;
};

// ─── Drawer (menu lateral dentro do MainApp) ──────────────────────────────────
export type DrawerParamList = {
  Tabs: undefined;
  // Futuras telas acessíveis pelo drawer podem ser adicionadas aqui
};

// ─── Bottom Tabs ──────────────────────────────────────────────────────────────
export type MainAppParamList = {
  Home: undefined;
  Diary: undefined;
  Calendar: undefined;
};

// ─── Props tipadas por nível ──────────────────────────────────────────────────

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type DrawerScreenProps_<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type MainAppScreenProps<T extends keyof MainAppParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainAppParamList, T>,
    CompositeScreenProps<
      DrawerScreenProps<DrawerParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;

// ─── Tipagem global do React Navigation ───────────────────────────────────────
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
