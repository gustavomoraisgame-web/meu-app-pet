/**
 * API Service
 * Este arquivo contém todas as chamadas de API da aplicação
 * Por enquanto, é um template pronto para futuras integrações
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

/**
 * Base URL da API
 * Será configurada via variáveis de ambiente
 */
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Função auxiliar para requisições HTTP
 */
const apiCall = async <T,>(
  endpoint: string,
  options: RequestInit & { method?: string } = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      success: true,
      data,
      statusCode: response.status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: message,
    };
  }
};

/**
 * API Service Methods
 */

// ==================== USUÁRIO ====================

export const usuarioService = {
  /**
   * Criar novo usuário
   */
  criar: async (dados: any) => {
    return apiCall('/usuarios', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Obter dados do usuário
   */
  obter: async (id: string) => {
    return apiCall(`/usuarios/${id}`, {
      method: 'GET',
    });
  },

  /**
   * Atualizar dados do usuário
   */
  atualizar: async (id: string, dados: any) => {
    return apiCall(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Deletar usuário
   */
  deletar: async (id: string) => {
    return apiCall(`/usuarios/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== TAREFAS ====================

export const tarefasService = {
  /**
   * Listar todas as tarefas do usuário
   */
  listar: async (usuarioId: string) => {
    return apiCall(`/usuarios/${usuarioId}/tarefas`, {
      method: 'GET',
    });
  },

  /**
   * Criar nova tarefa
   */
  criar: async (usuarioId: string, dados: any) => {
    return apiCall(`/usuarios/${usuarioId}/tarefas`, {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Atualizar tarefa
   */
  atualizar: async (usuarioId: string, tarefaId: string, dados: any) => {
    return apiCall(`/usuarios/${usuarioId}/tarefas/${tarefaId}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Deletar tarefa
   */
  deletar: async (usuarioId: string, tarefaId: string) => {
    return apiCall(`/usuarios/${usuarioId}/tarefas/${tarefaId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== DIÁRIO ====================

export const diarioService = {
  /**
   * Listar entradas do diário
   */
  listar: async (usuarioId: string) => {
    return apiCall(`/usuarios/${usuarioId}/diario`, {
      method: 'GET',
    });
  },

  /**
   * Criar nova entrada
   */
  criar: async (usuarioId: string, dados: any) => {
    return apiCall(`/usuarios/${usuarioId}/diario`, {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Atualizar entrada
   */
  atualizar: async (usuarioId: string, entradaId: string, dados: any) => {
    return apiCall(`/usuarios/${usuarioId}/diario/${entradaId}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  },

  /**
   * Deletar entrada
   */
  deletar: async (usuarioId: string, entradaId: string) => {
    return apiCall(`/usuarios/${usuarioId}/diario/${entradaId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== VERIFICAÇÕES DE SAÚDE ====================

export const healthService = {
  /**
   * Verificar se a API está respondendo
   */
  check: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },

  /**
   * Obter status da API
   */
  status: async () => {
    return apiCall('/health', { method: 'GET' });
  },
};

/**
 * Exportar todas as instâncias de serviço
 */
export default {
  usuarios: usuarioService,
  tarefas: tarefasService,
  diario: diarioService,
  health: healthService,
};
