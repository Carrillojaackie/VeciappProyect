import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const PayScreen = ({ route, navigation }) => {
  const { month } = route.params;

  // Estado para controlar si el pago está procesando
  const [loading, setLoading] = useState(false);

  // Reemplaza esto con tu Client ID de PayPal Sandbox
  const PAYPAL_CLIENT_ID = "TU_CLIENT_ID_DE_SANDBOX";

  // URL de PayPal para sandbox
  const paypalURL = `
    https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD
  `;

  // HTML para el botón de PayPal
  const paypalHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="${paypalURL}"></script>
      </head>
      <body style="display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
        <div id="paypal-button-container"></div>
        <script>
          paypal.Buttons({
            createOrder: function(data, actions) {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: '50.00' // Cambia el monto aquí
                  }
                }]
              });
            },
            onApprove: function(data, actions) {
              return actions.order.capture().then(function(details) {
                // Pago exitoso, manda un mensaje de éxito
                window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'success', details }));
              });
            },
            onCancel: function(data) {
              // Pago cancelado
              window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'cancel' }));
            },
            onError: function(err) {
              // Error en el pago
              window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'error', error: err }));
            }
          }).render('#paypal-button-container');
        </script>
      </body>
    </html>
  `;

  const handleWebViewMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.status === "success") {
      alert("Pago exitoso: " + data.details.payer.name.given_name);
      navigation.goBack();
    } else if (data.status === "cancel") {
      alert("Pago cancelado");
    } else if (data.status === "error") {
      alert("Error en el pago: " + data.error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment for {month}</Text>
      <Text style={styles.subtitle}>Processing with PayPal</Text>

      {loading && (
        <ActivityIndicator size="large" color="#0070BA" style={styles.loader} />
      )}

      <WebView
        originWhitelist={["*"]}
        source={{ html: paypalHTML }}
        onMessage={handleWebViewMessage}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3E5061",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#3E5061",
    textAlign: "center",
    marginBottom: 20,
  },
  loader: {
    marginBottom: 20,
  },
  webview: {
    flex: 1,
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default PayScreen;
