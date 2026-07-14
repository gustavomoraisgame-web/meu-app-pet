# 📋 ETAPA 1 — AUDITORIA COMPLETA
**Status:** ✅ Análise Completa (SEM alterações de código)  
**Data:** 2026-07-14  
**Versão do Projeto:** React Web (Vite) → React Native (Expo)

---

## 📂 ESTRUTURA DE PASTAS

```
meu-app-pet/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
└── src/
    ├── main.jsx          (Entrada da aplicação)
    ├── App.jsx           (Componente principal - MONOLÍTICO)
    ├── App.css           (Estilos)
    ├── index.css         (Estilos globais)
    └── assets/           (Vazio)
```

---

## 📦 DEPENDÊNCIAS ATUAIS

### Production
- `react@^19.2.7`
- `react-dom@^19.2.7`

### Development
- `@types/react@^19.2.17`
- `@types/react-dom@^19.2.3`
- `@vitejs/plugin-react@^6.0.3`
- `oxlint@^1.71.0`
- `vite@^8.1.1`

**Observações:**
- Projeto usa JSX sem TypeScript (tipos apenas em dev)
- Muito mínimo em dependências
- Usando Vite como bundler

---

## 🏗️ ARQUITETURA ATUAL

### Componentes (1 único arquivo)

#### `App.jsx` (MONOLÍTICO)
- **Tipo:** Componente funcional React
- **Responsabilidade:** TUDO EM UM (estado, lógica, UI)
- **Estados principais:**
  - `telaAtual`: Controla navegação entre 'onboarding' e 'app'
  - `perfil`: Dados do usuário {nome, aniversario, signo}
  - `humorSelecionado`: Humor do dia
  - `diario`: Texto do diário
  - `tarefas`: Array de tarefas
  - `novaTarefa`: Input temporário
  - `abaAtiva`: Qual aba está visível ('Meu Dia', 'Diário', 'Calendário')
  - `menuAberto`: Estado do menu lateral

### Hooks Usados
- ✅ `useState` - Gerenciamento de estado local

### Contextos
- ❌ Nenhum (todo o estado está no App.jsx)

### Custom Hooks
- ❌ Nenhum

### Providers
- ❌ Nenhum (apenas React.StrictMode)

### Rotas
- ❌ Sem React Router
- ❌ Navegação por estado simples (telaAtual)

### Stores / State Management
- ❌ Sem Redux, Zustand, Recoil
- ❌ Tudo em useState

### Services / APIs
- ❌ Nenhum serviço externo
- ❌ Nenhuma chamada de API
- ❌ Tudo é local

### Autenticação
- ❌ Sem autenticação
- ❌ Sem usuários/login
- ❌ Sem tokens/sessões

### Armazenamento (Storage)
- ❌ Sem localStorage
- ❌ Sem sessionStorage
- ❌ Dados perdidos ao recarregar

### Validações
- ✅ Uma validação simples: `perfil.nome.trim() !== ''`
- ❌ Sem biblioteca de validação
- ❌ Sem schema validation

### Estilos
- ✅ CSS vanilla em `App.css` (150+ linhas)
- ✅ CSS global em `index.css`
- ❌ Sem CSS-in-JS
- ❌ Sem Tailwind
- ❌ Sem Styled Components
- ❌ Sem Sass/Scss

### Fontes / Assets
- ✅ Google Fonts (Nunito)
- ✅ Emojis Unicode
- ❌ Sem imagens
- ❌ Sem ícones customizados
- ❌ Sem assets na pasta `assets/`

---

## 📋 FUNCIONALIDADES IDENTIFICADAS

### 1️⃣ Tela de Onboarding
**Localização:** `App.jsx` (linhas 45-108)  
**Funcionalidades:**
- Input de nome
- Seletor de data de aniversário
- Dropdown de signos (12 signos do zodíaco)
- Validação simples de nome
- Botão "Começar jornada"
- Emojis temáticos

**Lógica:**
```javascript
if (telaAtual === 'onboarding') {
  // Retorna formulário de onboarding
}
```

### 2️⃣ Tela Principal (App)
**Localização:** `App.jsx` (linhas 109-300)

#### Seção Header
- Menu hamburger (abre menu lateral)
- Greeting personalizado com nome do usuário
- Espaçamento flexível

