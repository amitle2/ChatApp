import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDdMW3-laukheLTwLBJBwkHx9p5zNsx4I0",
  authDomain: "chatapp-1352d.firebaseapp.com",
  databaseURL: "https://chatapp-1352d-default-rtdb.firebaseio.com",
  projectId: "chatapp-1352d",
  storageBucket: "chatapp-1352d.appspot.com",
  messagingSenderId: "659356901564",
  appId: "1:659356901564:web:3f88af7014eb3cb01eb0b9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;