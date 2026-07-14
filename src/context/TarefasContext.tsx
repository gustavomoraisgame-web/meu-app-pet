import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tarefa } from '@types/index';
import { STORAGE_KEYS } from '@constants/index';

interface TarefasContextType {
  tarefas: Tarefa[];
  adicionarTarefa: (texto: string) => Promise<void>;
  removerTarefa: (id: number) => Promise<void>;
  alternarConclusao: (id: number) => Promise<void>;
  carregarTarefas: () => Promise<void>;
  limparTarefas: () => Promise<void>;
}

export const TarefasContext = createContext<TarefasContextType | undefined>(undefined);

interface TarefasProviderProps {
  children: ReactNode;
}

export const TarefasProvider: React.FC<TarefasProviderProps> = ({ children }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const carregarTarefas = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.TAREFAS);
      if (data) {
        setTarefas(JSON.parse(data));
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }, []);

  const salvarTarefas = useCallback(async (novasTarefas: Tarefa[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TAREFAS, JSON.stringify(novasTarefas));
      setTarefas(novasTarefas);
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  }, []);

  const adicionarTarefa = useCallback(
    async (texto: string) => {
      if (texto.trim() === '') return;

      const novaTarefa: Tarefa = {
        id: Date.now(),
        texto: texto.trim(),
        concluida: false,
      };

      const novasTarefas = [...tarefas, novaTarefa];
      await salvarTarefas(novasTarefas);
    },
    [tarefas, salvarTarefas]
  );

  const removerTarefa = useCallback(
    async (id: number) => {
      const novasTarefas = tarefas.filter((t) => t.id !== id);
      await salvarTarefas(novasTarefas);
    },
    [tarefas, salvarTarefas]
  );

  const alternarConclusao = useCallback(
    async (id: number) => {
      const novasTarefas = tarefas.map((t) =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      );
      await salvarTarefas(novasTarefas);
    },
    [tarefas, salvarTarefas]
  );

  const limparTarefas = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.TAREFAS);
      setTarefas([]);
    } catch (error) {
      console.error('Erro ao limpar tarefas:', error);
    }
  }, []);

  useEffect(() => {
    carregarTarefas();
  }, [carregarTarefas]);

  return (
    <TarefasContext.Provider
      value={{
        tarefas,
        adicionarTarefa,
        removerTarefa,
        alternarConclusao,
        carregarTarefas,
        limparTarefas,
      }}
    >
      {children}
    </TarefasContext.Provider>
  );
};
