/**
 * CONSTANTES DE ERRO E MENSAGENS
 */

/**
 * Códigos de Erro da Aplicação
 */
export const ERROR_CODES = {
  // Geral
  UNKNOWN: 'UNKNOWN_ERROR',
  GENERIC: 'GENERIC_ERROR',

  // Validação
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PHONE: 'INVALID_PHONE',
  WEAK_PASSWORD: 'WEAK_PASSWORD',

  // Autenticação
  AUTH_FAILED: 'AUTH_FAILED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',

  // Autorização
  UNAUTHORIZED: 'UNAUTHORIZED',
  PERMISSION_DENIED: 'PERMISSION_DENIED',

  // Recursos
  NOT_FOUND: 'NOT_FOUND',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',

  // Rede
  NETWORK_ERROR: 'NETWORK_ERROR',
  OFFLINE: 'OFFLINE',
  TIMEOUT: 'TIMEOUT',
  CONNECTION_LOST: 'CONNECTION_LOST',

  // Servidor
  SERVER_ERROR: 'SERVER_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',

  // Dados
  DATA_CORRUPTED: 'DATA_CORRUPTED',
  INVALID_DATA: 'INVALID_DATA',
  SYNC_FAILED: 'SYNC_FAILED',
  STORAGE_FULL: 'STORAGE_FULL',

  // Business Logic
  TASK_LIMIT_EXCEEDED: 'TASK_LIMIT_EXCEEDED',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  INVALID_STATE: 'INVALID_STATE',
};

/**
 * Mensagens de Erro
 */
export const ERROR_MESSAGES = {
  [ERROR_CODES.UNKNOWN]: 'Algo deu errado. Tente novamente mais tarde.',
  [ERROR_CODES.VALIDATION_FAILED]: 'Verifique os dados e tente novamente.',
  [ERROR_CODES.REQUIRED_FIELD]: 'Este campo é obrigatório.',
  [ERROR_CODES.INVALID_FORMAT]: 'Formato inválido.',
  [ERROR_CODES.INVALID_EMAIL]: 'E-mail inválido.',
  [ERROR_CODES.WEAK_PASSWORD]: 'Senha fraca. Use maiúsculas, números e símbolos.',
  [ERROR_CODES.AUTH_FAILED]: 'Falha na autenticação.',
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Usuário ou senha incorretos.',
  [ERROR_CODES.SESSION_EXPIRED]: 'Sua sessão expirou. Faça login novamente.',
  [ERROR_CODES.NOT_AUTHENTICATED]: 'Você precisa fazer login.',
  [ERROR_CODES.UNAUTHORIZED]: 'Você não tem permissão para esta ação.',
  [ERROR_CODES.NOT_FOUND]: 'Recurso não encontrado.',
  [ERROR_CODES.ALREADY_EXISTS]: 'Este recurso já existe.',
  [ERROR_CODES.NETWORK_ERROR]: 'Erro de conexão. Verifique sua internet.',
  [ERROR_CODES.OFFLINE]: 'Você está offline. Verifique sua conexão.',
  [ERROR_CODES.TIMEOUT]: 'A requisição demorou muito tempo.',
  [ERROR_CODES.SERVER_ERROR]: 'Erro do servidor. Tente novamente mais tarde.',
  [ERROR_CODES.INVALID_DATA]: 'Os dados fornecidos são inválidos.',
  [ERROR_CODES.TASK_LIMIT_EXCEEDED]: 'Você atingiu o limite de tarefas.',
  [ERROR_CODES.QUOTA_EXCEEDED]: 'Você atingiu seu limite de cota.',
};

/**
 * Mensagens de Sucesso
 */
export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Tarefa criada com sucesso! ✅',
  TASK_UPDATED: 'Tarefa atualizada! 📝',
  TASK_DELETED: 'Tarefa removida! 🗑️',
  TASK_COMPLETED: 'Parabéns! Tarefa concluída! 🎉',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso! 👤',
  DIARY_SAVED: 'Diário salvo! 📔',
  SETTINGS_SAVED: 'Configurações salvas! ⚙️',
  LOGGED_IN: 'Bem-vindo de volta! 👋',
  LOGGED_OUT: 'Você saiu com sucesso!',
};

/**
 * Mensagens de Informação
 */
export const INFO_MESSAGES = {
  LOADING: 'Carregando...',
  PROCESSING: 'Processando...',
  SYNCING: 'Sincronizando...',
  SAVING: 'Salvando...',
  DELETING: 'Removendo...',
  PLEASE_WAIT: 'Por favor, aguarde...',
};

/**
 * Mensagens de Confirmação
 */
export const CONFIRMATION_MESSAGES = {
  DELETE_TASK: 'Tem certeza que deseja excluir esta tarefa?',
  DELETE_DIARY: 'Tem certeza que deseja excluir esta entrada?',
  RESET_ALL: 'Tem certeza que deseja resetar tudo? Esta ação não pode ser desfeita.',
  LOGOUT: 'Tem certeza que deseja sair?',
  CLEAR_CACHE: 'Deseja limpar o cache?',
};

/**
 * Obter mensagem de erro
 */
export const getErrorMessage = (code: string): string => {
  return ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES[ERROR_CODES.UNKNOWN];
};

/**
 * Obter mensagem de sucesso
 */
export const getSuccessMessage = (code: string): string => {
  return SUCCESS_MESSAGES[code as keyof typeof SUCCESS_MESSAGES] || 'Operação concluída com sucesso!';
};
