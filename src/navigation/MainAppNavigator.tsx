import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainAppParamList } from '@types/navigation';
import { useTheme, Spacing } from '@theme/index';
import { TABS } from '@constants/index';
import HomeScreen from '@screens/HomeScreen';
import DiaryScreen from '@screens/DiaryScreen';
import CalendarScreen from '@screens/CalendarScreen';

const Tab = createBottomTabNavigator<MainAppParamList>();

const TabIcon: React.FC<{ icon: string; focused: boolean }> = ({ icon, focused }) => (
  <Text style={{ fontSize: focused ? 26 : 22, opacity: focused ? 1 : 0.55 }}>
    {icon}
  </Text>
);

export const MainAppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:   theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grayMedium,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor:  theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: Spacing.sm,
          paddingTop:    Spacing.sm,
          height: 62,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      {TABS.map((tab) => {
        const screenMap: Record<string, React.ComponentType<any>> = {
          home:     HomeScreen,
          diary:    DiaryScreen,
          calendar: CalendarScreen,
        };
        const nameMap: Record<string, keyof MainAppParamList> = {
          home:     'Home',
          diary:    'Diary',
          calendar: 'Calendar',
        };
        return (
          <Tab.Screen
            key={tab.id}
            name={nameMap[tab.id]}
            component={screenMap[tab.id]}
            options={{
              title:        tab.label,
              tabBarLabel:  tab.label,
              tabBarIcon: ({ focused }) => <TabIcon icon={tab.icon} focused={focused} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default MainAppNavigator;
