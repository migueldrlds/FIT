import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from './themecontext'; // Asegúrate de que la ruta sea correcta

const Layout: React.FC = () => {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="password" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

export default Layout;