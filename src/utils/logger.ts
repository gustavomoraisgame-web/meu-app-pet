/**
 * LOGGER E DEBUG UTILITIES
 */

import { LOGGING, isDevelopment } from '@/config';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: any;
  stack?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    if (data) {
      return `${prefix} ${message} ${JSON.stringify(data, null, 2)}`;
    }

    return `${prefix} ${message}`;
  }

  debug(message: string, data?: any): void {
    if (!isDevelopment) return;
    this.log('debug', message, data);
  }

  info(message: string, data?: any): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: any, error?: Error): void {
    this.log('error', message, data, error);
  }

  private log(level: LogLevel, message: string, data?: any, error?: Error): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      data,
      stack: error?.stack,
    };

    this.logs.push(entry);

    // Limitar tamanho do array
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Log no console se habilitado
    if (LOGGING.logToConsole) {
      const formatted = this.formatMessage(level, message, data);

      switch (level) {
        case 'debug':
          console.debug(formatted);
          break;
        case 'info':
          console.info(formatted);
          break;
        case 'warn':
          console.warn(formatted);
          break;
        case 'error':
          console.error(formatted, error);
          break;
      }
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  getLast(count: number = 10): LogEntry[] {
    return this.logs.slice(-count);
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  logApiCall(method: string, url: string, statusCode?: number, duration?: number): void {
    const message = `[${method}] ${url}`;
    const data = { statusCode, duration: `${duration}ms` };

    if (statusCode && statusCode >= 400) {
      this.error(message, data);
    } else {
      this.debug(message, data);
    }
  }

  logPerformance(label: string, duration: number): void {
    this.debug(`[PERFORMANCE] ${label}`, { duration: `${duration}ms` });
  }

  logComponentRender(componentName: string, props?: any): void {
    this.debug(`[RENDER] ${componentName}`, props);
  }

  logStateChange(componentName: string, stateName: string, oldValue: any, newValue: any): void {
    this.debug(`[STATE] ${componentName}.${stateName}`, {
      from: oldValue,
      to: newValue,
    });
  }

  logNavigation(screen: string, params?: any): void {
    this.debug(`[NAVIGATION] → ${screen}`, params);
  }

  logError(error: Error, context?: string): void {
    this.error(`Error${context ? ` in ${context}` : ''}`, { message: error.message }, error);
  }
}

// Instância singleton do logger
export const logger = new Logger();

/**
 * Performance Helper
 */
export class PerformanceMonitor {
  private startTime: number = 0;
  private label: string = '';

  start(label: string): void {
    this.label = label;
    this.startTime = Date.now();
    logger.debug(`[START] ${label}`);
  }

  end(): number {
    const duration = Date.now() - this.startTime;
    logger.logPerformance(this.label, duration);
    return duration;
  }
}

/**
 * Error Handler
 */
export const handleError = (error: unknown, context?: string): void => {
  if (error instanceof Error) {
    logger.logError(error, context);
  } else {
    logger.error(`Unknown error${context ? ` in ${context}` : ''}`, { error });
  }
};

/**
 * Assert Helper
 */
export const assert = (condition: boolean, message: string): void => {
  if (!condition) {
    logger.error(`Assertion failed: ${message}`);
    if (isDevelopment) {
      throw new Error(`Assertion failed: ${message}`);
    }
  }
};

/**
 * Deprecated Warning
 */
export const deprecated = (oldName: string, newName: string): void => {
  logger.warn(`${oldName} is deprecated. Use ${newName} instead.`);
};

/**
 * TODO Warning
 */
export const todo = (message: string): void => {
  logger.debug(`TODO: ${message}`);
};

export default logger;
