import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import "../assets/userlist.css";
import "../styles.css";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import RoomInfo from "./RoomInfo";
import * as io from "socket.io-client";

export const socket: any = io.connect("http://localhost:5500");
function Chat() {
  const [roomID, setRoomID] = useState("");

  function handleRoomIDChange(newRoomID: string): void {
    setRoomID(newRoomID);
  }

  return (
    <>
      <div className="screen">
        <UserList
          roomID={roomID}
          onRoomIDChange={handleRoomIDChange}
        ></UserList>
        <ChatWindow
          roomID={roomID}
          onRoomIDChange={handleRoomIDChange}
        ></ChatWindow>
        <RoomInfo></RoomInfo>
      </div>
    </>
  );
}

export default Chat;
