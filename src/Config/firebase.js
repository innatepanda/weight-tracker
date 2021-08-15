import  firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyBhDLKsqXbcFELj-rVTChzD-eF4j0Ycktg",
    authDomain: "weight-tracker-42745.firebaseapp.com",
    databaseURL: "https://weight-tracker-42745-default-rtdb.firebaseio.com",
    projectId: "weight-tracker-42745",
    storageBucket: "weight-tracker-42745.appspot.com",
    messagingSenderId: "334750841539",
    appId: "1:334750841539:web:2ac91897b9908db8558076",
    measurementId: "G-P5X3J9LX46"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default firebase;