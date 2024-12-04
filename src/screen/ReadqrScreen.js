import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

function ReadqrScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null); // Verifica los permisos de la cámara
  const [scanned, setScanned] = useState(false); // Controla el estado del escaneo
  const [qrData, setQrData] = useState(null); // Almacena los datos del QR

  // Solicita permisos para usar la cámara al montar el componente
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    try {
      const parsedData = JSON.parse(data); // Supone que el QR contiene JSON con datos
      setQrData(parsedData);
      setScanned(true);
      Alert.alert('Acceso permitido', 'QR escaneado correctamente');
    } catch (error) {
      Alert.alert('Error', 'El código QR no contiene datos válidos');
    }
  };

  // Manejo de permisos no concedidos
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Solicitando permiso para usar la cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          No se concedieron permisos para usar la cámara.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <>
          <Text style={styles.title}>Escanea un código QR</Text>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </>
      ) : (
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Datos leídos del QR:</Text>
          <Text style={styles.text}>Nombre: {qrData?.name || 'No disponible'}</Text>
          <Text style={styles.text}>
            Fecha de inicio: {qrData?.startDate || 'No disponible'}
          </Text>
          <Text style={styles.text}>
            Fecha de fin: {qrData?.endDate || 'No disponible'}
          </Text>
          <Text style={styles.text}>
            Tipo de visita: {qrData?.typeOfVisit || 'No disponible'}
          </Text>
          <Text style={styles.text}>Nota: {qrData?.note || 'No disponible'}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setScanned(false);
              setQrData(null);
            }}
          >
            <Text style={styles.buttonText}>Escanear otro QR</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dataContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#3a5a9f',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReadqrScreen;



