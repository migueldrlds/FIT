// app/password.tsx
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, useColorScheme } from 'react-native';
import { useNavigation, useFocusEffect, useRouter } from 'expo-router';

export default function PasswordScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme(); // Detectar el modo de color
  const router = useRouter(); 
  const isDarkMode = colorScheme === 'dark'; // Verificar si el modo es oscuro

  // Ocultar el encabezado y personalizar el botón "Atrás"
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerShown: false, // Oculta el encabezado de la página
        headerBackTitle: 'Atrás', // Cambia el texto del botón "Atrás"
      });
    }, [navigation])
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}>
      {/* Cambia la barra de estado según el modo */}
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Logo PNG */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={[styles.logo, { tintColor: isDarkMode ? '#fff' : '#000' }]} // Aplicar el color según el modo
        />
      </View>

      {/* Texto de bienvenida */}
      <Text style={[styles.mainText, { color: isDarkMode ? '#fff' : '#000' }]}>
        ¿Cuál es tu contraseña?
      </Text>

      {/* Campo de entrada */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#f9f9f9', borderColor: isDarkMode ? '#555' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          placeholder="Contraseña*"
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
        />
      </View>

      {/* Botón de iniciar sesión */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: isDarkMode ? '#fff' : '#000' } // Fondo blanco en modo oscuro, negro en modo claro
        ]}
        onPress={() => router.push("/home")} 
      >
        <Text style={[
          styles.continueButtonText,
          { color: isDarkMode ? '#000' : '#fff' } // Texto negro en modo oscuro, blanco en modo claro
        ]}>
          Iniciar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  mainText: {
    fontSize: 26, // Tamaño del texto igual al de la pantalla de configuración
    fontWeight: 'bold', // Negrita como en la pantalla de configuración
    fontFamily: 'System', // Usar la fuente predeterminada del sistema
    textAlign: 'left',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'System', // Fuente del sistema
  },
  continueButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '100%',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'System', // Fuente del sistema
  },
});