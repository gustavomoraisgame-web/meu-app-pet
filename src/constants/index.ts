import { Signo, HumorOption } from '@types/index';

export const ZODIAC_SIGNS: Array<{ label: string; value: Signo; emoji: string }> = [
  { label: 'Áries ♈', value: 'Áries', emoji: '♈' },
  { label: 'Touro ♉', value: 'Touro', emoji: '♉' },
  { label: 'Gêmeos ♊', value: 'Gêmeos', emoji: '♊' },
  { label: 'Câncer ♋', value: 'Câncer', emoji: '♋' },
  { label: 'Leão ♌', value: 'Leão', emoji: '♌' },
  { label: 'Virgem ♍', value: 'Virgem', emoji: '♍' },
  { label: 'Libra ♎', value: 'Libra', emoji: '♎' },
  { label: 'Escorpião ♏', value: 'Escorpião', emoji: '♏' },
  { label: 'Sagitário ♐', value: 'Sagitário', emoji: '♐' },
  { label: 'Capricórnio ♑', value: 'Capricórnio', emoji: '♑' },
  { label: 'Aquário ♒', value: 'Aquário', emoji: '♒' },
  { label: 'Peixes ♓', value: 'Peixes', emoji: '♓' },
];

export const MOOD_OPTIONS: HumorOption[] = [
  { emoji: '🌸', nome: 'Radiante' },
  { emoji: '🐰', nome: 'Feliz' },
  { emoji: '🐣', nome: 'Neutro' },
  { emoji: '🌧️', nome: 'Pra baixo' },
  { emoji: '🐨', nome: 'Cansada' },
];

export const TABS = [
  { id: 'home', label: 'Meu Dia', icon: '🏠' },
  { id: 'diary', label: 'Diário', icon: '📔' },
  { id: 'calendar', label: 'Calendário', icon: '🪴' },
];

export const MENU_OPTIONS = [
  { id: 'profile', label: 'Editar Perfil', icon: '✏️' },
  { id: 'settings', label: 'Configurações', icon: '⚙️' },
  { id: 'pet', label: 'Meu Pet Virtual', icon: '🐾' },
];

export const STORAGE_KEYS = {
  PERFIL: '@meuapppet:perfil',
  TAREFAS: '@meuapppet:tarefas',
  DIARIO: '@meuapppet:diario',
  HUMOR: '@meuapppet:humor',
};

export const CALENDAR_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
