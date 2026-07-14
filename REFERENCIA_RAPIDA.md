# 📋 REFERÊNCIA RÁPIDA: REACT WEB → REACT NATIVE

## 🎯 Conversão de Conceitos em uma Folha

### Componentes

| React Web | React Native | Uso |
|-----------|--------------|-----|
| `<div>` | `<View>` | Container |
| `<p>, <h1>, <span>` | `<Text>` | Texto |
| `<input type="text">` | `<TextInput>` | Input |
| `<button>` | `<TouchableOpacity>`, `<Pressable>` | Botão |
| `<select>` | `<Picker>` | Dropdown |
| `<textarea>` | `<TextInput multiline>` | Área texto |
| `<img>` | `<Image>` | Imagem |
| `<ul>, <li>` | `<FlatList>, <SectionList>` | Listas |
| `<scroll>` | `<ScrollView>` | Scroll |
| `<form>` | `<Form>` (Formik) | Formulário |

### Eventos

| React Web | React Native |
|-----------|--------------|
| `onClick` | `onPress` |
| `onChange` | `onChangeText`, `onValueChange` |
| `onSubmit` | `onEndEditing`, `onSubmitEditing` |
| `onFocus` | `onFocus` |
| `onBlur` | `onBlur` |
| `onKeyDown` | (não existe, usar `onSubmitEditing`) |

### Estilos

| React Web | React Native |
|-----------|--------------|
| CSS classes | `StyleSheet.create()` ou `className` (NativeWind) |
| `style={{ color: 'red' }}` | `style={{ color: 'red' }}` |
| Responsive | `Dimensions` API ou `useWindowDimensions` |
| Media queries | `Dimensions` API |
| Hover | `onPressIn` / `onPressOut` |

### Estado & Lifecycle

| React Web | React Native |
|-----------|--------------|
| `useState` | `useState` (igual) |
| `useEffect` | `useEffect` (igual) |
| `Context` | `Context` (igual) |
| `useRef` | `useRef` (igual) |
| `useCallback` | `useCallback` (igual) |

### Storage

| React Web | React Native |
|-----------|--------------|
| `localStorage.setItem()` | `AsyncStorage.setItem()` (async) |
| `localStorage.getItem()` | `AsyncStorage.getItem()` (async) |
| `localStorage.removeItem()` | `AsyncStorage.removeItem()` (async) |
| Síncrono | **Assíncrono** ⚠️ |

### Navegação

| React Web | React Native |
|-----------|--------------|
| `react-router-dom` | `@react-navigation/native` |
| `<BrowserRouter>` | `<NavigationContainer>` |
| `<Routes>` | `<Stack.Navigator>`, `<Tab.Navigator>` |
| `<Route>` | `<Stack.Screen>`, `<Tab.Screen>` |
| `useNavigate()` | `useNavigation()` |
| URL params | Route params |

### Tipos TypeScript

| React Web | React Native |
|-----------|--------------|
| `@types/react` | `@types/react` + `@types/react-native` |
| `React.FC<Props>` | `React.FC<Props>` (igual) |
| React DOM types | NativeStackScreenProps, etc |

---

## 🔄 Exemplos de Conversão

### Exemplo 1: Input e Button

```typescript
// ❌ React Web
<input 
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Nome"
/>
<button onClick={handleSubmit}>Enviar</button>

// ✅ React Native
<TextInput 
  value={name}
  onChangeText={setName}
  placeholder="Nome"
  style={styles.input}
/>
<TouchableOpacity onPress={handleSubmit}>
  <Text>Enviar</Text>
</TouchableOpacity>
```

### Exemplo 2: Select

```typescript
// ❌ React Web
<select value={signo} onChange={(e) => setSigno(e.target.value)}>
  <option value="">Selecione</option>
  <option value="Áries">Áries ♈</option>
</select>

// ✅ React Native
<Picker value={signo} onValueChange={setSigno}>
  <Picker.Item label="Selecione" value="" />
  <Picker.Item label="Áries ♈" value="Áries" />
</Picker>
```

