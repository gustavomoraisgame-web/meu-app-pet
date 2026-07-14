# 🌸 Meu App Pet - React Native (Expo)

## 📱 Descrição

Aplicativo de bem-estar feminino com React Native usando Expo, com foco em gerenciamento de tarefas, diário e humor.

## 🚀 Stack Tecnológico

- **React Native** 0.73
- **Expo** 51
- **TypeScript** 5.3
- **React Navigation** 6
- **NativeWind** (Tailwind CSS para React Native)
- **AsyncStorage** (Persistência de dados)
- **React Native Reanimated** (Animações)
- **Gesture Handler** (Gestos)

## 📁 Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
├── screens/            # Telas da aplicação
├── navigation/         # Configuração de rotas
├── context/            # Context API
├── hooks/              # Custom hooks
├── utils/              # Funções utilitárias
├── constants/          # Constantes da aplicação
├── theme/              # Design tokens (cores, spacing, etc)
├── services/           # Serviços e APIs
├── types/              # Tipos TypeScript
└── providers/          # Providers (contextos, temas, etc)
```

## 🔧 Configuração

### Instalação

```bash
npm install
# ou
yarn install
```

### Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

### Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa na web
- `npm run lint` - Verifica erros de linting
- `npm run lint:fix` - Corrige erros de linting
- `npm run format` - Formata o código com Prettier

## 📋 Contextos Disponíveis

### PerfilContext

Gerencia os dados do perfil do usuário:

```typescript
usePerfil() // hook para usar o contexto
```

### TarefasContext

Gerencia a lista de tarefas:

```typescript
useTarefas() // hook para usar o contexto
```

### DiarioContext

Gerencia o diário e humor do dia:

```typescript
useDiario() // hook para usar o contexto
```

## 🎨 Tema

O tema está centralizado em `src/theme/index.ts` com:

- **Cores**: Paleta de cores da aplicação
- **Spacing**: Valores de espaçamento
- **Typography**: Estilos de tipografia
- **BorderRadius**: Valores de border radius

## 📦 Componentes Principais

(Documentação será adicionada quando os componentes forem criados)

## 🔐 Armazenamento

A aplicação usa **AsyncStorage** para persistência de dados:

- Perfil do usuário
- Lista de tarefas
- Diário
- Humor

## 🚀 Deploy

### Build Android

```bash
eas build --platform android
```

### Build iOS

```bash
eas build --platform ios
```

## 📝 Licença

Proprietary - Todos os direitos reservados

## 👨‍💻 Desenvolvedor

Gustavo Morais
