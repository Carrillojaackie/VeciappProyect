import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Modal,
} from 'react-native';
import { useColorMode } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';

function QRVisitScreen({ navigation }) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [typeOfVisit, setTypeOfVisit] = useState('');
  const [note, setNote] = useState('');
  const [showPicker, setShowPicker] = useState({ type: null, show: false });
  const [qrVisible, setQrVisible] = useState(false);
  const { colorMode } = useColorMode();

  const backgroundColor = colorMode === 'light' ? '#e6f2ff' : '#1a202c';
  const textColor = colorMode === 'light' ? '#3a5a9f' : '#ffffff';
  const placeholderColor = colorMode === 'light' ? '#6a8caf' : '#aaa';

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      if (showPicker.type === 'start') setStartDate(selectedDate);
      if (showPicker.type === 'end') setEndDate(selectedDate);
    }
    setShowPicker({ type: null, show: false });
  };

  const openDatePicker = (type) => {
    setShowPicker({ type, show: true });
  };

  const handleGenerateQR = () => {
    setQrVisible(true);
  };

  const qrData = {
    name: name || 'Not provided',
    startDate: startDate ? startDate.toDateString() : 'Not provided',
    endDate: endDate ? endDate.toDateString() : 'Not provided',
    typeOfVisit: typeOfVisit || 'Not provided',
    note: note || 'Not provided',
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>QR Visit</Text>

      <TextInput
        style={[styles.input, { color: textColor, borderBottomColor: textColor }]}
        placeholder="Name"
        placeholderTextColor={placeholderColor}
        value={name}
        onChangeText={setName}
      />

      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          style={styles.dateField}
          onPress={() => openDatePicker('start')}
        >
          <Text
            style={[
              styles.dateText,
              { color: startDate ? textColor : placeholderColor },
            ]}
          >
            {startDate ? startDate.toDateString() : 'Start date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openDatePicker('start')}>
          <Icon name="calendar-outline" size={20} color={textColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          style={styles.dateField}
          onPress={() => openDatePicker('end')}
        >
          <Text
            style={[
              styles.dateText,
              { color: endDate ? textColor : placeholderColor },
            ]}
          >
            {endDate ? endDate.toDateString() : 'End date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openDatePicker('end')}>
          <Icon name="calendar-outline" size={20} color={textColor} />
        </TouchableOpacity>
      </View>

      {showPicker.show && (
        <DateTimePicker
          value={
            showPicker.type === 'start'
              ? startDate || new Date()
              : endDate || new Date()
          }
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <View style={[styles.pickerContainer, { borderBottomColor: textColor }]}>
        <Picker
          selectedValue={typeOfVisit}
          onValueChange={(itemValue) => setTypeOfVisit(itemValue)}
          style={[styles.picker, { color: textColor }]}
        >
          <Picker.Item
            label="Select type of visit"
            value=""
            color={placeholderColor}
          />
          <Picker.Item label="Frequent visit" value="Frequent visit" />
          <Picker.Item label="Occasional visit" value="Occasional visit" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, { color: textColor, borderBottomColor: textColor }]}
        placeholder="Note"
        placeholderTextColor={placeholderColor}
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
        <Text style={[styles.buttonText]}>Generate QR</Text>
      </TouchableOpacity>

      {/* QR Code Modal */}
      <Modal visible={qrVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.qrBox}>
            <Text style={[styles.qrTitle, { color: textColor }]}>Your QR Code</Text>
            <QRCode value={JSON.stringify(qrData)} size={200} />
            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={() => setQrVisible(false)}
            >
              <Text style={[styles.buttonText]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Menu */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("QRVisit")}>
          <Icon name="qr-code-outline" size={40} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Maintenance")}>
          <Icon name="cash-outline" size={40} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Reserve")}>
          <Icon name="calendar-outline" size={40} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Emergence")}>
          <Icon name="alert-circle-outline" size={40} color={textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    marginBottom: 30,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    height: 50,
  },
  dateField: {
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  pickerContainer: {
    height: 50,
    borderBottomWidth: 1,
    marginBottom: 30,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  qrBox: {
    width: 300,
    height: 400,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default QRVisitScreen;
