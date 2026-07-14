import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Humor } from '@types/index';
import { STORAGE_KEYS } from '@constants/index';

interface DiarioContextType {
  diario: string;
  humor: Humor | null;
  setDiario: (diario: string) => Promise<void>;
  setHumor: (humor: Humor | null) => Promise<void>;
  carregarDados: () => Promise<void>;
  limparDados: () => Promise<void>;
}

export const DiarioContext = createContext<DiarioContextType | undefined>(undefined);

interface DiarioProviderProps {
  children: ReactNode;
}

export const DiarioProvider: React.FC<DiarioProviderProps> = ({ children }) => {
  const [diario, setDiarioState] = useState<string>('');
  const [humor, setHumorState] = useState<Humor | null>(null);

  const carregarDados = useCallback(async () => {
    try {
      const [diarioData, humorData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.DIARIO),
        AsyncStorage.getItem(STORAGE_KEYS.HUMOR),
      ]);

      if (diarioData) {
        setDiarioState(diarioData);
      }
      if (humorData) {
        setHumorState(JSON.parse(humorData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do diário:', error);
    }
  }, []);

  const setDiario = useCallback(async (novoDiario: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.DIARIO, novoDiario);
      setDiarioState(novoDiario);
    } catch (error) {
      console.error('Erro ao salvar diário:', error);
    }
  }, []);

  const setHumor = useCallback(async (novoHumor: Humor | null) => {
    try {
      if (novoHumor === null) {
        await AsyncStorage.removeItem(STORAGE_KEYS.HUMOR);
      } else {
        await AsyncStorage.setItem(STORAGE_KEYS.HUMOR, JSON.stringify(novoHumor));
      }
      setHumorState(novoHumor);
    } catch (error) {
      console.error('Erro ao salvar humor:', error);
    }
  }, []);

  const limparDados = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.DIARIO),
        AsyncStorage.removeItem(STORAGE_KEYS.HUMOR),
      ]);
      setDiarioState('');
      setHumorState(null);
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return (
    <DiarioContext.Provider
      value={{
        diario,
        humor,
        setDiario,
        setHumor,
        carregarDados,
        limparDados,
      }}
    >
      {children}
    </DiarioContext.Provider>
  );
};
