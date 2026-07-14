# Guia de Aliases TypeScript

Os aliases estão configurados no `tsconfig.json` para facilitar imports.

## Aliases Disponíveis

| Alias | Caminho | Uso |
|-------|---------|-----|
| `@/*` | `src/*` | Root src |
| `@components/*` | `src/components/*` | Componentes |
| `@screens/*` | `src/screens/*` | Telas |
| `@navigation/*` | `src/navigation/*` | Navegação |
| `@context/*` | `src/context/*` | Contextos |
| `@hooks/*` | `src/hooks/*` | Custom Hooks |
| `@utils/*` | `src/utils/*` | Utilitários |
| `@constants/*` | `src/constants/*` | Constantes |
| `@theme/*` | `src/theme/*` | Tema |
| `@services/*` | `src/services/*` | Serviços |
| `@types/*` | `src/types/*` | Tipos |

## Exemplos de Uso

```typescript
// ❌ Evitar paths relativos longos
import { usePerfil } from '../../../hooks';

// ✅ Usar aliases
import { usePerfil } from '@hooks/index';

// ❌ Evitar
import Button from '../../../components/Button';

// ✅ Usar
import Button from '@components/Button';

// ❌ Evitar
import { Colors } from '../../../theme';

// ✅ Usar
import { Colors } from '@theme/index';
```

## Benefícios

1. **Imports limpos** - Sem `../../../`
2. **Refatoração fácil** - Mover pastas não quebra imports
3. **Melhor legibilidade** - Sabe-se exatamente onde está o arquivo
4. **Menos erros** - IDE completa melhor com aliases
