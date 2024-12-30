import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useTheme } from '../themecontext'; // Usar el hook personalizado para acceder al tema

export default function Index() {
  const { theme } = useTheme(); // Usar el tema global usando el hook personalizado
  const isDarkMode = theme === 'Oscuro'; // Verificar si el tema global es oscuro

  // Función para obtener el saludo adecuado según la hora
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return '¡Buenos días, Angel!';
    } else if (currentHour >= 12 && currentHour < 18) {
      return '¡Buenas tardes, Angel!';
    } else {
      return '¡Buenas noches, Angel!';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }]}>
      {/* Ajuste de la barra de estado */}
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Encabezado estático */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: isDarkMode ? '#FFFFFF' : '#242424' }]}>{getGreeting()}</Text>
        <TouchableOpacity style={[styles.searchButton, { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' }]}>
          <Image source={require('../../assets/images/search-icon.png')} style={[styles.searchIcon, { tintColor: isDarkMode ? '#FFFFFF' : '#000' }]} />
        </TouchableOpacity>
      </View>

      {/* Contenido desplazable */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Área de pesas */}
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#242424' }]}>Área de pesas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <View style={[styles.zoneCard, { backgroundColor: isDarkMode ? '#333' : '#E0E0E0' }]}>
            <Image source={{ uri: 'https://via.placeholder.com/452x226' }} style={styles.zoneImage} />
            <Text style={[styles.zoneTitle, { color: isDarkMode ? '#FFFFFF' : '#242424' }]}>ZONA 1</Text>
            <Text style={[styles.zoneSubtitle, { color: isDarkMode ? '#B3B3B3' : '#666' }]}>Abdomen</Text>
          </View>
        </ScrollView>

        {/* Otros componentes aquí */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0, // Ajustar el margen superior para Android
  },
  scrollViewContent: {
    paddingHorizontal: 20, // Ajustar el margen horizontal aquí
    paddingBottom: 20, // Espacio inferior para evitar que el contenido quede pegado al borde inferior
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, // Ajustar el margen horizontal del encabezado
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Línea separadora
  },
  greeting: {
    fontSize: 26, // Aplicar el mismo tamaño que el título de Configuración
    fontWeight: 'bold', // Negrita como el título de Configuración
    marginBottom: 10, // Ajustar el margen inferior
    fontFamily: 'System', // Aplicar la fuente predeterminada del sistema
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 10,
    fontFamily: 'System', // Aplicar la fuente predeterminada del sistema
  },
  horizontalScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  zoneCard: {
    width: 165,
    marginRight: 20,
    borderRadius: 8,
  },
  zoneImage: {
    width: '100%',
    height: 120,
  },
  zoneTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 5,
    fontFamily: 'System', // Aplicar la fuente predeterminada del sistema
  },
  zoneSubtitle: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'System', // Aplicar la fuente predeterminada del sistema
  },
});