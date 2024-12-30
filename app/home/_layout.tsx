// _layout.tsx
import React from 'react';
import { Image } from 'react-native';
import { AnimatedTabBarNavigator, DotSize } from 'react-native-animated-nav-tab-bar';
import styled from 'styled-components/native'; // Usar styled-components para los estilos
import PlanScreen from './plan';
import IndexScreen from './index';
import SettingsScreen from './settings';
import CalendarScreen from './calendar';
import { useTheme } from '../themecontext'; // Hook para el tema

const Tabs = AnimatedTabBarNavigator();

const Placeholder = styled.Image`
  width: 30px;
  height: 30px;
`;

const TabBarPlaceholder = () => {
  return (
    <Placeholder source={{ uri: 'https://via.placeholder.com/100x100' }} />
  );
};

export default function TabsLayout() {
  const { theme } = useTheme(); // Accedemos al tema actual del dispositivo
  const isDarkMode = theme === 'Oscuro';

  // Definir colores según el modo oscuro o claro
  const activeTintColor = isDarkMode ? '#ffffff' : '#000000';
  const inactiveTintColor = isDarkMode ? '#888888' : '#999999';
  const backgroundColor = isDarkMode ? '#121212' : '#F0F0F3'; // Ajustar al tono del QR
  const tabBarBackground = isDarkMode ? '#2C2C2E' : '#ffffff'; // Color de la barra

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: activeTintColor,
        inactiveTintColor: inactiveTintColor,
        activeBackgroundColor: backgroundColor,
        labelStyle: {
          fontSize: 12, // Ajusta el tamaño de la fuente del texto
          fontWeight: 'bold', // Asegúrate de que el texto sea visible
        },
        tabStyle: {
          paddingVertical: 5, // Ajusta el padding para que haya espacio para el texto e icono
        },
      }}
      appearance={{
        shadow: true,
        floating: true,
        dotSize: DotSize.MEDIUM, // Aumentar el tamaño del indicador circular
        tabBarBackground: tabBarBackground, // Fondo que cambia según el tema
        dotCornerRadius: 50, // Asegurarse de que el punto esté bien redondeado
      }}
    >
      {/* Reordenamos la pantalla Index para que sea la primera */}
      <Tabs.Screen
        name="Inicio"
        component={IndexScreen}
        options={{
          tabBarIcon: () => <TabBarPlaceholder />
        }}
      />
      <Tabs.Screen
        name="Check In"
        component={PlanScreen}
        options={{
          tabBarIcon: () => <TabBarPlaceholder />
        }}
      />
      <Tabs.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: () => <TabBarPlaceholder />
        }}
      />
      <Tabs.Screen
        name="Configuración"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => <TabBarPlaceholder />
        }}
      />
    </Tabs.Navigator>
  );
}