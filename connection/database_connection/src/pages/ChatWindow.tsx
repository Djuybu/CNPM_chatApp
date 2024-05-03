import phoneCall from "../assets/phone-call.png";
import videoCall from "../assets/video-camera.png";
import menuBurger from "../assets/menu-burger.png";
import picture from "../assets/picture.png";
import paperPlane from "../assets/paper-plane-top.png";
import ChatProps from "../props/ChatProps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state";
import { Room } from "../class/Room";
import { Chat } from "../class/Chat";
import { addChatToRoomDatabase, db, loadChatFromDatabase } from "../database";
import { addChat, clearChat } from "../reducer/chat.reducer";
import { socket } from "./ChatPage";
import { user } from "../App";
import { collection, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatWindow() {
  const dispatch = useDispatch();
  const activeRoom: Room = useSelector(
    (state: RootState) => state.activeRoom.activeRoom
  );
  const chats = useSelector((state: RootState) => state.chat.chatList);
  const [message, setMessage] = useState("");
  const query = collection(db, `rooms/${activeRoom.getRoomId()}/Chats`);
  const [docs, loading, error] = useCollectionData(query);

  // Handles sending a new chat message
  const handleSendMessage = () => {
    if (!message) return; // Prevent sending empty messages

    const newChat = new Chat(user.getId(), message, { type: "none", link: "" });

    dispatch(addChat(newChat)); // Add chat to local state
    socket.emit("send_message", { roomId: activeRoom.getId(), newChat });
    addChatToRoomDatabase(newChat, activeRoom.getId()); // Add chat to database

    setMessage(""); // Clear message input after sending
  };

  useEffect(() => {
    dispatch(clearChat());

    docs?.map((doc: any) => {
      dispatch(addChat(doc));
    });
  }, [activeRoom]);

  // Listens for incoming chat messages
  useEffect(() => {
    const handleReceiveMessage = (data: any) => {
      dispatch(addChat(data.newChat));
    };

    socket.on("receive", handleReceiveMessage);

    return () => socket.off("receive", handleReceiveMessage); // Cleanup
  }, []);

  return (
    <>
      <div className="chat_window">
        <div className="chat_header">
          <div className="room_bar">
            <img src={`${activeRoom.getAvatar()}`} alt="" />
            <div className="user_name">{activeRoom.getRoomName()}</div>
            <div className="status">Online</div>
          </div>
          <div className="icon_bar">
            <img src={phoneCall} alt="" />
            <img src={videoCall} alt="" />
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <img src={paperPlane} alt="" onClick={handleSendMessage} />
        </div>
      </div>
    </>
  );
}

export default ChatWindow;
