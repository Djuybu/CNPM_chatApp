import { initializeApp } from "firebase/app";
import {addRoom} from "./reducer/room.reducer";
import { user } from "./App";
import { Room } from "./class/Room";
import { Chat } from "./class/Chat";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  query,
  where,
  or,
  onSnapshot,
  updateDoc,
  Query,
  and,
} from "firebase/firestore";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { any } from "prop-types";
import { async } from "q";

const firebaseConfig = {
  apiKey: "AIzaSyDlie01nOT1BUl7LKZKbHnhWXkCAftY_CA",
  authDomain: "chat-app-cnpm.firebaseapp.com",
  projectId: "chat-app-cnpm",
  storageBucket: "chat-app-cnpm.appspot.com",
  messagingSenderId: "1011879256795",
  appId: "1:1011879256795:web:8e5b78a25b1be23a93e2fe",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const userRef = collection(db, "users");
const roomRef = collection(db, "rooms");

getDocs(userRef)
  .then((snapshot) => {
    let userList = [];
    snapshot.docs.forEach((doc) => {
      userList.push({ ...doc.data(), id: doc.id });
    });
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
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const user = snapshot.docs[0].data();
    return { ...user, id: snapshot.docs[0].id }; 
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
export const addUser = (value: object) => {  
  console.log(value);
  addDoc(userRef, value)
};

export const changeUserInfo = async (user: object, id: string) => {
  try {
    const docRef = doc(userRef, id); // Use document ID directly

    await updateDoc(docRef, user);
    console.log("Thông tin người dùng đã được cập nhật thành công!");
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng:", error);
  }
};

export const changePassword = async(password: string, id: string) => {
  console.log("ID: ", id);
  try {
    const docRef = doc(userRef, id);

    await updateDoc(docRef, {password: password});
  } catch (error) {
    console.log(error);
  }
}

export const listUserWithName = async (username: string) => {
  console.log(username);

  try {
    const list: any = []
    const q = query(userRef, where("username", "==", username));
    const snapshot = await getDocs(q);

    snapshot.docs.map((doc) => {
      // Combine data and id
      list.push(doc.id)
    });

    return list;
  } catch (error) {
    console.log(error);
  }
};



export const checkContact = async (name: any) => {
  const ids = await listUserWithName(name);
  const list: { id: string; roomName: string; isExisting: boolean }[] = [];

  for (const id of ids) {
    // Construct a query to check for ownership or partnership
    const q = query(roomRef, 
      or(
        and(where("ownerId", "==", id),
            where("partnersId", "array-contains", user.getId()) // Use array-contains for partnersId
        ),
        and(
          and(where("partnersId", "array-contains", id),
           where("ownerId", "==", user.getId()))
        )
      )
    );

    // Fetch existing rooms using await
    const snapshot = await getDocs(q);
    

    const existingRooms = snapshot.docs.map((doc) => {
      const data = doc.data();
      let roomName: string = "";
      if (data.isGroup) {
        roomName = data.name;
      } else {
        roomName = name;
      }
      return { ...data, roomId: doc.id, id: data.id, roomName: roomName, isExisting: true };
    });

    // Check if any existing rooms were found
    const hasExistingRooms = existingRooms.length > 0;

    // If no existing rooms, create an object for the non-existing room
    const nonExistingRoom = hasExistingRooms
      ? [] // Empty array if existing rooms found
      : [{ id, roomName: name, isExisting: false }]; // Object for non-existing room

    // Combine existing and non-existing rooms
    list.push(...existingRooms);
    list.push(...nonExistingRoom);
  }
  console.log("List: ", list);
  
  return list;
};


export const addContactToDatabase = async(room: Room) => {
  console.log("Before converting: ", room);
  console.log("After: ", room.toObject());
  
  addDoc(roomRef, room.toObject());
}

export const getNameFromPartnerId: any = async(id: string) => {
  const docRef = doc(userRef, id);
  const snapshot = await getDoc(docRef);
  const data: any = snapshot.data();
  console.log(data.username);
  
  return data.username;
}

export const addChatToRoomDatabase = async (chat: any, roomId: string) => {
  // 1. Get a reference to the specific room document
  const roomRef = doc(db, "rooms", roomId);

  // 2. Get the room document
  const roomSnapshot = await getDoc(roomRef);

  // 3. Check if the room exists
  if (!roomSnapshot.exists()) {
    console.error(`Room not found with ID: ${roomId}`);
    return;
  }

  // 4. Create a reference to the Chats collection within the room document
  const chatsRef = collection(roomSnapshot.ref, "Chats"); // Correction: 'roomDoc' should be 'roomSnapshot.ref'

  // 5. Add the chat to the Chats collection
  await addDoc(chatsRef, chat.toObject());

  console.log(`Chat added to room: ${roomId}`);
};

export const loadChatFromDatabase = async(id: string) => {
  console.log("id: ", id);
  const query = collection(db, `rooms/${id}/Chats`)
  const [docs, loading, error] = useCollectionData(query)
  console.log("docs:", docs);
}