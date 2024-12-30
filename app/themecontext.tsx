import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

// Definir el tipo de contexto del tema
type ThemeContextType = {
  theme: string;
  setTheme: (newTheme: string) => Promise<void>; // setTheme es una función asincrónica
};

// Crear el contexto con el tipo definido
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme(); // Detectar el tema del sistema
  const [theme, setTheme] = useState<string>('Predeterminado'); // Tema predeterminado

  useEffect(() => {
    // Cargar el tema guardado en AsyncStorage al iniciar la aplicación
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);

  const getTheme = () => {
    // Si el tema es 'Predeterminado', usar el tema del sistema
    if (theme === 'Predeterminado') {
      return systemTheme === 'dark' ? 'Oscuro' : 'Claro';
    }
    return theme;
  };

  const updateTheme = async (newTheme: string) => {
    setTheme(newTheme);
    await AsyncStorage.setItem('appTheme', newTheme); // Guardar el tema en AsyncStorage
  };

  return (
    <ThemeContext.Provider value={{ theme: getTheme(), setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para acceder al tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
};