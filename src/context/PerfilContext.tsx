import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Perfil } from '@types/index';
import { STORAGE_KEYS } from '@constants/index';

interface PerfilContextType {
  perfil: Perfil | null;
  setPerfil: (perfil: Perfil) => void;
  atualizarPerfil: (perfil: Perfil) => Promise<void>;
  carregarPerfil: () => Promise<void>;
  limparPerfil: () => Promise<void>;
}

export const PerfilContext = createContext<PerfilContextType | undefined>(undefined);

interface PerfilProviderProps {
  children: ReactNode;
}

export const PerfilProvider: React.FC<PerfilProviderProps> = ({ children }) => {
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  const carregarPerfil = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PERFIL);
      if (data) {
        setPerfil(JSON.parse(data));
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  }, []);

  const atualizarPerfil = useCallback(
    async (novoPerfil: Perfil) => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.PERFIL, JSON.stringify(novoPerfil));
        setPerfil(novoPerfil);
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
      }
    },
    []
  );

  const limparPerfil = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.PERFIL);
      setPerfil(null);
    } catch (error) {
      console.error('Erro ao limpar perfil:', error);
    }
  }, []);

  useEffect(() => {
    carregarPerfil();
  }, [carregarPerfil]);

  return (
    <PerfilContext.Provider value={{ perfil, setPerfil, atualizarPerfil, carregarPerfil, limparPerfil }}>
      {children}
    </PerfilContext.Provider>
  );
};
