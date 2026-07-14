import React, { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PerfilProvider } from '@context/PerfilContext';
import { TarefasProvider } from '@context/TarefasContext';
import { DiarioProvider } from '@context/DiarioContext';
import { ToastProvider } from '@components/index';
import { ThemeProvider } from '@theme/index';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Hierarquia de providers (de fora para dentro):
 *  GestureHandlerRootView  — obrigatório para react-native-gesture-handler
 *  SafeAreaProvider        — insets de safe area em toda a árvore
 *  ThemeProvider           — tema claro/escuro + persistência
 *  PerfilProvider          — estado de perfil/auth
 *  TarefasProvider         — estado de tarefas
 *  DiarioProvider          — estado de diário e humor
 *  ToastProvider           — notificações flutuantes (deve ser o mais interno)
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <PerfilProvider>
            <TarefasProvider>
              <DiarioProvider>
                <ToastProvider>{children}</ToastProvider>
              </DiarioProvider>
            </TarefasProvider>
          </PerfilProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default AppProviders;
