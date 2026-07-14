import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { usePerfil } from '@hooks/index';
import { RootStackParamList } from '@types/navigation';
import OnboardingScreen from '@screens/OnboardingScreen';
import MainDrawerNavigator from './MainDrawerNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * RootNavigator — auth guard principal.
 *
 * Fluxo:
 *   perfil === null  →  Stack "Onboarding"  (cadastro inicial)
 *   perfil !== null  →  Stack "MainApp"     (Drawer > Tabs)
 *
 * A troca é automática: quando PerfilContext atualiza perfil,
 * o React Navigation detecta a mudança na lista de screens e
 * faz a transição sem precisar de navigate() explícito.
 */
export const RootNavigator: React.FC = () => {
  const { perfil } = usePerfil();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {perfil === null ? (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ animationTypeForReplace: true }}
          />
        ) : (
          <Stack.Screen
            name="MainApp"
            component={MainDrawerNavigator}
            options={{ animationTypeForReplace: true }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