#### Menu Lateral (Drawer)
- Avatar com emoji
- Informações do perfil (nome, signo)
- Menu overlay (fechar ao clicar fora)
- 3 opções de menu:
  - ✏️ Editar Perfil
  - ⚙️ Configurações
  - 🐾 Meu Pet Virtual

#### Aba "Meu Dia" (Padrão)
**Seções:**
1. **Como você está se sentindo?**
   - 5 emojis/humores
   - Seleção única
   - Estados: Radiante 🌸, Feliz 🐰, Neutro 🐣, Pra baixo 🌧️, Cansada 🐨

2. **Diário**
   - Textarea grande
   - Placeholder inspirador
   - Estado `diario` armazena texto

3. **Coisinhas Importantes (TODO)**
   - Input com placeholder
   - Botão "+"
   - Enter para adicionar
   - Lista com checkbox visual (✅/⬜)
   - Click para marcar como concluída
   - Mensagem vazia: "Tudo em dia! Respira fundo 🫧"

#### Aba "Diário"
- Placeholder estático (vazio)
- Texto: "Suas memórias guardadas com carinho aparecerão aqui. 💌"

#### Aba "Calendário"
- Grid 7x5 (7 dias, até 31 dias)
- Headers com letras de dias (D, S, T, Q, Q, S, S)
- Apenas estrutura, sem interatividade

#### Bottom Navigation (Tab Bar)
- 3 abas: Meu Dia (🏠), Diário (📔), Calendário (🪴)
- Indicador de aba ativa
- Estilos diferenciados

---

## 🎨 ESTILOS E DESIGN

### Paleta de Cores
```css
background-color: #FFF9F2   (Bege claro)
color: #6D4C41              (Marrom escuro)
secundário: #A1887F         (Marrom médio)
accent: #F48FB1             (Rosa claro)
button: #F8BBD0             (Rosa botão)
text-button: #C2185B        (Rosa texto)
```

### Tipografia
- Font: Google Fonts "Nunito"
- Pesos: 400, 600, 700, 800
- Spacing: letter-spacing com 1px em uppercase

### Componentes CSS
- `.app-container`: Container principal (max-width: 420px)
- `.card`: Cards com sombra (box-shadow)
- `.cute-input`: Inputs rounded
- `.cute-button`: Botões com hover effect (scale)
- `.mood-item`: Items do humor com hover
- `.todo-item`: Items da lista com estado completed
- `.bottom-nav`: Navegação fixa no final
- `.side-menu`: Menu lateral com transform
- `.menu-overlay`: Overlay semi-transparente

---

## ✅ O QUE PODE SER REAPROVEITADO 100%

### Lógica
1. ✅ **Fluxo de onboarding** - Validação e armazenamento de perfil
2. ✅ **Gerenciamento de tarefas** - Adicionar, marcar concluída
3. ✅ **Seleção de humor** - Estado simples
4. ✅ **Texto do diário** - Input de texto livre
5. ✅ **Navegação entre abas** - Lógica de estado

### Dados
1. ✅ **Estrutura do perfil** - {nome, aniversario, signo}
2. ✅ **Estrutura da tarefa** - {id, texto, concluida}
3. ✅ **Validações** - Regra de nome não-vazio
4. ✅ **Lista de signos** - 12 signos com emojis

### Componentes/Padrões
1. ✅ **Emojis Unicode** - Podem ser mantidos
2. ✅ **Estrutura de abas** - Padrão simple
3. ✅ **Menu lateral** - Padrão drawer

---

## ⚠️ O QUE PRECISA SER ADAPTADO

### Para React Native
1. 🔄 **Inputs HTML → TextInput**
   - `<input type="text">` → `<TextInput />`
   - `<input type="date">` → Picker ou DateTime library
   - `<select>` → Picker
   - `<textarea>` → `<TextInput multiline />`

2. 🔄 **Buttons HTML → TouchableOpacity/Pressable**
   - `<button>` → `<TouchableOpacity>` ou `<Pressable>`

3. 🔄 **Divs → View**
   - `<div>` → `<View>`

4. 🔄 **Texto → Text**
   - Texto direto → `<Text>`

