import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const PaymentScreen = ({ route, navigation }) => {
  const { month } = route.params; // Recibe el mes desde la pantalla de mantenimiento

  const [payPalPayment, setPayPalPayment] = useState(null);

  // URL de PayPal con los parámetros para el pago
  const payPalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=Payment for ${month}&amount=560.00&currency_code=MXN`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment for {month}</Text>

      <WebView
        source={{ uri: payPalUrl }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onNavigationStateChange={(event) => {
          if (event.url.includes("success")) {
            alert(`Payment for ${month} was successful!`);
            navigation.goBack(); // Regresar a la pantalla anterior después del pago exitoso
          }
          if (event.url.includes("cancel")) {
            alert("Payment was canceled.");
            navigation.goBack(); // Regresar si el pago es cancelado
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e6f2ff", // Fondo uniforme
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3E5061",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default PaymentScreen;
