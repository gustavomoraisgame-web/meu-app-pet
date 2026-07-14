# 📊 TABELA MASTER — REACT WEB ↔ REACT NATIVE
**Versão Impressível / Consulta Rápida**

---

## 🎯 CONVERSÃO PRINCIPAL (32 Dependências)

```
┌────────────────────────────────┬──────────────────────────────────┐
│ REACT WEB (Antes)              │ REACT NATIVE (Depois)            │
├────────────────────────────────┼──────────────────────────────────┤
│ react 19.2.7                   │ react 18.2.0 ⬇️                  │
│ react-dom 19.2.7 ❌            │ (removido)                       │
│ vite 8.1.1 ❌                  │ expo 51.0.0 ✅                   │
│ @vitejs/plugin-react 6.0.3 ❌  │ babel-preset-expo (via expo) ✅  │
│ oxlint 1.71.0 ❌               │ eslint 8.54.0 ✅                 │
│                                │                                  │
│ (dev only)                     │ (production)                     │
│ @types/react 19.2.17           │ @types/react 18.2.0              │
│ @types/react-dom 19.2.3 ❌     │ (removido)                       │
│                                │ @types/react-native 0.73.0 ✅   │
│                                │ @types/node 20.0.0 ✅            │
│                                │                                  │
│ (novo)                         │ react-native 0.73.0              │
│ (novo)                         │ @react-navigation/native 6.1.0   │
│ (novo)                         │ @react-navigation/native-stack   │
│ (novo)                         │ @react-navigation/bottom-tabs    │
│ (novo)                         │ @react-navigation/drawer 6.6.0   │
│ (novo)                         │ react-native-gesture-handler     │
│ (novo)                         │ react-native-reanimated 3.6.0    │
│ (novo)                         │ react-native-screens 3.27.0      │
│ (novo)                         │ react-native-safe-area-context   │
│ (novo)                         │ react-native-svg 13.14.0         │
│ (novo)                         │ @expo/vector-icons 14.0.0        │
│ (novo)                         │ nativewind 2.0.0                 │
│ (novo)                         │ tailwindcss 3.4.0                │
│ (novo)                         │ expo-font 12.0.0                 │
│ (novo)                         │ expo-splash-screen 0.27.0        │
│ (novo)                         │ expo-status-bar 1.12.0           │
│ (novo)                         │ expo-async-storage 2.0.0         │
│ (novo)                         │ @typescript-eslint/* (2 libs)    │
│ (novo)                         │ prettier 3.1.0                   │
│ (novo)                         │ prettier-plugin-tailwindcss      │
│ (novo)                         │ @babel/core 7.23.0               │
│ (novo)                         │ expo-cli 6.3.0                   │
└────────────────────────────────┴──────────────────────────────────┘
```

---

## 📱 COMPONENTES

```
HTML/REACT WEB          →    REACT NATIVE          →    PROPRIEDADE
─────────────────────────────────────────────────────────────────────
<div>                   →    <View>                →    flex, padding
<p>, <h1>, <span>       →    <Text>                →    fontSize, color
<input type="text">     →    <TextInput>           →    value, onChange
<input type="date">     →    <Picker>/<Modal>     →    selectedValue
<button>                →    <TouchableOpacity>    →    onPress
<select>                →    <Picker>              →    selectedValue
<textarea>              →    <TextInput multiline> →    multiline={true}
<img>                   →    <Image>               →    source={{ uri }}
<ul>, <li>              →    <FlatList>            →    data, renderItem
<a href="">             →    <TouchableOpacity>    →    navigation
<form>                  →    Formik + Components  →    onSubmit
```

---

## 🎛️ PROPS E EVENTOS

```
EVENTO/PROP         REACT WEB           →    REACT NATIVE
──────────────────────────────────────────────────────────
Click               onClick()           →    onPress()
Change              onChange()          →    onChangeText()
Text Input          e.target.value      →    value (direto)
Form Submit         onSubmit()          →    onSubmitEditing()
Focus               onFocus()           →    onFocus()
Blur                onBlur()            →    onBlur()
Hover               :hover (CSS)        →    onPressIn/Out
Double Click        onDoubleClick()     →    (usar onPress count)
```

---

## 🎨 ESTILOS

```
REACT WEB                           REACT NATIVE
─────────────────────────────────────────────────────────
className="container"               style={styles.container}
style={{ color: 'red' }}           style={{ color: 'red' }}
CSS Media Queries                   Dimensions API
@media (max-width: 480px)          const { width } = useWindowDimensions()
Hover Effects                       onPressIn/onPressOut
Flexbox (Web)                       Flexbox (RN - igual)
Padding: "10px"                     padding: 10 (sem 'px')
Units: px, em, %                    Numbers only
```