5. 🔄 **CSS → StyleSheet**
   - CSS vanilla → `StyleSheet.create()` ou NativeWind/Tailwind

6. 🔄 **Scroll → ScrollView**
   - Implicit scrolling → `<ScrollView>` explícito

7. 🔄 **Menu Drawer → React Navigation Drawer**
   - Drawer customizado → `@react-navigation/drawer`

8. 🔄 **Bottom Tab Nav → React Navigation Bottom Tabs**
   - Navegação customizada → `@react-navigation/bottom-tabs`

9. 🔄 **Navegação entre telas → Stack Navigation**
   - Estado `telaAtual` → `@react-navigation/native-stack`

---

## ❌ O QUE PRECISA SER SUBSTITUÍDO

### Não existe em React Native
1. ❌ **Vite** → Metro (Expo) ou React Native CLI
2. ❌ **React DOM** → React Native
3. ❌ **Box Model DOM** → Yoga Layout
4. ❌ **Browser APIs** → React Native/Expo APIs
5. ❌ **Hover States** → Press states
6. ❌ **CSS Media Queries** → Dimensions API

---

## 🚨 O QUE NÃO EXISTE E PRECISA DE ALTERNATIVA

### Persistência
- ❌ Dados DESAPARECEM ao fechar app
- ✅ **Solução:** AsyncStorage ou Expo SecureStore

### Navegação
- ❌ Sem rotas declarativas
- ✅ **Solução:** React Navigation com Stack, Drawer, Bottom Tabs

### Data/Hora
- ❌ Input `type="date"` não existe
- ✅ **Solução:** DateTimePickerAndroid + DateTimePicker iOS (expo-date-picker)

### Responsividade
- ✅ Layout já é mobile-first
- ⚠️ **Verificar:** Comportamento em diferentes tamanhos

### Web vs Native
- ❌ `window`, `document` não existem
- ❌ `localStorage` não funciona igual
- ✅ **Solução:** AsyncStorage

---

## 🔍 ANÁLISE DE RISCO

### 🟢 Baixo Risco
- ✅ Projeto simples
- ✅ Sem dependências externas complexas
- ✅ Sem APIs remotas
- ✅ Lógica bem clara
- ✅ Estado simples

### 🟡 Médio Risco
- ⚠️ Tudo em um arquivo (precisa de decomposição)
- ⚠️ Sem persistência (dados perdem ao sair do app)
- ⚠️ CSS precisa ser traduzido para React Native
- ⚠️ Data picker tem diferenças iOS/Android

### 🔴 Alto Risco
- ❌ Sem testes
- ❌ Sem tipos TypeScript
- ❌ Sem tratamento de erros
- ❌ Menu drawer customizado (precisa de React Navigation)

---

## 📊 RESUMO EXECUTIVO

### Antes (React Web)
```
1 componente monolítico
2 arquivos CSS
0 hooks customizados
0 contextos
0 serviços
0 APIs
0 persistência
~300 linhas de código
```

### Depois (React Native Expo)
```
~10+ componentes pequenos
StyleSheet nativo
2-3 custom hooks (usePerfil, useTarefas, useDiario)
1 contexto (PerfildContext)
AsyncStorage para persistência
React Navigation para navegação
~600-800 linhas de código (melhor organizado)
```

---

## 📈 PRÓXIMAS ETAPAS (SEM FAZER AGORA)

1. **ETAPA 2:** Configurar projeto Expo
2. **ETAPA 3:** Migrar estrutura e dependências
3. **ETAPA 4:** Adaptar componentes
4. **ETAPA 5:** Adaptar navegação
5. **ETAPA 6:** Adaptar estilos
6. **ETAPA 7:** Persistência
7. **ETAPA 8:** Testes

---

## ✨ CONFIRMAÇÕES

### Regras Seguidas
- ✅ Nenhum código foi alterado
- ✅ Nenhum arquivo foi criado/deletado
- ✅ Apenas documentação foi gerada
- ✅ Análise completa e detalhada

### Pronto Para
- ✅ Próxima etapa de configuração
- ✅ Revisão do plano
- ✅ Validação com usuário

---

**Fim da ETAPA 1**  
Aguardando confirmação para prosseguir com ETAPA 2.
