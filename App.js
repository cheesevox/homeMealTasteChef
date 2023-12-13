import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import {store} from './store'
import Toast from 'react-native-toast-message';
import { AppRegistry } from 'react-native';
import { useEffect, useState } from "react";
import messaging from '@react-native-firebase/messaging';
import { getFcmToken, requestUserPermission } from "./src/NotificationHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await requestUserPermission();
      await getToken();
    };

    fetchData();
  }, []);

  const getToken = async () => {
    try {
      const fcmToken = await getFcmToken();
      console.log('FCM Token:', fcmToken);
      setToken(fcmToken); // Optionally, you can update your state with the FCM token
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };
  return (
  <Provider store={store}>
    <AppNavigator />
    <Toast/>
  </Provider>
  )
}
