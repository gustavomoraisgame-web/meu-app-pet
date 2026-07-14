/**
 * ERROS CUSTOMIZADOS
 */

/**
 * Erro Base da Aplicação
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isCustom = true;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode: number = 500,
    public readonly context?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;

    // Manter stack trace correto para V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      context: this.context,
    };
  }
}

/**
 * Erro de Validação
 */
export class ValidationError extends AppError {
  public readonly errors: Record<string, string>;

  constructor(
    message: string,
    errors: Record<string, string> = {},
    context?: Record<string, any>
  ) {
    super(message, 'VALIDATION_ERROR', 400, context);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * Erro de Autenticação
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Não autenticado', context?: Record<string, any>) {
    super(message, 'AUTHENTICATION_ERROR', 401, context);
    this.name = 'AuthenticationError';
  }
}

/**
 * Erro de Autorização
 */
export class AuthorizationError extends AppError {
  constructor(message: string = 'Acesso negado', context?: Record<string, any>) {
    super(message, 'AUTHORIZATION_ERROR', 403, context);
    this.name = 'AuthorizationError';
  }
}

/**
 * Erro de Recurso Não Encontrado
 */
export class NotFoundError extends AppError {
  constructor(resource: string, context?: Record<string, any>) {
    super(`${resource} não encontrado`, 'NOT_FOUND', 404, context);
    this.name = 'NotFoundError';
  }
}

/**
 * Erro de Conflito
 */
export class ConflictError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'CONFLICT', 409, context);
    this.name = 'ConflictError';
  }
}

/**
 * Erro de Rede
 */
export class NetworkError extends AppError {
  constructor(message: string = 'Erro de conexão', context?: Record<string, any>) {
    super(message, 'NETWORK_ERROR', 0, context);
    this.name = 'NetworkError';
  }
}

/**
 * Erro de Timeout
 */
export class TimeoutError extends AppError {
  constructor(message: string = 'Requisição expirou', context?: Record<string, any>) {
    super(message, 'TIMEOUT', 408, context);
    this.name = 'TimeoutError';
  }
}

/**
 * Erro de Servidor
 */
export class ServerError extends AppError {
  constructor(message: string = 'Erro do servidor', statusCode: number = 500, context?: Record<string, any>) {
    super(message, 'SERVER_ERROR', statusCode, context);
    this.name = 'ServerError';
  }
}

/**
 * Erro de Dados
 */
export class DataError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'DATA_ERROR', 422, context);
    this.name = 'DataError';
  }
}

/**
 * Erro de Configuração
 */
export class ConfigurationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'CONFIGURATION_ERROR', 500, context);
    this.name = 'ConfigurationError';
  }
}

/**
 * Verificador de Erro
 */
export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

export const isValidationError = (error: unknown): error is ValidationError => {
  return error instanceof ValidationError;
};

/**
 * Mapeador de HTTP Status para AppError
 */
export const mapHttpStatusToError = (
  statusCode: number,
  message: string,
  context?: Record<string, any>
): AppError => {
  switch (statusCode) {
    case 400:
      return new ValidationError(message, {}, context);
    case 401:
      return new AuthenticationError(message, context);
    case 403:
      return new AuthorizationError(message, context);
    case 404:
      return new NotFoundError(message, context);
    case 409:
      return new ConflictError(message, context);
    case 408:
      return new TimeoutError(message, context);
    case 422:
      return new DataError(message, context);
    default:
      if (statusCode >= 500) {
        return new ServerError(message, statusCode, context);
      }
      return new AppError(message, 'HTTP_ERROR', statusCode, context);
  }
};

/**
 * Extrator de Mensagem de Erro
 */
export const getErrorMessage = (error: unknown): string => {
  if (isAppError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Erro desconhecido';
};

/**
 * Formatter de Erro para Usuário
 */
export const formatErrorForUser = (error: unknown): string => {
  const message = getErrorMessage(error);

  // Mensagens amigáveis para usuários
  const friendlyMessages: Record<string, string> = {
    NETWORK_ERROR: 'Verifique sua conexão com a internet',
    TIMEOUT: 'A requisição demorou muito tempo',
    AUTHENTICATION_ERROR: 'Você precisa fazer login',
    AUTHORIZATION_ERROR: 'Você não tem permissão para esta ação',
    NOT_FOUND: 'Recurso não encontrado',
    SERVER_ERROR: 'Desculpe, algo deu errado em nosso servidor',
    VALIDATION_ERROR: 'Por favor, verifique os dados informados',
  };

  if (isAppError(error)) {
    return friendlyMessages[error.code] || message;
  }

  return friendlyMessages['SERVER_ERROR'];
};
