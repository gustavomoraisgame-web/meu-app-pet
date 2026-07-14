import { Tarefa, Humor, Perfil } from '@types/index';
import { MOOD_OPTIONS } from '@constants/index';

/**
 * Helpers de Tarefa
 */

export const criarTarefa = (texto: string): Tarefa => {
  return {
    id: Date.now(),
    texto: texto.trim(),
    concluida: false,
  };
};

export const marcarTarefaCompleta = (tarefa: Tarefa): Tarefa => {
  return { ...tarefa, concluida: true };
};

export const marcarTarefaPendente = (tarefa: Tarefa): Tarefa => {
  return { ...tarefa, concluida: false };
};

export const ordenarTarefas = (tarefas: Tarefa[]): Tarefa[] => {
  return tarefas.sort((a, b) => {
    // Tarefas pendentes primeiro
    if (a.concluida === b.concluida) return b.id - a.id;
    return a.concluida ? 1 : -1;
  });
};

export const agruparTarefasPorStatus = (tarefas: Tarefa[]) => {
  return {
    pendentes: tarefas.filter((t) => !t.concluida),
    concluidas: tarefas.filter((t) => t.concluida),
  };
};

/**
 * Helpers de Humor
 */

export const obterEmojiHumor = (humor: Humor): string => {
  const option = MOOD_OPTIONS.find((m) => m.nome === humor);
  return option?.emoji || '🤷';
};

export const obterDescricaoHumor = (humor: Humor): string => {
  const descricoes: Record<Humor, string> = {
    Radiante: 'Você está radiante! Que energia contagiante! 🌟',
    Feliz: 'Que felicidade! Continue assim! 😊',
    Neutro: 'Dia comum, sem grandes emoções. Tudo bem! 😐',
    'Pra baixo': 'Parece que o dia está puxado. Cuide de si! 😔',
    Cansada: 'Cansada? Descanse! Você merece! 😴',
  };
  return descricoes[humor];
};

/**
 * Helpers de Perfil
 */

export const gerarSaudacao = (perfil: Perfil | null): string => {
  if (!perfil || !perfil.nome) {
    return 'Olá! 👋';
  }

  const hora = new Date().getHours();

  if (hora < 12) {
    return `Bom dia, ${perfil.nome}! ☀️`;
  } else if (hora < 18) {
    return `Boa tarde, ${perfil.nome}! 🌤️`;
  } else {
    return `Boa noite, ${perfil.nome}! 🌙`;
  }
};

export const gerarMensagensBemVindo = (): string[] => {
  const mensagens = [
    'Bem-vinda ao seu cantinho especial! 🌸',
    'Que alegria te ter aqui! 💖',
    'Prepare-se para cuidar de você! ✨',
    'Seu espaço de bem-estar te espera! 🧘‍♀️',
    'Vamos começar este dia especial! 🌟',
  ];
  return mensagens;
};

/**
 * Helpers de Data
 */

export const obterDiaSemana = (data?: Date): string => {
  const d = data || new Date();
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return dias[d.getDay()];
};

export const obterMes = (data?: Date): string => {
  const d = data || new Date();
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  return meses[d.getMonth()];
};

export const formatarDataRelativa = (data: Date): string => {
  const hoje = new Date();
  const ontem = new Date(hoje);
  ontem.setDate(ontem.getDate() - 1);
  const amanha = new Date(hoje);
  amanha.setDate(amanha.getDate() + 1);

  const dataString = data.toDateString();
  const hojeString = hoje.toDateString();
  const ontemString = ontem.toDateString();
  const amanhaString = amanha.toDateString();

  if (dataString === hojeString) return 'Hoje';
  if (dataString === ontemString) return 'Ontem';
  if (dataString === amanhaString) return 'Amanhã';

  return `${data.getDate()} de ${obterMes(data)}`;
};

/**
 * Helpers de Mensagens
 */

export const getMensagemTarefasVazias = (): string => {
  const mensagens = [
    'Tudo em dia! Respira fundo 🫧',
    'Sem tarefas! Você está liberada! 🎉',
    'Limpo e vazio, como gostamos! ✨',
    'Parabéns! Você conseguiu! 🏆',
    'Dia livre de preocupações! 💆‍♀️',
  ];
  return mensagens[Math.floor(Math.random() * mensagens.length)];
};

export const getMensagemDiarioVazio = (): string => {
  const mensagens = [
    'Suas memórias guardadas com carinho aparecerão aqui. 💌',
    'Comece a escrever seus pensamentos! ✍️',
    'Seu diário aguarda por você! 📔',
  ];
  return mensagens[Math.floor(Math.random() * mensagens.length)];
};

/**
 * Helpers de Notificação
 */

export const criarMensagemErro = (erro: unknown): string => {
  if (erro instanceof Error) {
    return erro.message;
  }
  if (typeof erro === 'string') {
    return erro;
  }
  return 'Ocorreu um erro desconhecido';
};

export const criarMensagemSucesso = (acao: string): string => {
  const mensagens: Record<string, string> = {
    'adicionar-tarefa': 'Tarefa adicionada com sucesso! ✅',
    'remover-tarefa': 'Tarefa removida! 🗑️',
    'atualizar-perfil': 'Perfil atualizado! 👤',
    'salvar-diario': 'Diário salvo! 📝',
    'concluir-tarefa': 'Parabéns! Tarefa concluída! 🎉',
  };
  return mensagens[acao] || 'Operação concluída com sucesso! ✨';
};

/**
 * Helpers de Confirmação
 */

export const confirmarDelecao = (item: string): { titulo: string; mensagem: string } => {
  return {
    titulo: 'Confirmar exclusão',
    mensagem: `Tem certeza que deseja excluir ${item}? Esta ação não pode ser desfeita.`,
  };
};
