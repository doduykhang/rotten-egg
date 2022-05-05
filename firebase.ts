// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC28s-tV6Vot5UntnUlU53QUH_TDcr4CFk',
  authDomain: 'rotten-egg-ae412.firebaseapp.com',
  projectId: 'rotten-egg-ae412',
  storageBucket: 'rotten-egg-ae412.appspot.com',
  messagingSenderId: '624092115584',
  appId: '1:624092115584:web:c42706c6e4c53305a16c65',
  measurementId: 'G-2ZFRFRKLXB',
}

// Initialize Firebase

const firebase = initializeApp(firebaseConfig)

export default firebase
