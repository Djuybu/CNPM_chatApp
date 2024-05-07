import userImage from "../assets/bc3164193f40e047fc9ba13860c74b5a.webp";
import Group from "../assets/group.png";
import RoomProps from "../props/RoomProps";
import ContactProps from "../props/ContactProps";
import { user } from "../App";
import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "./ChatPage";
import {
  listUserWithName,
  addContactToDatabase,
  checkContact,
  loadChatFromDatabase,
} from "../database";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useSelector, useDispatch } from "react-redux";
import { addRoom } from "../reducer/room.reducer";
import { RootState, store } from "../state";
import { Room } from "../class/Room";
import { any } from "prop-types";
import { changeActiveRoom } from "../reducer/activeRoom.reducer";
interface UserListProps {
  roomID: string;
  onRoomIDChange: (newRoomID: string) => void;
}

function UserList() {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isContactWindow, setIsContactWindow] = useState(true);
  const activeRoom = useSelector(
    (state: RootState) => state.activeRoom.activeRoom
  );

  const rooms = useSelector((state: RootState) => state.room.roomList);
  const setWindow = () => {};

  const checkUser = (username: string) => {
    if (!username) return false;
    return true;
  };

  const loadContacts = async (data: string) => {
    const list: any = await checkContact(data);
    setContacts(list);
  };

  const handleContact: any = async (contact: any) => {
    socket.emit("join", contact.roomId);
    dispatch(changeActiveRoom(contact));
  };

  useEffect(() => {}, [contacts]);

  const handleChangeRoom = (newRoomID: string) => {
    console.log(newRoomID);

    socket.emit("join", newRoomID);
  };

  return (
    <>
      <div className="user_list">
        <Link to={"/AccountSettings"} className="user_bar">
          <img src={userImage} alt="" />
          <div className="user_name">{user.getUsername()}</div>
        </Link>
        <div className="search_bar">
          <img src="../assets/search.png" alt="" />
          <form
            action=""
            onSubmit={(e: any) => {
              e.preventDefault();
              setIsContactWindow(false);
              loadContacts(newUser);
            }}
          >
            <input
              onChange={(e: any) => {
                setNewUser(e.target.value);
              }}
              type="text"
              name=""
              id=""
              placeholder="Search for user"
            />
            <button type="submit">Add</button>
          </form>
        </div>
        {isContactWindow ? (
          <RoomProps room={rooms} onRoomIDChange={handleChangeRoom} />
        ) : (
          <ContactProps onPropClick={handleContact} contacts={contacts} />
        )}
      </div>
    </>
  );
}

export default UserList;
