import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import ejerciciosData from './ejercicios.json'; // Importa el archivo JSON
import { useTheme } from '../../themecontext';

type RootStackParamList = {
  Zonas: undefined;
  Ejercicios: {
    zona: {
      id: string;
      nombre: string;
    };
  };
};

type EjerciciosScreenProps = StackScreenProps<RootStackParamList, 'Ejercicios'>;

export default function EjerciciosScreen({ route, navigation }: EjerciciosScreenProps) {
  const { zona } = route.params;
  const { theme } = useTheme(); // Obtener el tema actual
  const isDarkMode = theme === 'Oscuro';

  // Filtrar los ejercicios según la zona seleccionada
  const ejercicios = ejerciciosData.filter((ejercicio) => ejercicio.zonaId === zona.id);

  const handleEjercicioPress = (ejercicio: any) => {
    console.log('Navegar al detalle del ejercicio:', ejercicio);
    // Aquí puedes agregar lógica para navegar a una pantalla de detalles
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }, // Fondo dinámico
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isDarkMode ? '#ffffff' : '#000000' }, // Color dinámico para el título
        ]}
      >
        {zona.nombre}
      </Text>
      <FlatList
        data={ejercicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              { backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' }, // Fondo dinámico para las tarjetas
            ]}
            onPress={() => handleEjercicioPress(item)}
          >
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <Text
              style={[
                styles.cardTitle,
                { color: isDarkMode ? '#ffffff' : '#000000' }, // Color dinámico para el título
              ]}
            >
              {item.nombre}
            </Text>
            <Text
              style={[
                styles.cardDescription,
                { color: isDarkMode ? '#bbbbbb' : '#555555' }, // Color dinámico para la descripción
              ]}
            >
              {item.descripcion}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text
            style={[
              styles.emptyMessage,
              { color: isDarkMode ? '#bbbbbb' : '#555555' }, // Mensaje vacío dinámico
            ]}
          >
            No hay ejercicios disponibles
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});