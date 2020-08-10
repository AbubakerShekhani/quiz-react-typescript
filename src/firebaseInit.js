import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCCB6JnOSyc52tx2k2MrD2Sxb_EN83wxxI",
  authDomain: "quiz-app-7f1e9.firebaseapp.com",
  databaseURL: "https://quiz-app-7f1e9.firebaseio.com",
  projectId: "quiz-app-7f1e9",
  storageBucket: "quiz-app-7f1e9.appspot.com",
  messagingSenderId: "237023696956",
  appId: "1:237023696956:web:fad743a3e8bdd0ce448b39"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
