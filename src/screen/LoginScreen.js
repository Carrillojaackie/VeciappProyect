import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorMode } from 'native-base';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { colorMode } = useColorMode();

  const backgroundColor = colorMode === 'light' ? '#e6f2ff' : '#1a202c';
  const textColor = colorMode === 'light' ? '#3a5a9f' : '#ffffff';
  const placeholderColor = colorMode === 'light' ? '#6a8caf' : '#aaa';

  // Manejo del inicio de sesión
  const handleLogin = () => {
    // Aquí podrías agregar lógica para verificar las credenciales del usuario.
    if (username && password) {
      // Redirigir a la pantalla QRVisit después de iniciar sesión
      navigation.navigate('QRVisit');
    } else {
      alert('Por favor, introduce un usuario y contraseña válidos.');
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot password functionality not implemented yet');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Nombre de la app */}
      <Text style={[styles.appName, { color: textColor }]}>VECIAPP</Text>

      {/* Log in */}
      <Text style={[styles.title]}>Log in</Text>

      {/* Input Fields */}
      <TextInput
        style={[styles.input, { color: textColor, borderBottomColor: textColor }]}
        placeholder="Username"
        placeholderTextColor={placeholderColor}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { color: textColor, borderBottomColor: textColor }]}
        placeholder="Password"
        placeholderTextColor={placeholderColor}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Log in Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={[styles.buttonText]}>Log in</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <Text style={[styles.linkText, { color: textColor }]} onPress={handleForgotPassword}>
        Forgot Password
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#e6f2ff',
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginBottom: 40,
    color: '#4a4a4a', 
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    marginBottom: 30,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#3a5a9f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

