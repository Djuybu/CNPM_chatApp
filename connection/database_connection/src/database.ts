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
  updateDoc,
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

export const getUser: any = async (data: any) => {
  try {
    const q = query(
      userRef,
      where("email", "==", data.email),
      where("password", "==", data.password)
    );

    const snapshot = await getDocs(q); // Use getDocs for single retrieval

    if (snapshot.empty) {
      // Handle no matching documents (user not found)
      return null;
    }

    const user = snapshot.docs[0].data(); // Assuming single document
    return { ...user, id: snapshot.docs[0].id }; // Return object with id
  } catch (error) {
    console.error("Error fetching user:", error);
    // Handle other potential errors
    return null; // Or throw an error for handling at a higher level
  }
}
export const addUser = (value: object) => {  
  console.log(value);
  addDoc(userRef, value)
};

export const changeUserInfo = async (user: object, username: string) => {
  try {
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach(async (doc) => {
          // Cập nhật thông tin người dùng nếu tìm thấy username là "MMD"
          await updateDoc(doc.ref, user);
          console.log("Thông tin người dùng đã được cập nhật thành công!");
      });

      if (querySnapshot.empty) {
          console.log("Không tìm thấy người dùng có username là 'MMD'");
      }
  } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
  }
};