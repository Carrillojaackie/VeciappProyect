import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const EmergencyFollowUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Icon name="alert-circle-outline" size={80} color="#ff4d4d" />
      <Text style={styles.title}>Emergency Follow-Up</Text>

      <Text style={styles.message}>
        The rescue team has been notified and is on its way! Please stay in a safe location.
      </Text>

      <Image
        style={styles.image}
        source={{
          uri: "https://img.icons8.com/external-flat-icons-inmotus-design/344/external-rescue-disaster-and-rescue-flat-icons-inmotus-design.png",
        }}
      />

      <Text style={styles.instruction}>
        You can perform the following actions while waiting:
      </Text>

      {/* Action Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => alert("Tracking rescue team location...")}
        >
          <Text style={styles.trackButtonText}>Track Rescue Team</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => alert("Submitting additional information...")}
        >
          <Text style={styles.reportButtonText}>Send Update</Text>
        </TouchableOpacity>
      </View>

      {/* Additional Features */}
      <View style={styles.additionalInfo}>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => alert("Safety tips and emergency contact numbers shown!")}
        >
          <Icon name="information-circle-outline" size={30} color="#3a5a9f" />
          <Text style={styles.infoText}>Safety Tips</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => alert("Your emergency history is displayed!")}
        >
          <Icon name="time-outline" size={30} color="#3a5a9f" />
          <Text style={styles.infoText}>View History</Text>
        </TouchableOpacity>
      </View>

      {/* Footer with navigation */}
      <Text style={styles.footerText}>
        Stay calm. Help is on the way. Keep this app open for live updates.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e6f2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3a5a9f",
    marginTop: 20,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#3a5a9f",
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  instruction: {
    fontSize: 16,
    color: "#3a5a9f",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  trackButton: {
    backgroundColor: "#3a5a9f",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    flex: 1,
    alignItems: "center",
  },
  trackButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  reportButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    flex: 1,
    alignItems: "center",
  },
  reportButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  additionalInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  infoButton: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#3a5a9f",
    marginTop: 5,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#3a5a9f",
    marginTop: 30,
  },
});

export default EmergencyFollowUpScreen;