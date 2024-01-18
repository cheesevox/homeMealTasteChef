import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import {store} from './store'
import Toast from 'react-native-toast-message';
import { AppRegistry } from 'react-native';
import { useEffect, useState } from "react";
import { getFcmToken, requestUserPermission } from "./src/NotificationHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [token, setToken] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await requestUserPermission();
  //     await getToken();
  //   };

  //   fetchData();
  // }, []);

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }
  // useEffect(()=>{
  //     if(requestUserPermission()){
  //       messaging().getToken().then(token=>{
  //       console.log("tokennnnnnnnn", token)
  //       })
  //     }else{
  //       console.log("repo request token is falseeeeeeeeeeeeeeeee", authStatus)
  //     }
  //     messaging()
  //     .getInitialNotification()
  //     .then(async (remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });
  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //     });
  //     messaging().setBackgroundMessageHandler(async remoteMessage => {
  //       console.log('Message handled in the background!', remoteMessage);
  //     });
  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //       Alert.alert('HOME MEAL TASTE!', JSON.stringify(remoteMessage));
  //     });
  //     return unsubscribe;
  //   },[])

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
