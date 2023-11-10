const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, collection, getDocs } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDwmgfA_Ys71oHlk0jmCqIC7aPQD8xwZIQ",
  authDomain: "intrepid-honor-321018.firebaseapp.com",
  projectId: "intrepid-honor-321018",
  storageBucket: "intrepid-honor-321018.appspot.com",
  messagingSenderId: "189103273753",
  appId: "1:189103273753:web:cc2d7a635479ed2884b788",
  measurementId: "G-XMB16WK2C2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

module.exports={db}