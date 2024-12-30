import React, { useState } from 'react';
import { useTheme } from '@/app/themecontext';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import zonasData from './ZONAS/zonas.json';
import ejerciciosData from './ZONAS/ejercicios.json';
import { NavigationProp } from '@react-navigation/native';

interface Ejercicio {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  video: string;
  imagen: string;
  zonaId: string;
}

interface Zona {
  id: string;
  nombre: string;
  descripcion: string;
  imagen?: string;
}

type IndexProps = {
  navigation: NavigationProp<any>;
};

export default function Index({ navigation }: IndexProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'Oscuro';

  const [searchText, setSearchText] = useState('');
  const [filteredResults, setFilteredResults] = useState<(Zona | Ejercicio)[]>([
    ...zonasData.zonas,
    ...ejerciciosData,
  ]);

  const handleSearch = (text: string) => {
    setSearchText(text);

    if (text === '') {
      setFilteredResults([...zonasData.zonas, ...ejerciciosData]);
    } else {
      const filteredZonas = zonasData.zonas.filter(
        (zona) =>
          zona.nombre.toLowerCase().includes(text.toLowerCase()) ||
          zona.descripcion.toLowerCase().includes(text.toLowerCase())
      );

      const filteredEjercicios = ejerciciosData.filter(
        (ejercicio) =>
          ejercicio.nombre.toLowerCase().includes(text.toLowerCase()) ||
          ejercicio.descripcion.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredResults([...filteredZonas, ...filteredEjercicios]);
    }
  };

  const handleItemPress = (item: Zona | Ejercicio) => {
    if ('zonaId' in item) {
      // Es un ejercicio
      console.log('Ejercicio seleccionado:', item);
    } else {
      // Es una zona
      navigation.navigate('Ejercicios', { zona: item });
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : '#ffffff' },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.searchBar}>
        <TextInput
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Buscar zona o ejercicio"
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          style={[
            styles.searchInput,
            { backgroundColor: isDarkMode ? '#333' : '#f0f0f0', color: isDarkMode ? '#fff' : '#000' },
          ]}
        />
      </View>
      <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
        Zonas y Ejercicios
      </Text>
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => ('zonaId' in item ? item.id : item.id)}
        renderItem={({ item }) =>
          'zonaId' in item ? (
            // Renderizar ejercicio
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' },
              ]}
              onPress={() => handleItemPress(item)}
            >
              <Image source={{ uri: item.imagen }} style={styles.image} />
              <Text
                style={[
                  styles.cardTitle,
                  { color: isDarkMode ? '#ffffff' : '#000000' },
                ]}
              >
                {item.nombre}
              </Text>
              <Text
                style={[
                  styles.cardDescription,
                  { color: isDarkMode ? '#bbbbbb' : '#555555' },
                ]}
              >
                {item.descripcion}
              </Text>
            </TouchableOpacity>
          ) : (
            // Renderizar zona
            <TouchableOpacity
              style={[
                styles.zoneCard,
                { backgroundColor: isDarkMode ? '#333' : '#e0e0e0' },
              ]}
              onPress={() => handleItemPress(item)}
            >
              <Image source={{ uri: item.imagen || 'https://via.placeholder.com/300' }} style={styles.zoneImage} />
              <Text
                style={[
                  styles.zoneTitle,
                  { color: isDarkMode ? '#fff' : '#000' },
                ]}
              >
                {item.nombre}
              </Text>
              <Text
                style={[
                  styles.zoneSubtitle,
                  { color: isDarkMode ? '#aaa' : '#555' },
                ]}
              >
                {item.descripcion}
              </Text>
            </TouchableOpacity>
          )
        }
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={
          <Text style={[styles.emptyMessage, { color: isDarkMode ? '#bbbbbb' : '#555555' }]}>
            No se encontraron resultados
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  searchBar: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchInput: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
  zoneCard: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  zoneImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  zoneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  zoneSubtitle: {
    fontSize: 14,
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
    textAlign: 'center',
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