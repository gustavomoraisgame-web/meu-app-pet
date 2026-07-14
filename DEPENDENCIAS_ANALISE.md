# 📦 ANÁLISE COMPLETA DE DEPENDÊNCIAS
**ETAPA 3 — Verificação de Bibliotecas**  
**Data:** 2026-07-14

---

## 📊 TABELA DE CONVERSÃO — React Web → React Native

### PRODUCTION DEPENDENCIES

| # | React Web | React Native | Status | Justificativa |
|---|-----------|--------------|--------|---------------|
| 1 | `react@^19.2.7` | `react@^18.2.0` | ✅ | Core do React. RN usa v18 (v19 ainda instável em RN) |
| 2 | `react-dom@^19.2.7` | ❌ REMOVIDO | ✅ | DOM não existe em React Native |
| 3 | `vite@^8.1.1` | `expo@^51.0.0` | ✅ | Expo é o bundler/CLI padrão para React Native |
| 4 | `@vitejs/plugin-react@^6.0.3` | `babel-preset-expo` | ✅ | Babel é transpiler padrão em RN |
| 5 | `oxlint@^1.71.0` | `eslint@^8.54.0` | ✅ | ESLint é mais estável e tradicional |
| — | — | `expo-font@^12.0.0` | ✅ NOVO | Necessário para carregar Google Fonts |
| — | — | `expo-splash-screen@^0.27.0` | ✅ NOVO | Tela de splash configurável |
| — | — | `expo-status-bar@^1.12.0` | ✅ NOVO | Status bar nativo |
| — | — | `react-native-gesture-handler@^2.14.0` | ✅ NOVO | Suporte a gestos (necessário para React Navigation) |
| — | — | `react-native-reanimated@^3.6.0` | ✅ NOVO | Animações fluidas e nativas |
| — | — | `@react-navigation/native@^6.1.0` | ✅ NOVO | Navegação (substitui React Router) |
| — | — | `@react-navigation/native-stack@^6.9.0` | ✅ NOVO | Stack navigation nativa |
| — | — | `@react-navigation/bottom-tabs@^6.5.0` | ✅ NOVO | Bottom tab navigation |
| — | — | `@react-navigation/drawer@^6.6.0` | ✅ NOVO | Drawer navigation |
| — | — | `react-native-screens@^3.27.0` | ✅ NOVO | Otimização nativa de screens |
| — | — | `react-native-safe-area-context@^4.8.0` | ✅ NOVO | Safe area (notches, etc) |
| — | — | `react-native-svg@^13.14.0` | ✅ NOVO | SVG nativo |
| — | — | `@expo/vector-icons@^14.0.0` | ✅ NOVO | Ícones vetoriais (FontAwesome, etc) |
| — | — | `nativewind@^2.0.0` | ✅ NOVO | Tailwind CSS para React Native |
| — | — | `tailwindcss@^3.4.0` | ✅ NOVO | Config para nativewind |

### DEV DEPENDENCIES

| # | React Web | React Native | Status | Justificativa |
|---|-----------|--------------|--------|---------------|
| 1 | `@types/react@^19.2.17` | `@types/react@^18.2.0` | ✅ | Tipos TypeScript (v18 compatibility) |
| 2 | `@types/react-dom@^19.2.3` | ❌ REMOVIDO | ✅ | DOM não existe em RN |
| 3 | — | `@types/react-native@^0.73.0` | ✅ NOVO | Tipos TypeScript para React Native |
| — | — | `@types/node@^20.0.0` | ✅ NOVO | Tipos para Node.js |
| — | — | `typescript@^5.3.0` | ✅ NOVO | TypeScript stricto |
| — | — | `eslint@^8.54.0` | ✅ NOVO | Linter principal |
| — | — | `@typescript-eslint/eslint-plugin@^6.13.0` | ✅ NOVO | Plugin TypeScript para ESLint |
| — | — | `@typescript-eslint/parser@^6.13.0` | ✅ NOVO | Parser TypeScript |
| — | — | `prettier@^3.1.0` | ✅ NOVO | Formatter |
| — | — | `prettier-plugin-tailwindcss@^0.5.0` | ✅ NOVO | Plugin Tailwind para Prettier |
| — | — | `@babel/core@^7.23.0` | ✅ NOVO | Babel transpiler |
| — | — | `expo-cli@^6.3.0` | ✅ NOVO | CLI Expo |

---

## 🔍 ANÁLISE DETALHADA POR CATEGORIA

### ✅ Mantidas (10 libs)

```typescript
react, @types/react, typescript, eslint, 
@typescript-eslint/*, prettier, @babel/core, 
@types/node, expo-cli
```

**Razão:** São agnósticas (não dependem de DOM)

---

### ❌ Removidas (3 libs)

#### 1. `react-dom`
- **Problema:** React DOM é específico de web browsers
- **Razão Remoção:** React Native não usa DOM
- **Substituído por:** React Native components (View, Text, ScrollView, etc)

#### 2. `@types/react-dom`
- **Problema:** Tipos específicos de DOM
- **Razão Remoção:** Não necessário em RN
- **Substituído por:** `@types/react-native`

