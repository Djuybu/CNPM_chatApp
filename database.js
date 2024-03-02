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

export const getUser = async (username, password) => {
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

export const addValue = (value) => {
  addDoc(userRef, value);
};

class user {
  constructor(
    username,
    password,
    address,
    birthday,
    id,
    email,
    gender,
    phoneNumber
  ) {
    this.username = username;
    this.password = password;
    this.address = address;
    this.birthday = birthday;
    this.id = id;
    this.email = email;
    this.gender = gender;
    this.phoneNumber = phoneNumber;
  }
  toObject = () => {
    return {
      Name: this.username,
      Password: this.password,
      Address: this.address,
      Birthday: this.birthday,
      Id: this.id,
      Email: this.email,
      Phone_number: this.phoneNumber,
    };
  };
}

const username = document.getElementById("name");
const password = document.getElementById("password");
const address = document.getElementById("address");
const birthday = document.getElementById("birthday");
const id = document.getElementById("id");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const phoneNumber = document.getElementById("phone_number");

const button = document.getElementById("signup");

if (button) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const newUser = new user(
      username.value,
      password.value,
      address.value,
      birthday.value,
      id.value,
      email.value,
      gender.value,
      phoneNumber.value
    );
    addValue(newUser.toObject());
  });
}

const signinButton = document.getElementById("signin");
const SignInUsername = document.getElementById("signin_username");
const SigninPassword = document.getElementById("signin_password");

console.log("Hi");
if (signinButton) {
  signinButton.addEventListener("click", (event) => {
    console.log("Hi");
    event.preventDefault();
    getUser(SignInUsername.value, SigninPassword.value);
  });
}
