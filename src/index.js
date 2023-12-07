import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import { initializeApp } from 'firebase/app';
// Initialize Firebase
if (__DEV__) {
  import('./config/firebaseConfig').then(() => console.log('Firebase Initialized'));
}
// initializeApp(firebaseConfig);
AppRegistry.registerComponent(appName, () => App);
