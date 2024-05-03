import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { user } from "./App";

const firebaseConfig = {
    apiKey: "AIzaSyDlie01nOT1BUl7LKZKbHnhWXkCAftY_CA",
    authDomain: "chat-app-cnpm.firebaseapp.com",
    projectId: "chat-app-cnpm",
    storageBucket: "chat-app-cnpm.appspot.com",
    messagingSenderId: "1011879256795",
    appId: "1:1011879256795:web:8e5b78a25b1be23a93e2fe",
  };

const app = initializeApp(firebaseConfig)
const storage = getStorage()

const storageRef = ref(storage)
const userRef: string = "users/"

export const getAvatarLinkFromUser: any = async (userName: string) => {
    const downloadURL = await getDownloadURL(ref(storage, userRef + user.getUsername()));
    console.log(downloadURL);
    
    return downloadURL;
}



export const getAvatarLink = async(file: any) => {
    const imageRef = ref(storage, userRef + user.getUsername())
    uploadBytesResumable(imageRef, file);
    const link = await getAvatarLinkFromUser(user.getUsername());
    return link
}
