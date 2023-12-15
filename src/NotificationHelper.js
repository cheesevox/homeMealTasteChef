// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';

// Request permission for notification message
export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await getFcmToken(); // Make sure to use 'await' here to wait for the promise to resolve
    }
  } catch (error) {
    console.error(`Error requesting permission: ${error}`);
  }
};

// Get FCM token to send notification
export const getFcmToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      const token = await messaging().getToken();

      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
      }
    }
  } catch (error) {
    console.error(`Error getting FCM token: ${error}`);
  }
};