import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const EmergenceScreen = ({ navigation }) => {
  const [note, setNote] = useState("");
  const [pressCount, setPressCount] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);

  const handlePress = () => {
    const newPressCount = pressCount + 1;
    setPressCount(newPressCount);

    if (newPressCount === 3) {
      setAlertVisible(true); // Mostrar mensaje visual
      setPressCount(0); // Reiniciar contador
    }
  };

  const handleSendNote = () => {
    alert(`Your note: "${note}" has been sent.`);
    setNote(""); // Limpiar campo de texto
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>VECIAPP</Text>
      <Text style={styles.title}>Emergence</Text>

      {/* Emergency Button */}
      <TouchableOpacity style={styles.emergencyButton} onPress={handlePress}>
        <Text style={styles.emergencyButtonText}>PRESS</Text>
      </TouchableOpacity>

      <Text style={styles.instructionText}>Press 3 times in case of emergency.</Text>

      {/* Note Input */}
      <TextInput
        style={styles.input}
        placeholder="Note (optional)"
        placeholderTextColor="#6a8caf"
        value={note}
        onChangeText={setNote}
      />

      {/* Send Note Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendNote}>
        <Text style={styles.sendButtonText}>Send note</Text>
      </TouchableOpacity>

      {/* Emergency Alert Modal */}
      <Modal visible={alertVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🚨 Emergency Alert</Text>
            <Text style={styles.modalMessage}>
              Emergency has been triggered successfully!
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAlertVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Menu */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("QRVisit")}>
          <Icon name="qr-code-outline" size={40} color="#3a5a9f" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Maintenance")}>
          <Icon name="cash-outline" size={40} color="#3a5a9f" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Reserve")}>
          <Icon name="calendar-outline" size={40} color="#3a5a9f" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Emergence")}>
          <Icon name="alert-circle-outline" size={40} color="#3a5a9f" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e6f2ff", // Fondo uniforme
  },
  appName: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "#3a5a9f",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3a5a9f",
    textAlign: "center",
    marginBottom: 40,
  },
  emergencyButton: {
    width: 150,
    height: 150,
    backgroundColor: "#ff4d4d",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  emergencyButtonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  instructionText: {
    textAlign: "center",
    fontSize: 16,
    color: "#3a5a9f",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#3a5a9f",
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#3a5a9f",
  },
  sendButton: {
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3a5a9f",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff4d4d",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#3a5a9f",
  },
  closeButton: {
    backgroundColor: "#3a5a9f",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "auto", // Empuja al fondo
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default EmergenceScreen;
