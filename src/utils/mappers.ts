/**
 * DATA MAPPERS E TRANSFORMADORES
 * Converte dados entre diferentes formatos
 */

import { Perfil, Tarefa, Humor, EntradaDiario } from '@types/index';
import { logger } from './logger';

/**
 * Mapeadores de Perfil
 */
export const perfilMappers = {
  /**
   * Normalizar dados de perfil da API
   */
  fromApi: (data: any): Perfil => {
    return {
      nome: String(data.nome || '').trim(),
      aniversario: String(data.aniversario || ''),
      signo: data.signo || '',
    };
  },

  /**
   * Transformar perfil para envio à API
   */
  toApi: (perfil: Perfil): any => {
    return {
      nome: perfil.nome.trim(),
      aniversario: perfil.aniversario,
      signo: perfil.signo,
    };
  },

  /**
   * Validar perfil
   */
  validate: (data: any): boolean => {
    return (
      data &&
      typeof data.nome === 'string' &&
      data.nome.trim().length > 0 &&
      typeof data.aniversario === 'string' &&
      typeof data.signo === 'string'
    );
  },
};

/**
 * Mapeadores de Tarefa
 */
export const tarefaMappers = {
  /**
   * Normalizar dados de tarefa da API
   */
  fromApi: (data: any): Tarefa => {
    return {
      id: Number(data.id) || Date.now(),
      texto: String(data.texto || '').trim(),
      concluida: Boolean(data.concluida),
      dataCriacao: data.dataCriacao ? new Date(data.dataCriacao) : undefined,
      dataConclusa: data.dataConclusa ? new Date(data.dataConclusa) : undefined,
      prioridade: data.prioridade || 'media',
      tags: Array.isArray(data.tags) ? data.tags : [],
    };
  },

  /**
   * Transformar tarefa para envio à API
   */
  toApi: (tarefa: Tarefa): any => {
    return {
      id: tarefa.id,
      texto: tarefa.texto,
      concluida: tarefa.concluida,
      dataCriacao: tarefa.dataCriacao?.toISOString(),
      dataConclusa: tarefa.dataConclusa?.toISOString(),
      prioridade: tarefa.prioridade,
      tags: tarefa.tags,
    };
  },

  /**
   * Converter array de tarefas
   */
  fromApiArray: (data: any[]): Tarefa[] => {
    if (!Array.isArray(data)) return [];
    return data.map(tarefaMappers.fromApi);
  },

  /**
   * Validar tarefa
   */
  validate: (data: any): boolean => {
    return (
      data &&
      typeof data.texto === 'string' &&
      data.texto.trim().length > 0 &&
      typeof data.concluida === 'boolean'
    );
  },
};

/**
 * Mapeadores de Humor
 */
export const humorMappers = {
  /**
   * Normalizar humor
   */
  normalize: (value: any): Humor | null => {
    const humoresValidos: Humor[] = ['Radiante', 'Feliz', 'Neutro', 'Pra baixo', 'Cansada'];
    if (humoresValidos.includes(value)) {
      return value;
    }
    logger.warn(`Humor inválido: ${value}`);
    return null;
  },

  /**
   * Converter número para humor
   */
  fromNumber: (num: number): Humor => {
    const humores: Humor[] = ['Radiante', 'Feliz', 'Neutro', 'Pra baixo', 'Cansada'];
    return humores[Math.min(Math.max(num, 0), humores.length - 1)];
  },

  /**
   * Converter humor para número (0-4)
   */
  toNumber: (humor: Humor): number => {
    const humores: Humor[] = ['Radiante', 'Feliz', 'Neutro', 'Pra baixo', 'Cansada'];
    return humores.indexOf(humor);
  },
};

/**
 * Mapeadores de Entrada Diário
 */
export const entradaDiarioMappers = {
  /**
   * Normalizar dados da API
   */
  fromApi: (data: any): EntradaDiario => {
    return {
      id: String(data.id || Date.now()),
      usuarioId: data.usuarioId,
      conteudo: String(data.conteudo || '').trim(),
      humor: humorMappers.normalize(data.humor) || 'Neutro',
      data: data.data ? new Date(data.data) : new Date(),
      tags: Array.isArray(data.tags) ? data.tags : [],
      privada: Boolean(data.privada),
    };
  },

  /**
   * Transformar para envio à API
   */
  toApi: (entrada: EntradaDiario): any => {
    return {
      id: entrada.id,
      usuarioId: entrada.usuarioId,
      conteudo: entrada.conteudo,
      humor: entrada.humor,
      data: entrada.data.toISOString(),
      tags: entrada.tags,
      privada: entrada.privada,
    };
  },

  /**
   * Validar entrada
   */
  validate: (data: any): boolean => {
    return (
      data &&
      typeof data.conteudo === 'string' &&
      data.conteudo.trim().length > 0 &&
      data.humor
    );
  },
};

/**
 * Mapeadores Genéricos
 */
export const genericMappers = {
  /**
   * Converter null/undefined para valor padrão
   */
  nullToDefault: <T,>(value: T | null | undefined, defaultValue: T): T => {
    return value ?? defaultValue;
  },

  /**
   * Truncar texto
   */
  truncate: (text: string, length: number, suffix: string = '...'): string => {
    if (text.length <= length) return text;
    return text.substring(0, length) + suffix;
  },

  /**
   * Normalizar espaço em branco
   */
  normalizeWhitespace: (text: string): string => {
    return text.replace(/\s+/g, ' ').trim();
  },

  /**
   * Converter objeto para QueryString
   */
  toQueryString: (obj: Record<string, any>): string => {
    return Object.entries(obj)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');
  },

  /**
   * Agrupar array por chave
   */
  groupBy: <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
    return array.reduce(
      (acc, item) => {
        const groupKey = String(item[key]);
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
      },
      {} as Record<string, T[]>
    );
  },

  /**
   * Mapear array com transformação
   */
  map: <T, U>(array: T[], mapper: (item: T, index: number) => U): U[] => {
    return array.map(mapper);
  },

  /**
   * Filtrar e mapear
   */
  filterMap: <T, U>(array: T[], predicate: (item: T) => boolean, mapper: (item: T) => U): U[] => {
    return array.filter(predicate).map(mapper);
  },
};

/**
 * Mapeador Principal
 */
export const mappers = {
  perfil: perfilMappers,
  tarefa: tarefaMappers,
  humor: humorMappers,
  entradaDiario: entradaDiarioMappers,
  generic: genericMappers,
};

export default mappers;
