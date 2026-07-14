# 📋 PLANO ETAPA 3 — MIGRAÇÃO DE TELAS

## Objetivo
Migrar as telas do React Web para React Native, mantendo toda a lógica intacta.

## O que será feito

### 1. OnboardingScreen
**Localização:** `src/screens/OnboardingScreen.tsx`

**Funcionalidades:**
- Input de nome
- Date picker (data de nascimento)
- Picker de signos (12 opções)
- Validação de nome
- Botão "Começar jornada"

**Componentes a usar:**
- View (container)
- Text (textos)
- TextInput (nome)
- DateTimePicker (data)
- Picker (signos)
- TouchableOpacity (botão)
- StyleSheet (estilos)

**Contextos necessários:**
- `usePerfil()` - Para atualizarPerfil

**Validações:**
- Nome não vazio (usar `validarNome()`)

### 2. HomeScreen (Meu Dia)
**Localização:** `src/screens/HomeScreen.tsx`

**Funcionalidades:**
- Header personalizado
- Menu drawer
- Seletor de humor (5 emojis)
- Textarea do diário
- Todo list (adicionar, marcar concluído)
- Bottom navigation

**Componentes:**
- View, Text, ScrollView
- FlatList (para tarefas)
- TextInput (diário e novas tarefas)
- TouchableOpacity (humor items, botões)
- SafeAreaView

**Contextos necessários:**
- `usePerfil()` - Para dados do usuário
- `useTarefas()` - Para CRUD de tarefas
- `useDiario()` - Para humor e diário

### 3. DiaryScreen (Diário)
**Localização:** `src/screens/DiaryScreen.tsx`

**Funcionalidades:**
- Placeholder inicial
- (Futura: Lista de entradas antigas)

**Simples por enquanto**

### 4. CalendarScreen (Calendário)
**Localização:** `src/screens/CalendarScreen.tsx`

**Funcionalidades:**
- Grid de 7 dias × 31 dias
- Headers (D, S, T, Q, Q, S, S)
- Números de 1 a 31

**Estrutura simples com FlatList ou ScrollView**

---

## Componentes a Criar

### Components Compartilhados

#### 1. Header.tsx
- Menu button
- Greeting (nome do usuário)
- Spacing flexível

#### 2. DrawerMenu.tsx
- Profile info (avatar, nome, signo)
- Menu options
- Close button
- Overlay

#### 3. MoodSelector.tsx
- 5 emojis
- Estados de seleção
- OnChange callback

#### 4. TodoList.tsx
- Lista de tarefas
- Add input
- Items com checkbox
- Delete option

#### 5. DiaryInput.tsx
- Textarea grande
- Placeholder inspirador
- OnChange callback

#### 6. BottomNavigation.tsx (ou usar React Navigation)
- 3 tabs
- Icons e labels
- Active state

---

## Ordem de Migração

1. ✅ **Contextos & Providers** (já feito)
2. ✅ **Navegação** (já feita)
3. ✅ **Tipos & Constants** (já feitos)
4. ✅ **Hooks** (já criados)
5. ⏳ **Componentes** (a criar)
   - Header
   - DrawerMenu
   - MoodSelector
   - TodoList
   - DiaryInput
6. ⏳ **Telas** (a criar)
   - OnboardingScreen
   - HomeScreen
   - DiaryScreen
   - CalendarScreen

---

## Padrão de Implementação

### Cada Componente

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@theme/index';

interface ComponentProps {
  // Props aqui
}

export const Component: React.FC<ComponentProps> = (props) => {
  // Lógica

  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default Component;
```

### Cada Tela

```typescript
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { usePerfil, useTarefas, useDiario } from '@hooks/index';
import { RootStackScreenProps } from '@types/navigation';

type Props = RootStackScreenProps<'OnboardingScreen'>;

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const { perfil, atualizarPerfil } = usePerfil();

  return (
    <View style={styles.container}>
      {/* Componentes */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default OnboardingScreen;
```

---

## Resources

- [React Native Docs](https://reactnative.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [Expo Docs](https://docs.expo.dev)
- [Tema Definido](./src/theme/index.ts)
- [Constants](./src/constants/index.ts)
- [Types](./src/types/index.ts)

---

**Status:** Pronto para iniciar ETAPA 3  
**Próximos Passos:** Criar componentes compartilhados
