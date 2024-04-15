import phoneCall from "../assets/phone-call.png";
import videoCall from "../assets/video-camera.png";
import menuBurger from "../assets/menu-burger.png";
import picture from "../assets/picture.png";
import paperPlane from "../assets/paper-plane-top.png";
import ChatProps from "../props/ChatProps";
import { useEffect } from "react";
import { useState } from "react";
import { socket } from "./Chat";

function chatWindow(roomID: any) {
  const emitMessage = (chat: any) => {
    console.log("Hi");
    socket.emit("send_message", { chat, roomID });
  };

  useEffect(() => {
    socket.on("receive", (data: any) => {
      console.log("Hi");
      setChats([...chats, data]);
    });
  }, [socket]);

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    // Initialize chats state with initial data
    { sender: "JohnDoe", content: "Hello!" },
    { sender: "MMD", content: "Hey there!" },
    { sender: "JaneDoe", content: "How are you?" },
    { sender: "MMD", content: "Doing great!" },
    { sender: "JohnDoe", content: "Nice to chat!" },
  ]);

  const sendMessage: any = () => {
    const chat = {
      sender: "MMD",
      content: message,
    };
    setChats([...chats, chat]);
    emitMessage(chat);
  };
  return (
    <>
      <div className="chat_window">
        <div className="chat_header">
          <div className="room_bar">
            <img src="../assets/sandworm.jpg" alt="" />
            <div className="user_name">Sandworm</div>
            <div className="status">Online</div>
          </div>
          <div className="icon_bar">
            <img src={phoneCall} />
            <img src={videoCall} />
          </div>
        </div>
        <div className="chat_body">
          <ChatProps chats={chats} />
        </div>
        <div className="chat_bar">
          <div className="button_bar">
            <img src={menuBurger} alt="" />
            <img src={picture} alt="" />
          </div>
          <input
            type="text"
            placeholder="Aa"
            onChange={(e: any) => {
              setMessage(e.target.value);
            }}
          />
          <img
            src={paperPlane}
            alt=""
            onClick={(e: any) => {
              sendMessage();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default chatWindow;
function al(content: any) {
  throw new Error("Function not implemented.");
}

function log(content: any) {
  throw new Error("Function not implemented.");
}