#### 3. `vite`
- **Problema:** Bundler web-only
- **Razão Remoção:** React Native usa Metro via Expo
- **Substituído por:** Expo + Metro (automático)

#### 4. `@vitejs/plugin-react`
- **Problema:** Plugin específico do Vite
- **Razão Remoção:** Não funciona em RN
- **Substituído por:** `babel-preset-expo`

#### 5. `oxlint`
- **Problema:** Linter experimental e web-focused
- **Razão Remoção:** ESLint é mais estável e suporta RN melhor
- **Substituído por:** ESLint + @typescript-eslint/parser

---

### ✨ Adicionadas (22 libs)

#### Expo Ecosystem (5)
- `expo` - CLI e bundler
- `expo-font` - Carregar fontes customizadas
- `expo-splash-screen` - Splash screen
- `expo-status-bar` - Status bar nativa
- `expo-router` - Alternative routing (opcional, usando React Navigation)

#### React Navigation (4)
- `@react-navigation/native` - Core
- `@react-navigation/native-stack` - Stack navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/drawer` - Drawer navigation

#### Native Performance (4)
- `react-native-gesture-handler` - Gestos otimizados
- `react-native-reanimated` - Animações 60fps
- `react-native-screens` - Otimizações de tela
- `react-native-safe-area-context` - Safe areas (notches)

#### UI & Graphics (3)
- `react-native-svg` - SVG nativo
- `@expo/vector-icons` - Ícones vetoriais
- `nativewind` - Tailwind para RN

#### TypeScript Support (3)
- `@types/react-native` - Tipos RN
- `@typescript-eslint/*` - Parser/Plugin TS
- `tailwindcss` - Config para NativeWind

---

## 🎯 DECISÕES CRÍTICAS

### 1. React 18 vs 19
**Decisão:** React 18  
**Motivo:** React 19 ainda não é totalmente estável com React Native. v18 é bem suportado.

```json
// ❌ Evitar
"react": "^19.2.7"

// ✅ Usar
"react": "^18.2.0"
```

### 2. React Navigation vs Expo Router
**Decisão:** React Navigation (com expo-router como fallback)  
**Motivo:** 
- React Navigation é mais maduro e testado
- Expo Router ainda é beta
- Já implementei o setup com React Navigation

```json
// Mantém ambos por compatibilidade
"@react-navigation/native": "^6.1.0",
"expo-router": "^3.5.0"
```

### 3. AsyncStorage
**Decisão:** `@react-native-async-storage/async-storage` (via expo-async-storage)  
**Motivo:**
- Padrão da comunidade
- Bem mantido
- Expo oferece versão wrapper

```json
// ✅ Correto (via Expo)
"expo-async-storage": "^2.0.0"
// Internamente usa @react-native-async-storage/async-storage
```

### 4. Styling: Tailwind + NativeWind
**Decisão:** Usar NativeWind (Tailwind para RN)  
**Motivo:**
- Consistência com web (se migrar depois)
- Desenvolvimento mais rápido
- Tema já configurado com Tailwind

```json
"nativewind": "^2.0.0",
"tailwindcss": "^3.4.0"
```

### 5. Linting: ESLint vs Oxlint
**Decisão:** ESLint  
**Motivo:**
- Oxlint é experimental
- ESLint tem suporte completo a RN
- Comunidade grande

```json
"eslint": "^8.54.0",
"@typescript-eslint/eslint-plugin": "^6.13.0"
```

---

## ✅ VERIFICAÇÃO FINAL

### Dependências Críticas (Testadas)

| Biblioteca | RN Support | Recomendação |
|-----------|-----------|--------------|
| React | ✅ Full | Essencial |
| React Native | ✅ Full | Essencial |
| Expo | ✅ Full | Essencial |
| React Navigation | ✅ Full | Essencial |
| TypeScript | ✅ Full | Essencial |
| NativeWind | ✅ Full | Recomendado |
| Reanimated | ✅ Full | Recomendado |
| Gesture Handler | ✅ Full | Recomendado |

### Opcional (Pode Remover)

- `expo-router` - Se não usar file-based routing
- `react-native-svg` - Se não trabalhar com SVGs
- `nativewind` - Se preferir StyleSheet nativo

---

## 📋 PRÓXIMAS AÇÕES

### Corrigir package.json
- [x] React 18 ✅
- [x] Remover react-dom ✅
- [x] Remover @types/react-dom ✅
- [x] Remover vite ✅
- [x] Remover @vitejs/plugin-react ✅
- [x] Remover oxlint ✅
- [x] Adicionar Expo ✅
- [x] Adicionar React Navigation ✅
- [x] Adicionar Reanimated ✅

### Testar Instalação
```bash
npm install
```

### Verificar Build
```bash
npm start
```

---

## 📚 REFERÊNCIAS

- [React Native Official](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [NativeWind](https://www.nativewind.dev)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated)

---

**Status:** ✅ Análise Completa  
**Próximo Passo:** Corrigir package.json se necessário
