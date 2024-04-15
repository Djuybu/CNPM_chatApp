import userImage from "../assets/bc3164193f40e047fc9ba13860c74b5a.webp";
import Group from "../assets/group.png";
import RoomProps from "../props/RoomProps";
import { user } from "../App";
import { useState } from "react";
import { socket } from "./Chat";

interface UserListProps {
  roomID: string;
  onRoomIDChange: (newRoomID: string) => void;
}

function UserList({ roomID, onRoomIDChange }: UserListProps) {
  const handleChangeRoom = (newRoomID: string) => {
    onRoomIDChange(newRoomID);
    socket.emit("join", newRoomID);
  };

  const [rooms, setRooms] = useState([
    { name: "Lmao", avatar: Group, id: "177013" },
  ]);
  return (
    <>
      <div className="user_list">
        <div className="user_bar">
          <img src={userImage} alt="" />
          <div className="user_name">{user.getUsername()}</div>
        </div>
        <div className="search_bar">
          <img src="../assets/search.png" alt="" />
          <input type="text" name="" id="" placeholder="Search for user" />
        </div>
        <RoomProps room={rooms} onRoomIDChange={handleChangeRoom} />
      </div>
    </>
  );
}

export default UserList;
