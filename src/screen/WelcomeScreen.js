import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useColorMode } from 'native-base';

function WelcomeScreen({ navigation }) {
  const { colorMode } = useColorMode();

  const backgroundColor = colorMode === 'light' ? '#e6f2ff' : '#1a202c';
  const textColor = colorMode === 'light' ? '#3a5a9f' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Nombre de la app */}
      <Text style={[styles.appName, { color: textColor }]}>VECIAPP</Text>

      {/* Título de bienvenida */}
      <Text style={[styles.title, { color: textColor }]}>Welcome!</Text>

      {/* Botón Log in */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={[styles.buttonText, { color: textColor }]}>Log in</Text>
      </TouchableOpacity>

      {/* Enlace de Forgot Password */}
      <Pressable onPress={() => alert('Forgot Password not implemented yet')}>
        <Text style={[styles.linkText, { color: textColor }]}>Forgot Password</Text>
      </Pressable>

      {/* Botón Create */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={[styles.buttonText, { color: textColor }]}>Create</Text>
      </TouchableOpacity>

      {/* Texto de "Don't Have an Account?" */}
      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.linkText, { color: textColor }]}>
          Don't Have an Account?
        </Text>
      </Pressable>

      {/* Botón READ QR */}
      <View style={styles.readQrWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('Readqr')}>
          <Text style={[styles.readQrText, { color: textColor }]}>READ QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appName: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#4a4a4a',
  },
  title: {
    fontSize: 27,
    fontWeight: '600',
    marginBottom: 30,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 10,
    marginTop: 10,
    fontWeight: '500',
  },
  readQrWrapper: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  readQrText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
