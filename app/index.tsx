// app/index.tsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, SafeAreaView } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useNavigation } from 'expo-router';
import 'react-native-gesture-handler'; // Importa primero
import { useTheme } from '@/app/themecontext';

export default function Index() {
  const router = useRouter();
  const navigation = useNavigation();

  // Ocultar el encabezado de la página
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de estado en blanco */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <Video
        source={require('../assets/videos/vid.mp4')}
        style={styles.backgroundVideo}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
      />

      {/* Logo en la esquina superior izquierda */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* Degradado */}
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
        style={styles.overlay}
      />

      <View style={styles.content}>
        {/* Texto alineado a la izquierda */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Fit Gimnasio Macroplaza</Text>
          <Text style={styles.subtitle}>
            Tu espacio para el bienestar. Te queremos FIT.
          </Text>
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Únete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Establece un color de fondo negro para forzar el contenido claro
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  logoContainer: {
    position: 'absolute', 
    top: 50,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    tintColor: '#fff', 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  textContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 18,
    color: '#d3d3d3',
    textAlign: 'left',
    marginTop: 10,
    opacity: 0.8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  joinButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginRight: 10,
  },
  joinButtonText: {
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});