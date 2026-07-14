# 🗺️ Estrutura de Navegação

## Overview

A navegação usa **React Navigation** com dois níveis:

1. **RootNavigator** - Escolhe entre Onboarding e MainApp
2. **MainAppNavigator** - Bottom Tab Navigation com 3 abas

```
RootNavigator
├── Onboarding (Sem Perfil)
└── MainApp (Com Perfil)
    └── MainAppNavigator (Bottom Tabs)
        ├── Home (Meu Dia)
        ├── Diary (Diário)
        └── Calendar (Calendário)
```

## RootNavigator

Gerencia a navegação de alto nível entre:

- **Onboarding**: Tela de setup inicial
- **MainApp**: Aplicação principal

**Arquivo**: `src/navigation/RootNavigator.tsx`

```typescript
import RootNavigator from '@navigation/RootNavigator';

// Uso
<RootNavigator />
```

## MainAppNavigator

Implementa Bottom Tab Navigation com 3 abas:

1. **Meu Dia** (🏠) - Home
2. **Diário** (📔) - Diary
3. **Calendário** (🪴) - Calendar

**Arquivo**: `src/navigation/MainAppNavigator.tsx`

```typescript
import MainAppNavigator from '@navigation/MainAppNavigator';

// Uso
<MainAppNavigator />
```

## Tipos de Navegação

Os tipos estão em `src/types/navigation.ts`:

```typescript
export type RootStackParamList = {
  Onboarding: undefined;
  MainApp: undefined;
};

export type MainAppParamList = {
  Home: undefined;
  Diary: undefined;
  Calendar: undefined;
};
```

## Fluxo de Navegação

### Primeira Vez (Sem Perfil)

1. Usuário abre app
2. PerfilContext carrega (vazio)
3. RootNavigator mostra Onboarding
4. Usuário preenche nome, data e signo
5. Perfil é salvo em AsyncStorage
6. RootNavigator muda para MainApp

### Uso Posterior

1. Usuário abre app
2. PerfilContext carrega dados do AsyncStorage
3. RootNavigator mostra MainApp diretamente
4. Usuário navega entre abas

## Customização

Para adicionar novas telas:

1. Adicionar tipo em `MainAppParamList`
2. Criar screen component
3. Adicionar em `MainAppNavigator`
4. Implementar lógica de navegação

## Recursos Utilizados

- `@react-navigation/native` - Core
- `@react-navigation/native-stack` - Stack navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `react-native-screens` - Native screens
- `react-native-safe-area-context` - Safe area
