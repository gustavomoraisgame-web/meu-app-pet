import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppProviders from '@providers/AppProviders';
import RootNavigator from '@navigation/RootNavigator';

/**
 * Ponto de entrada do app (Expo / React Native).
 * AppProviders injeta GestureHandlerRootView + todos os contextos.
 * RootNavigator contém o auth guard e toda a estrutura de navegação.
 */
const App: React.FC = () => {
  return (
    <AppProviders>
      <StatusBar style="dark" backgroundColor="#FFF9F2" />
      <RootNavigator />
    </AppProviders>
  );
};

export default App;
