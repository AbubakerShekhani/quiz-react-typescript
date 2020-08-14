importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCCB6JnOSyc52tx2k2MrD2Sxb_EN83wxxI",
  authDomain: "quiz-app-7f1e9.firebaseapp.com",
  databaseURL: "https://quiz-app-7f1e9.firebaseio.com",
  projectId: "quiz-app-7f1e9",
  storageBucket: "quiz-app-7f1e9.appspot.com",
  messagingSenderId: "237023696956",
  appId: "1:237023696956:web:fad743a3e8bdd0ce448b39"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});

const dynamicContentCache = 'QuizApp-Dynamic-Content';
const cacheAssets = [
    'https://opentdb.com/api.php?amount=10&category=18&type=multiple&difficulty=easy',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(dynamicContentCache).then((cache)=>{
          console.log("cache");
          cache.addAll(cacheAssets);

        })
    )
})

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache

    }).catch(error => {

      // TODO 6 - Respond with custom offline page

    })
  );
});