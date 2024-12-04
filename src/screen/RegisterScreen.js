import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorMode } from 'native-base';

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { colorMode } = useColorMode();

  const backgroundColor = colorMode === 'light' ? '#e6f2ff' : '#1a202c';
  const textColor = colorMode === 'light' ? '#3a5a9f' : '#ffffff';
  const placeholderColor = colorMode === 'light' ? '#6a8caf' : '#aaa';

  // Manejo del registro
  const handleRegister = () => {
    if (password !== repeatPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Redirigir a "QRVisit" después de un registro exitoso
    navigation.navigate('QRVisit');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.appName, { color: textColor }]}>VECIAPP</Text>
      <Text style={[styles.title]}>Create account</Text>

      <TextInput
        style={[styles.input, { color: textColor, borderBottomColor: textColor }]}
        placeholder="E-mail"
        placeholderTextColor={placeholderColor}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { color: textColor, borderBottomColor: textColor }]}
        placeholder="Full Name"
        placeholderTextColor={placeholderColor}
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={[styles.input, { color: textColor, borderBottomColor: textColor }]}
        placeholder="Address"
        placeholderTextColor={placeholderColor}
        value={address}
        onChangeText={setAddress}
      />
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
      <TextInput
        style={[styles.input, { color: textColor, borderBottomColor: textColor }]}
        placeholder="Repeat Password"
        placeholderTextColor={placeholderColor}
        secureTextEntry
        value={repeatPassword}
        onChangeText={setRepeatPassword}
      />

      {/* Botón de "Register" */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={[styles.buttonText]}>Register</Text>
      </TouchableOpacity>

      {/* Enlace para redirigir al Login */}
      <Text
        style={[styles.linkText, { color: textColor }]}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Log in
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

export default RegisterScreen;