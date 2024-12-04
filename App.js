import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screen/LoginScreen'; 
import WelcomeScreen from './src/screen/WelcomeScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import ReadqrScreen from './src/screen/ReadqrScreen';
import MaintenanceScreen from './src/screen/MaintenanceScreen';
import PayScreen from './src/screen/PayScreen';
import QRVisitScreen from './src/screen/QRVisitScreen';
import ReserveScreen from './src/screen/ReserveScreen';
import EmergenceScreen from './src/screen/EmergenceScreen';
import PaymentScreen from "./src/screen/PaymentScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Readqr" component={ReadqrScreen} />
        <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
        <Stack.Screen name="Pay" component={PayScreen} />
        <Stack.Screen name="QRVisit" component={QRVisitScreen} />
        <Stack.Screen name="Reserve" component={ReserveScreen} />
        <Stack.Screen name="Emergence" component={EmergenceScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}








