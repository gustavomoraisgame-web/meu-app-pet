# 📊 TABELA RÁPIDA DE CONVERSÃO
**React Web → React Native Expo**

## 🎯 RESUMO EM UMA TABELA

```
┌─────────────────────────────────────┬──────────────────────────────────┐
│ REACT WEB (Original)                │ REACT NATIVE (Novo)              │
├─────────────────────────────────────┼──────────────────────────────────┤
│ react                               │ react                            │
│ react-dom ❌                        │ (não necessário)                 │
│ vite ❌                             │ expo (bundler)                   │
│ @vitejs/plugin-react ❌            │ babel-preset-expo                │
│ oxlint ❌                           │ eslint                           │
│                                     │                                  │
│ (novo)                              │ react-native                     │
│ (novo)                              │ @react-navigation/*              │
│ (novo)                              │ react-native-reanimated          │
│ (novo)                              │ react-native-gesture-handler     │
│ (novo)                              │ @expo/vector-icons               │
│ (novo)                              │ nativewind + tailwindcss          │
└─────────────────────────────────────┴──────────────────────────────────┘
```

---

## 📱 COMPONENTES HTML → REACT NATIVE

```
┌──────────────────────┬────────────────────────┬─────────────────────┐
│ HTML/React Web       │ React Native           │ Exemplo             │
├──────────────────────┼────────────────────────┼─────────────────────┤
│ <div>                │ <View>                 │ Container           │
│ <p>, <h1>, etc       │ <Text>                 │ Texto               │
│ <input>              │ <TextInput>            │ Input               │
│ <button>             │ <TouchableOpacity>     │ Botão               │
│ <select>             │ <Picker>               │ Dropdown            │
│ <textarea>           │ <TextInput multiline>  │ Área de texto       │
│ <img>                │ <Image>                │ Imagem              │
│ <scroll>             │ <ScrollView>           │ Scroll              │
│ <form>               │ <Form> (Formik)        │ Formulário          │
│ React Router         │ React Navigation       │ Rotas               │
│ localStorage         │ AsyncStorage           │ Armazenamento       │
│ CSS Classes          │ StyleSheet/NativeWind  │ Estilos             │
│ onClick              │ onPress                │ Eventos             │
│ hover                │ onPressIn/Out          │ Estados             │
└──────────────────────┴────────────────────────┴─────────────────────┘
```

---

## 🔧 UTILITÁRIOS CONVERSÃO

```javascript
// ❌ React Web
import styles from './App.css'
function App() {
  const [state, setState] = useState(0)
  
  return (
    <div className="container">
      <p>Olá</p>
      <button onClick={() => setState(1)}>Clique</button>
    </div>
  )
}

// ✅ React Native
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'

function App() {
  const [state, setState] = useState(0)
  
  return (
    <View style={styles.container}>
      <Text>Olá</Text>
      <TouchableOpacity onPress={() => setState(1)}>
        <Text>Clique</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  }
})
```

---

## 📦 DEPENDÊNCIAS INSTALADAS (ATUAIS)

### Production (20)
✅ react  
✅ react-native  
✅ expo  
✅ expo-router  
✅ expo-font  
✅ expo-splash-screen  
✅ expo-status-bar  
✅ expo-async-storage  
✅ react-native-gesture-handler  
✅ react-native-reanimated  
✅ @react-navigation/native  
✅ @react-navigation/native-stack  
✅ @react-navigation/bottom-tabs  
✅ @react-navigation/drawer  
✅ react-native-screens  
✅ react-native-safe-area-context  
✅ react-native-svg  
✅ @expo/vector-icons  
✅ nativewind  
✅ tailwindcss  

### Development (12)
✅ @types/react  
✅ @types/react-native  
✅ @types/node  
✅ typescript  
✅ eslint  
✅ @typescript-eslint/eslint-plugin  
✅ @typescript-eslint/parser  
✅ prettier  
✅ prettier-plugin-tailwindcss  
✅ @babel/core  
✅ expo-cli  
✅ babel-preset-expo (implicit via expo)

---

## ⚡ BIBLIOTECAS REMOVIDAS (NÃO FUNCIONAM EM RN)

| Biblioteca | Razão | Alternativa |
|-----------|-------|-----------|
| `react-dom` | DOM não existe em RN | React Native components |
| `@types/react-dom` | Tipos de DOM | @types/react-native |
| `vite` | Bundler web-only | Expo (Metro) |
| `@vitejs/plugin-react` | Plugin Vite | babel-preset-expo |
| `oxlint` | Não suporta RN bem | ESLint + @typescript-eslint |

---

## 🚀 PRÓXIMAS DEPENDÊNCIAS (Quando Necessário)

| Caso de Uso | Biblioteca | Tipo |
|-----------|-----------|------|
| Datas complexas | `date-fns` | Util |
| Câmera/Fotos | `expo-image-picker` | Expo |
| Notificações | `expo-notifications` | Expo |
| Permissões | `expo-permissions` | Expo |
| Mapas | `react-native-maps` | Native |
| Tabelas | `react-native-table-component` | UI |
| Modal melhorado | `react-native-modal` | UI |
| Validators | `yup` ou `zod` | Util |

---

## ✅ STATUS FINAL

- ✅ Todas as dependências verificadas
- ✅ Nenhuma biblioteca incompatível
- ✅ 32 dependências totais (bem dimensionadas)
- ✅ Package.json otimizado para React Native
- ✅ Pronto para `npm install`

---

**Última Atualização:** 2026-07-14  
**Próximo Passo:** Instalar dependências
