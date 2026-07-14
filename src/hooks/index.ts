import { useContext, useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { PerfilContext } from '@context/PerfilContext';
import { TarefasContext } from '@context/TarefasContext';
import { DiarioContext } from '@context/DiarioContext';

/**
 * Hook para acessar contexto de perfil
 */
export const usePerfil = () => {
  const context = useContext(PerfilContext);
  if (!context) {
    throw new Error('usePerfil deve ser usado dentro de PerfilProvider');
  }
  return context;
};

/**
 * Hook para acessar contexto de tarefas
 */
export const useTarefas = () => {
  const context = useContext(TarefasContext);
  if (!context) {
    throw new Error('useTarefas deve ser usado dentro de TarefasProvider');
  }
  return context;
};

/**
 * Hook para acessar contexto de diário
 */
export const useDiario = () => {
  const context = useContext(DiarioContext);
  if (!context) {
    throw new Error('useDiario deve ser usado dentro de DiarioProvider');
  }
  return context;
};

/**
 * Hook agregador que combina todos os contextos
 * Útil para telas que precisam de múltiplos contextos
 */
export const useAppState = () => {
  const perfil = usePerfil();
  const tarefas = useTarefas();
  const diario = useDiario();

  return {
    perfil,
    tarefas,
    diario,
    isOnboarded: perfil.perfil !== null,
  };
};

/**
 * Hook customizado para debounce
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook para lidar com carregamento e erros
 */
export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setValue(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error as E);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};

/**
 * Hook para segurança de navegação
 */
export const useAppNavigation = () => {
  const navigation = useNavigation();
  const { perfil } = usePerfil();

  const navigateIfOnboarded = useCallback(
    (screen: string) => {
      if (!perfil) {
        console.warn('Usuário não foi onboardado');
        return;
      }
      navigation.navigate(screen as any);
    },
    [perfil, navigation]
  );

  return {
    navigate: navigation.navigate,
    navigateIfOnboarded,
    goBack: navigation.goBack,
    reset: navigation.reset,
  };
};

/**
 * Hook para gerenciar formulários
 */
export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleBlur = useCallback((field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  }, [initialValues]);

  return {
    values,
    setValues,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldError,
    reset,
  };
};

/**
 * Hook para gerenciar entradas salvas do diário (histórico)
 * Persiste EntradaDiario[] independentemente do DiarioContext (rascunho do dia)
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EntradaDiario, Humor } from '@types/index';

const ENTRADAS_KEY = '@meuapppet:entradas_diario';

export const useEntradasDiario = () => {
  const [entradas, setEntradas] = useState<EntradaDiario[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      const data = await AsyncStorage.getItem(ENTRADAS_KEY);
      if (data) setEntradas(JSON.parse(data));
    } catch (e) {
      console.error('Erro ao carregar entradas do diário:', e);
    } finally {
      setCarregando(false);
    }
  }, []);

  const salvar = useCallback(async (novasEntradas: EntradaDiario[]) => {
    try {
      await AsyncStorage.setItem(ENTRADAS_KEY, JSON.stringify(novasEntradas));
      setEntradas(novasEntradas);
    } catch (e) {
      console.error('Erro ao salvar entradas do diário:', e);
    }
  }, []);

  const adicionarEntrada = useCallback(
    async (conteudo: string, humor: Humor) => {
      if (!conteudo.trim()) return;
      const nova: EntradaDiario = {
        id: `${Date.now()}`,
        conteudo: conteudo.trim(),
        humor,
        data: new Date(),
        privada: false,
      };
      const novas = [nova, ...entradas];
      await salvar(novas);
      return nova;
    },
    [entradas, salvar]
  );

  const removerEntrada = useCallback(
    async (id: string) => {
      const novas = entradas.filter((e) => e.id !== id);
      await salvar(novas);
    },
    [entradas, salvar]
  );

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { entradas, carregando, adicionarEntrada, removerEntrada, carregar };
};
