// app/login.tsx
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Linking, Image, useColorScheme } from 'react-native';
import { useNavigation, useFocusEffect } from 'expo-router';

export default function LoginScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme(); // Detectar el esquema de color del sistema (claro u oscuro)

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
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}>
      {/* Cambia la barra de estado según el tema */}
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Logo PNG */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={[styles.logo, { tintColor: colorScheme === 'dark' ? '#fff' : '#000' }]}
        />
      </View>

      {/* Texto de bienvenida */}
      <Text style={[styles.mainText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
        Ingresa tu ID de socio para iniciar sesión.
      </Text>

      {/* Campo de entrada */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f9f9f9', borderColor: colorScheme === 'dark' ? '#555' : '#ccc', color: colorScheme === 'dark' ? '#fff' : '#000' }]}
          placeholder="ID de socio*"
          placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
        />
      </View>

      {/* Términos y condiciones */}
      <Text style={[styles.termsText, { color: colorScheme === 'dark' ? '#bbb' : '#666' }]}>
        Al continuar, acepto la{' '}
        <Text
          style={[styles.linkText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
          onPress={() => Linking.openURL('https://www.politicadeprivacidad.com')}
        >
          Política de privacidad
        </Text>{' '}
        y{' '}
        <Text
          style={[styles.linkText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
          onPress={() => Linking.openURL('https://www.terminosycondiciones.com')}
        >
          Términos de uso
        </Text>.
      </Text>

      {/* Botón de continuar */}
      <TouchableOpacity
        style={[styles.continueButton, { backgroundColor: colorScheme === 'dark' ? '#fff' : '#000' }]}
        onPress={() => navigation.navigate('password' as never)}
      >
        <Text style={[styles.continueButtonText, { color: colorScheme === 'dark' ? '#000' : '#fff' }]}>Continuar</Text>
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
    fontSize: 26, // Tamaño de fuente igual al de la pantalla de configuración
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
  termsText: {
    fontSize: 14,
    fontFamily: 'System', // Fuente del sistema
    textAlign: 'left',
    marginBottom: 20,
  },
  linkText: {
    textDecorationLine: 'underline',
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