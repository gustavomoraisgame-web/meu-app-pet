import { Perfil, Tarefa, Humor } from '@types/index';

/**
 * Validações de Nome
 */
export const validarNome = (nome: string): boolean => {
  return nome.trim().length > 0 && nome.trim().length <= 50;
};

export const validarNomeComMensagem = (nome: string): { valid: boolean; message?: string } => {
  if (!nome.trim()) {
    return { valid: false, message: 'Nome é obrigatório' };
  }
  if (nome.trim().length > 50) {
    return { valid: false, message: 'Nome não pode ter mais de 50 caracteres' };
  }
  return { valid: true };
};

/**
 * Validações de Data
 */
export const validarData = (data: string): boolean => {
  if (!data) return false;
  const date = new Date(data);
  return date instanceof Date && !isNaN(date.getTime());
};

export const validarDataComMensagem = (data: string): { valid: boolean; message?: string } => {
  if (!data) {
    return { valid: false, message: 'Data é obrigatória' };
  }
  if (!validarData(data)) {
    return { valid: false, message: 'Data inválida' };
  }
  const date = new Date(data);
  if (date > new Date()) {
    return { valid: false, message: 'Data não pode ser no futuro' };
  }
  return { valid: true };
};

/**
 * Validações de Perfil
 */
export const validarPerfil = (perfil: Partial<Perfil>): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!perfil.nome || !validarNome(perfil.nome)) {
    errors.nome = 'Nome inválido';
  }

  if (!perfil.aniversario || !validarData(perfil.aniversario)) {
    errors.aniversario = 'Data de nascimento inválida';
  }

  if (!perfil.signo) {
    errors.signo = 'Signo é obrigatório';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Formatação de Data
 */
export const formatarData = (data: string): string => {
  try {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return data;
  }
};

export const formatarDataCurta = (data: string): string => {
  try {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  } catch {
    return data;
  }
};

export const formatarDataCompleta = (data: string): string => {
  try {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return data;
  }
};

/**
 * Cálculos de Idade
 */
export const calcularIdade = (dataNascimento: string): number => {
  const hoje = new Date();
  const nasc = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const mes = hoje.getMonth() - nasc.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }

  return idade;
};

export const calcularProximoAniversario = (dataNascimento: string): Date => {
  const hoje = new Date();
  const nasc = new Date(dataNascimento);
  let proximoAniversario = new Date(hoje.getFullYear(), nasc.getMonth(), nasc.getDate());

  if (proximoAniversario < hoje) {
    proximoAniversario = new Date(hoje.getFullYear() + 1, nasc.getMonth(), nasc.getDate());
  }

  return proximoAniversario;
};

export const diasParaAniversario = (dataNascimento: string): number => {
  const proximoAniversario = calcularProximoAniversario(dataNascimento);
  const hoje = new Date();
  const diferenca = proximoAniversario.getTime() - hoje.getTime();
  return Math.ceil(diferenca / (1000 * 60 * 60 * 24));
};

/**
 * Formatação de Texto
 */
export const formatarTextoComEmojis = (texto: string): string => {
  return texto.trim();
};

export const truncarTexto = (texto: string, max: number): string => {
  if (texto.length <= max) return texto;
  return texto.substring(0, max) + '...';
};

export const capitalizarPrimeira = (texto: string): string => {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

/**
 * Formatação de Tarefas
 */
export const validarTarefa = (texto: string): boolean => {
  return texto.trim().length > 0 && texto.trim().length <= 200;
};

export const filtrarTarefasConcluidadas = (tarefas: Tarefa[]): Tarefa[] => {
  return tarefas.filter((t) => t.concluida);
};

export const filtrarTarefasPendentes = (tarefas: Tarefa[]): Tarefa[] => {
  return tarefas.filter((t) => !t.concluida);
};

export const contarTarefasConcluidadas = (tarefas: Tarefa[]): number => {
  return tarefas.filter((t) => t.concluida).length;
};

export const percentualConclusao = (tarefas: Tarefa[]): number => {
  if (tarefas.length === 0) return 0;
  return Math.round((contarTarefasConcluidadas(tarefas) / tarefas.length) * 100);
};

/**
 * Validação de Humor
 */
export const validarHumor = (humor: any): humor is Humor => {
  const humoresValidos: Humor[] = ['Radiante', 'Feliz', 'Neutro', 'Pra baixo', 'Cansada'];
  return humoresValidos.includes(humor);
};

/**
 * Utilidades de Array
 */
export const removerDuplicatas = <T,>(array: T[], key?: keyof T): T[] => {
  if (!key) {
    return [...new Set(array)];
  }
  return array.filter((item, index, self) => index === self.findIndex((t) => t[key] === item[key]));
};

export const agruparPor = <T,>(array: T[], key: keyof T): Record<string, T[]> => {
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
};

/**
 * Utilidades de String
 */
export const emailValido = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const telefonteValido = (telefone: string): boolean => {
  const regex = /^[0-9]{10,11}$/;
  return regex.test(telefone.replace(/\D/g, ''));
};

export const senhaForte = (senha: string): boolean => {
  return senha.length >= 8 && /[A-Z]/.test(senha) && /[0-9]/.test(senha);
};
