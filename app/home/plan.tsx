import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../themecontext'; // Usar el contexto personalizado
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

export default function PlanScreen() {
  const { theme } = useTheme(); // Usar el tema global usando el hook personalizado
  const isDarkMode = theme === 'Oscuro'; // Verificar si el tema global es oscuro
  const [qrValue, setQrValue] = useState<string | null>(null);

  // Activar KeepAwake cuando se monta el componente
  useEffect(() => {
    activateKeepAwakeAsync(); // Mantener la pantalla despierta

    // Cargar el código QR almacenado al iniciar la app
    const loadQrCode = async () => {
      try {
        const storedQr = await AsyncStorage.getItem('qrCode');
        if (storedQr) {
          setQrValue(storedQr);
        } else {
          // Si no hay un código almacenado, usar un valor predeterminado
          const newQr = '28665';
          setQrValue(newQr);
          await AsyncStorage.setItem('qrCode', newQr);
        }
      } catch (e) {
        console.error('Error cargando el código QR:', e);
      }
    };

    loadQrCode();

    return () => {
      deactivateKeepAwake(); // Desactivar cuando se desmonta el componente
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F0F0F0' }]}>
      <View style={[styles.card, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF' }]}>
        <View style={[styles.qrContainer, { backgroundColor: '#FFFFFF' }]}>
          {qrValue ? (
            <QRCode
              value={qrValue} // Valor del código QR almacenado
              size={150}
              backgroundColor="white"
              color="black"
            />
          ) : (
            <Text>No hay código QR disponible</Text>
          )}
        </View>
        {qrValue && (
          <>
            <Text style={[styles.qrValue, { color: isDarkMode ? '#FFFFFF' : '#333', fontFamily: 'System' }]}>
              {qrValue}
            </Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? '#B3B3B3' : '#666', fontFamily: 'System' }]}>
              Posiciona este Código QR en el frame del escáner para registrar tu entrada.
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
    width: '85%',
  },
  qrContainer: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF', // Fondo blanco para el rectángulo del QR
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrValue: {
    fontSize: 20, // Tamaño más grande para el número
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'System', // Aplicar la fuente predeterminada de iOS (San Francisco)
  },
  subtitle: {
    fontSize: 14, // Tamaño más pequeño para el texto de descripción
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    fontFamily: 'System', // Aplicar la fuente predeterminada de iOS
  },
});