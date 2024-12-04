import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";

const ReserveScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const availableDates = {
    pool: ["2024-12-01", "2024-12-05", "2024-12-10"],
    park: ["2024-12-02", "2024-12-08", "2024-12-15"],
    eventHall: ["2024-12-03", "2024-12-07", "2024-12-20"],
  };

  const handleButtonPress = (option) => {
    setSelectedOption(option);
    setModalVisible(true);
  };

  const renderMarkedDates = () => {
    if (!selectedOption) return {};
    const dates = availableDates[selectedOption.toLowerCase()] || [];
    const markedDates = {};
    dates.forEach((date) => {
      markedDates[date] = { marked: true, dotColor: "blue" };
    });
    return markedDates;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserve</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.optionButton} onPress={() => handleButtonPress("pool")}>
        <Text style={styles.buttonText}>Pool</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => handleButtonPress("park")}>
        <Text style={styles.buttonText}>Park</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => handleButtonPress("eventHall")}>
        <Text style={styles.buttonText}>Event Hall</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a date for {selectedOption}</Text>
            <Calendar
              markedDates={renderMarkedDates()}
              onDayPress={(day) => {
                alert(`You selected ${day.dateString} for ${selectedOption}`);
                setModalVisible(false);
              }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
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
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
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
  buttonText: {
    color: "#3a5a9f",
    fontSize: 18,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "#3a5a9f",
    fontSize: 16,
    fontWeight: "600",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 'auto', // Empuja al fondo
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default ReserveScreen;
