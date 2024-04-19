/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { createApp } from 'vue';
import { getFirestore } from 'firebase/firestore';
import App from './App.vue';
import router from './router';
import store from './store';

// import "bootstrap";
import './assets/styles.scss';

// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/order
import { initializeApp } from 'firebase/app';

import './registerServiceWorker';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.VUE_APP_APIKEY}`,
  authDomain: `${process.env.VUE_APP_AUTHDOMAIN}`,
  projectId: `${process.env.VUE_APP_PROJECTID}`,
  storageBucket: `${process.env.VUE_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.VUE_APP_MESSAGINSENDERID}`,
  appId: `${process.env.VUE_APP_APPID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// getAnalytics(app);
export const db = getFirestore(app);

createApp(App).use(router).use(store).mount('#app');
