// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg2GGDHCBVPS_jqJmjHiNe-tVdhhzxojE",
  authDomain: "todo-react-6fc72.firebaseapp.com",
  projectId: "todo-react-6fc72",
  storageBucket: "todo-react-6fc72.appspot.com",
  messagingSenderId: "952138058086",
  appId: "1:952138058086:web:95c5086e6ccc53fd2520a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginPopup = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
};


//const querySnapshot = getDocs(collection(db, "todos")).then((items) => {
//  items.forEach((doc) => {
//  console.log(doc.id, " => ", doc.data());
//  });
//});



//export default () => getDocs(collection(db,"todos"));