---

## 💾 STORAGE

```
REACT WEB (SYNC)                    REACT NATIVE (ASYNC)
─────────────────────────────────────────────────────────
localStorage.setItem('k', v)        await AsyncStorage.setItem('k', v)
const v = localStorage.getItem('k') const v = await AsyncStorage.getItem('k')
localStorage.removeItem('k')        await AsyncStorage.removeItem('k')

⚠️ IMPORTANTE: Tudo em RN é ASSÍNCRONO (await)
```

---

## 🗺️ NAVEGAÇÃO

```
REACT WEB               →    REACT NATIVE
─────────────────────────────────────────────────────────
react-router-dom        →    @react-navigation/native
<BrowserRouter>         →    <NavigationContainer>
<Routes>                →    <Stack.Navigator>
<Route>                 →    <Stack.Screen>
useNavigate()           →    useNavigation()
navigate('/home')       →    navigate('Home')
```

---

## 📦 IMPORT MAIS COMUNS

```javascript
// React Native Core
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { FlatList, ScrollView, Alert, ActivityIndicator } from 'react-native'

// Expo
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import * as Font from 'expo-font'

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'

// React (igual ao web)
import React, { useState, useEffect, useContext } from 'react'
```

---

## ⚠️ ARMADILHAS (Não fazer!)

```
❌ ERRADO                          ✅ CORRETO
─────────────────────────────────────────────────────────
const v = localStorage.getItem()   const v = await AsyncStorage.getItem()
<TouchableOpacity onClick={h}>     <TouchableOpacity onPress={h}>
<TextInput />                      <TextInput style={{ height: 40 }} />
value: onChange={e => setVal()}    value, onChangeText={setVal}
padding: '16px'                    padding: 16
Document.getElementById()          Props / State / Context
window.location.href               navigation.navigate()
<img src=""/>                       <Image source={{ uri: '' }}/>
```

---

## 📊 COMPARAÇÃO RÁPIDA

```
                    REACT WEB          REACT NATIVE
────────────────────────────────────────────────────────
Runtime             Browser            Native (iOS/Android)
Layout              CSS Box Model      Yoga Layout
Storage             localStorage       AsyncStorage (async)
Components          HTML               Native Components
Events              onClick, onChange  onPress, onChangeText
Styling             CSS Files          StyleSheet.create()
Units               px, em, %          Numbers only
Navigation          React Router       React Navigation
Debugging           Browser DevTools   Debugger / Logs
Performance         ~60fps              60fps (native)
Package Size        Varies             ~800MB (node_modules)
```

---

## 🚀 CHECKLIST PARA MIGRAR COMPONENTE

- [ ] Remover `import React from 'react'` (não necessário em RN)
- [ ] Converter `<div>` → `<View>`
- [ ] Converter texto → `<Text>`
- [ ] Converter `onclick` → `onpress`
- [ ] Converter `value` → `onChangeText` (TextInput)
- [ ] Remover CSS classes
- [ ] Usar `StyleSheet.create()`
- [ ] Remover localStorage (usar AsyncStorage + async/await)
- [ ] Converter `<img>` → `<Image>`
- [ ] Verificar que não usa DOM APIs
- [ ] Testar em simulador/device

---

## 📚 ARQUIVOS DE REFERÊNCIA NO PROJETO

1. **DEPENDENCIAS_ANALISE.md** - Análise profunda
2. **TABELA_CONVERSAO.md** - Conversão visual
3. **REFERENCIA_RAPIDA.md** - Exemplos práticos
4. **CHECKLIST_DEPENDENCIAS.md** - Verificação completa

---

## 📞 QUICK REFERENCE FINAL

```
Qual componente usar?        → View, Text, TextInput, etc
Qual evento?                 → onPress, onChangeText
Storage?                     → AsyncStorage (+ await)
Navegação?                   → React Navigation
Estilos?                     → StyleSheet ou NativeWind
Imagem?                      → <Image source={{ uri }}/>
Ícones?                      → @expo/vector-icons
Lista?                       → <FlatList data, renderItem/>
Scroll?                      → <ScrollView> ou <FlatList>
Animações?                   → react-native-reanimated
Precisa testar?              → npm start
```

---

**Versão:** 1.0  
**Data:** 2026-07-14  
**Para Imprimir:** Página simples, ótima para ter na mesa

✅ **ETAPA 3 CONCLUÍDA**
