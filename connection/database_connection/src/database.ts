// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlie01nOT1BUl7LKZKbHnhWXkCAftY_CA",
  authDomain: "chat-app-cnpm.firebaseapp.com",
  projectId: "chat-app-cnpm",
  storageBucket: "chat-app-cnpm.appspot.com",
  messagingSenderId: "1011879256795",
  appId: "1:1011879256795:web:8e5b78a25b1be23a93e2fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userRef = collection(db, "users");

getDocs(userRef)
  .then((snapshot) => {
    let userList = [];
    snapshot.docs.forEach((doc) => {
      userList.push({ ...doc.data(), id: doc.id });
    });
    // console.log(userList[0]);
  })
  .catch((error) => {
    console.log(error);
  });

export const getUser = async (username: string, password: string) => {
  console.log("queriing");
  const q = await query(
    userRef,
    where("Name", "==", username),
    where("Password", "==", password)
  );

  onSnapshot(q, (snapshot) => {
    console.log(snapshot.docs);
    // let user = snapshot.docs[0];
    // console.log(user);
  });
};

export const addUser = (value: object) => {  
  console.log(value);
  addDoc(userRef, value)
  
};
  