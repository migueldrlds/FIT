// _layout.tsx
import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AnimatedTabBarNavigator, DotSize } from 'react-native-animated-nav-tab-bar';
import styled from 'styled-components/native';
import IndexScreen from './index';
import EjerciciosScreen from './ZONAS/ejercicios';
import PlanScreen from './plan';
import SettingsScreen from './settings';
import CalendarScreen from './calendar';
import { useTheme } from '../themecontext';

// Define el tipo de parámetros de navegación para el Stack
type RootStackParamList = {
  Zonas: undefined;
  Ejercicios: {
    zona: {
      id: string;
      nombre: string;
      descripcion: string;
      imagen?: string;
      ejercicios?: {
        id: string;
        nombre: string;
        descripcion: string;
        duracion: string;
        video: string;
        imagen: string;
      }[];
    };
  };
};

// Crear navegadores
const Stack = createStackNavigator<RootStackParamList>();
const Tabs = AnimatedTabBarNavigator();

// Placeholder para los íconos
const Placeholder = styled.Image`
  width: 30px;
  height: 30px;
`;

const TabBarPlaceholder = () => {
  return (
    <Placeholder source={{ uri: 'https://via.placeholder.com/100x100' }} />
  );
};

// Configuración del Stack.Navigator
function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Zonas"
        component={IndexScreen}
      />
      <Stack.Screen
        name="Ejercicios"
        component={EjerciciosScreen}
      />
    </Stack.Navigator>
  );
}

// Configuración del Tabs.Navigator
export default function TabsLayout() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'Oscuro';

  // Configuración de colores según el tema
  const activeTintColor = isDarkMode ? '#ffffff' : '#000000';
  const inactiveTintColor = isDarkMode ? '#888888' : '#999999';
  const backgroundColor = isDarkMode ? '#121212' : '#F0F0F3';
  const tabBarBackground = isDarkMode ? '#2C2C2E' : '#ffffff';

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: activeTintColor,
        inactiveTintColor: inactiveTintColor,
        activeBackgroundColor: backgroundColor,
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabStyle: {
          paddingVertical: 5,
        },
      }}
      appearance={{
        shadow: true,
        floating: true,
        dotSize: DotSize.MEDIUM,
        tabBarBackground: tabBarBackground,
        dotCornerRadius: 50,
      }}
    >
      {/* Pestaña Inicio con Stack Navigator */}
      <Tabs.Screen
        name="Inicio"
        component={StackNavigator}
        options={{
          tabBarIcon: () => <TabBarPlaceholder />,
        }}
      />
      <Tabs.Screen
        name="Check In"
        component={PlanScreen}
        options={{
          tabBarIcon: () => <TabBarPlaceholder />,
        }}
      />
      <Tabs.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: () => <TabBarPlaceholder />,
        }}
      />
      <Tabs.Screen
        name="Configuración"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => <TabBarPlaceholder />,
        }}
      />
    </Tabs.Navigator>
  );
}