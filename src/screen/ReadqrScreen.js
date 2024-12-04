import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';

function ReadqrScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    try {
      const parsedData = JSON.parse(data);
      setQrData(parsedData);
      setScanned(true);
      Alert.alert('QR Scanned', 'QR code scanned successfully!');
    } catch (error) {
      Alert.alert('Error', 'Invalid QR code data');
    }
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera permission denied</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <>
          <Text style={styles.title}>Scan a QR Code</Text>
          {Camera.Constants?.BarCodeType || isCameraReady ? (
            <View style={styles.cameraContainer}>
              {!isCameraReady && (
                <ActivityIndicator size="large" color="#3a5a9f" style={styles.loader} />
              )}
              <Camera
                style={styles.camera}
                onCameraReady={onCameraReady}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeScannerSettings={{
                  barCodeTypes: [Camera.Constants?.BarCodeType?.qr || 'qr'],
                }}
              />
            </View>
          ) : (
            <Text style={styles.message}>Camera module not initialized.</Text>
          )}
        </>
      ) : (
        <View style={styles.dataContainer}>
          <Text style={styles.label}>QR Data:</Text>
          <Text style={styles.text}>Name: {qrData?.name || 'Not available'}</Text>
          <Text style={styles.text}>
            Start Date: {qrData?.startDate || 'Not available'}
          </Text>
          <Text style={styles.text}>
            End Date: {qrData?.endDate || 'Not available'}
          </Text>
          <Text style={styles.text}>
            Visit Type: {qrData?.typeOfVisit || 'Not available'}
          </Text>
          <Text style={styles.text}>Note: {qrData?.note || 'Not available'}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setScanned(false);
              setQrData(null);
            }}
          >
            <Text style={styles.buttonText}>Scan Another QR</Text>
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
  cameraContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
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

