/**
 * CONFIGURAÇÃO CENTRALIZADA DA APLICAÇÃO
 */

import { Platform } from 'react-native';

/**
 * Ambiente e Debug
 */
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = !isProduction;
export const __DEV__ = isDevelopment;

/**
 * Plataforma
 */
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

/**
 * Versão da App
 */
export const APP_VERSION = '1.0.0';
export const APP_BUILD = '1';

/**
 * URLs e Endpoints
 */
export const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
};

/**
 * Configurações de Feature Flags
 */
export const FEATURES = {
  enableNotifications: true,
  enableAnalytics: !isDevelopment,
  enableOfflineMode: true,
  enableDarkMode: true,
  enableBeta: isDevelopment,
};

/**
 * Configurações de Comportamento
 */
export const BEHAVIOR = {
  animationDuration: 300,
  debounceDelay: 500,
  throttleDelay: 1000,
  autoSaveDelay: 2000,
  sessionTimeout: 30 * 60 * 1000, // 30 minutos
};

/**
 * Limites da Aplicação
 */
export const LIMITS = {
  maxNomeLength: 50,
  maxTarefaLength: 200,
  maxDiarioLength: 5000,
  maxTotalTarefas: 100,
  maxTotalEntradas: 1000,
};

/**
 * Mensagens Padrão
 */
export const MENSAGENS = {
  erroGenerico: 'Algo deu errado. Tente novamente mais tarde.',
  erroRede: 'Erro de conexão. Verifique sua internet.',
  erroServidor: 'Erro do servidor. Tente novamente mais tarde.',
  carregando: 'Carregando...',
  salvo: 'Salvo com sucesso!',
  excluido: 'Excluído com sucesso!',
  confirmacaoExclusao: 'Tem certeza? Esta ação não pode ser desfeita.',
};

/**
 * Cache Configuration
 */
export const CACHE = {
  enabled: true,
  ttl: 5 * 60 * 1000, // 5 minutos
  maxSize: 50 * 1024 * 1024, // 50MB
};

/**
 * Logging Configuration
 */
export const LOGGING = {
  enabled: isDevelopment,
  level: isDevelopment ? 'debug' : 'error',
  logToConsole: isDevelopment,
  logToFile: !isDevelopment,
  maxLogSize: 10 * 1024 * 1024, // 10MB
};

/**
 * Configuração por Plataforma
 */
export const getPlatformConfig = () => {
  if (isIOS) {
    return {
      platform: 'ios',
      statusBarHeight: 44,
      bottomSafeAreaHeight: 34,
    };
  }

  if (isAndroid) {
    return {
      platform: 'android',
      statusBarHeight: 24,
      bottomSafeAreaHeight: 0,
    };
  }

  return {
    platform: 'web',
    statusBarHeight: 0,
    bottomSafeAreaHeight: 0,
  };
};

/**
 * Export default config
 */
export default {
  isProduction,
  isDevelopment,
  __DEV__,
  isIOS,
  isAndroid,
  isWeb,
  APP_VERSION,
  APP_BUILD,
  API_CONFIG,
  FEATURES,
  BEHAVIOR,
  LIMITS,
  MENSAGENS,
  CACHE,
  LOGGING,
  getPlatformConfig,
};
