import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from '@types/navigation';
import { useTheme } from '@theme/index';
import { MainAppNavigator } from './MainAppNavigator';
import DrawerContent from '@screens/DrawerContent';

const Drawer = createDrawerNavigator<DrawerParamList>();

export const MainDrawerNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Drawer.Navigator
      id="Drawer"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: theme.colors.surface,
          width: 280,
        },
        overlayColor: theme.colors.overlay,
        swipeEdgeWidth: 40,
      }}
    >
      <Drawer.Screen name="Tabs" component={MainAppNavigator} />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