### Exemplo 3: Storage

```typescript
// ❌ React Web (síncrono)
localStorage.setItem('perfil', JSON.stringify(perfil))
const data = localStorage.getItem('perfil')

// ✅ React Native (assíncrono)
await AsyncStorage.setItem('perfil', JSON.stringify(perfil))
const data = await AsyncStorage.getItem('perfil')
```

### Exemplo 4: Lista

```typescript
// ❌ React Web
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>

// ✅ React Native
<FlatList
  data={items}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/>
```

### Exemplo 5: Navegação

```typescript
// ❌ React Web
import { useNavigate } from 'react-router-dom'
const navigate = useNavigate()
navigate('/home')

// ✅ React Native
import { useNavigation } from '@react-navigation/native'
const navigation = useNavigation()
navigation.navigate('Home')
```

---

## ✅ CHECKLIST DE CONVERSÃO

Ao migrar um componente, verificar:

- [ ] Todos os `<div>` viraram `<View>`?
- [ ] Todos os textos estão em `<Text>`?
- [ ] Inputs são `<TextInput>`?
- [ ] Botões são `<TouchableOpacity>` ou `<Pressable>`?
- [ ] onClick virou onPress?
- [ ] onChange virou onChangeText?
- [ ] CSS virou `StyleSheet` ou `className` (NativeWind)?
- [ ] localStorage virou AsyncStorage (async)?
- [ ] Listas são `<FlatList>`?
- [ ] Navegação usa React Navigation?
- [ ] Sem DOM APIs (`document`, `window`, etc)?
- [ ] Sem `<img>` - usar `<Image>`?
- [ ] Types estão corretos?

---

## 📦 IMPORTAÇÕES COMUNS

```typescript
// React Native Core
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native'

// Expo
import { StatusBar } from 'expo-status-bar'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'

// React
import React, { useState, useEffect, useContext } from 'react'

// TypeScript
import React, { FC } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
```

---

## 🚨 ARMADILHAS COMUNS

### 1. Esquecer de async/await no AsyncStorage
```typescript
// ❌ Errado
const data = AsyncStorage.getItem('key')

// ✅ Correto
const data = await AsyncStorage.getItem('key')
```

### 2. Usar onClick ao invés de onPress
```typescript
// ❌ Errado
<TouchableOpacity onClick={handler}>

// ✅ Correto
<TouchableOpacity onPress={handler}>
```

### 3. TextInput sem height
```typescript
// ❌ Errado
<TextInput />

// ✅ Correto
<TextInput style={{ height: 40 }} />
```

### 4. Esquecer flex em Views
```typescript
// ❌ Errado (não ocupa espaço)
<View>
  <ScrollView>
    {items}
  </ScrollView>
</View>

// ✅ Correto
<View style={{ flex: 1 }}>
  <ScrollView>
    {items}
  </ScrollView>
</View>
```

### 5. Padding números como strings
```typescript
// ❌ Errado
<View style={{ padding: '16px' }} />

// ✅ Correto
<View style={{ padding: 16 }} />
```

### 6. Valores de cores com string
```typescript
// ✅ Ambos funcionam
style={{ backgroundColor: '#FFF9F2' }}
style={{ backgroundColor: 'white' }}
```

---

## 📞 QUICK REFERENCE

```
Componente?           → View, Text, TextInput, etc
Evento?              → onPress, onChangeText, etc
Storage?             → AsyncStorage (async)
Navegação?           → React Navigation
Estilos?             → StyleSheet ou NativeWind
Tipos?               → @types/react-native
Precisa scrollar?    → ScrollView ou FlatList
Imagem?              → <Image> com source
Ícones?              → @expo/vector-icons
Animações?           → react-native-reanimated
Gestos?              → react-native-gesture-handler
```

---

**Referência Rápida v1.0**  
**Última Atualização:** 2026-07-14  
**Para Usar:** Consultar quando migrar componentes
