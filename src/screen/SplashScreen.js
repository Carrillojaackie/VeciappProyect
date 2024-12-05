import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navega a la pantalla de Welcome después de 5 segundos
    const timer = setTimeout(() => {
      navigation.replace("Welcome"); // Cambia "Welcome" por la pantalla de bienvenida
    }, 5000); // 5000ms = 5 segundos

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>VECIAPP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f2ff", // Fondo azul claro
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#3a5a9f", // Azul del logo
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default SplashScreen;