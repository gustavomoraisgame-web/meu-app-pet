/**
 * TIPOS BÁSICOS DA APLICAÇÃO
 */

export interface Perfil {
  nome: string;
  aniversario: string;
  signo: Signo;
}

export type Signo =
  | 'Áries'
  | 'Touro'
  | 'Gêmeos'
  | 'Câncer'
  | 'Leão'
  | 'Virgem'
  | 'Libra'
  | 'Escorpião'
  | 'Sagitário'
  | 'Capricórnio'
  | 'Aquário'
  | 'Peixes';

export interface Tarefa {
  id: number;
  texto: string;
  concluida: boolean;
  dataCriacao?: Date;
  dataConclusa?: Date;
  descricao?: string;
  prioridade?: 'alta' | 'media' | 'baixa';
  tags?: string[];
}

export type Humor = 'Radiante' | 'Feliz' | 'Neutro' | 'Pra baixo' | 'Cansada';

export interface HumorOption {
  emoji: string;
  nome: Humor;
}

export interface Aba {
  id: string;
  label: string;
  icon: string;
}

/**
 * TIPOS DE DIÁRIO
 */

export interface EntradaDiario {
  id: string;
  usuarioId?: string;
  conteudo: string;
  humor: Humor;
  data: Date;
  tags?: string[];
  privada?: boolean;
}

/**
 * TIPOS DE USUÁRIO ESTENDIDOS
 */

export interface PerfilCompleto extends Perfil {
  id?: string;
  email?: string;
  fotoPerfil?: string;
  dataCriacao?: Date;
  ultimaAtualizacao?: Date;
  configuracoes?: ConfiguracaoUsuario;
}

export interface ConfiguracaoUsuario {
  notificacoes: boolean;
  tema: 'light' | 'dark' | 'auto';
  idioma: string;
  privacidade: 'privada' | 'publica';
}

/**
 * TIPOS DE NOTIFICAÇÃO
 */

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'sucesso' | 'erro' | 'aviso' | 'info';
  timestamp: Date;
  lida?: boolean;
}

/**
 * TIPOS DE VALIDAÇÃO
 */

export interface ValidationResult {
  valid: boolean;
  errors?: Record<string, string>;
  warnings?: Record<string, string>;
}

/**
 * TIPOS DE API/RESPOSTA
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
  timestamp?: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * TIPOS DE ESTADO GLOBAL
 */

export interface AppState {
  perfil: Perfil | null;
  isLoading: boolean;
  error: string | null;
  isOnboarded: boolean;
}

/**
 * TIPOS DE EVENTO/ACTION
 */

export type AppAction =
  | { type: 'SET_PERFIL'; payload: Perfil }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };

/**
 * TIPOS DE FORMULÁRIO
 */

export interface FormField<T = any> {
  name: string;
  value: T;
  error?: string;
  touched?: boolean;
  isDirty?: boolean;
}

export interface FormState<T extends Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

/**
 * TIPOS DE ASYNC
 */

export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

export interface AsyncState<T, E = Error> {
  status: AsyncStatus;
  data: T | null;
  error: E | null;
}

/**
 * TIPOS DE ANALYTICS
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

/**
 * TIPOS DE ERRO
 */

export interface CustomError extends Error {
  code?: string;
  statusCode?: number;
  isCustom?: true;
}

/**
 * TIPOS UTILITÁRIOS
 */

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
