import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";
import { format } from "timeago.js";
import {toast} from "react-toastify";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
      useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), async (res) => {
      const newChat = res.data();
      if (chat && newChat.messages.length > chat.messages.length) {
        const newMessage = newChat.messages[newChat.messages.length - 1];
        if (newMessage.senderId !== currentUser.id) {
          const senderSnapshot = await getDoc(doc(db, "users", newMessage.senderId));
          const senderData = senderSnapshot.data();
          toast.warn(`${senderData.username}: ${newMessage.text}`);
        }
      }
      setChat(newChat);
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
              (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
              id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally{
      setImg({
        file: null,
        url: "",
      });

      setText("");
    }
  };

  return (
      <div className="chat">
        <ChatHeader user ={user} />
        <ChatMessages
            messages={chat?.messages}
            currentUser={currentUser}
            endRef={endRef}
            img={img}
        />

        <div className="bottom">
          <div className="icons">
            <label htmlFor="file">
              <img src="./img.png" alt=""/>
            </label>
            <input
                type="file"
                id="file"
                style={{display: "none"}}
                onChange={handleImg}
            />
            <img src="./camera.png" alt=""/>
            <img src="./mic.png" alt=""/>
          </div>
          <input
              type="text"
              placeholder={
                isCurrentUserBlocked || isReceiverBlocked
                    ? "You cannot send a message"
                    : "Type a message..."
              }
              value={text}
              onChange={(e) => setText(e.target.value)}


              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}

              disabled={isCurrentUserBlocked || isReceiverBlocked}
          />
          <div className="emoji">
            <img
                src="./emoji.png"
                alt=""
                onClick={() => setOpen((prev) => !prev)}
            />
            <div className="picker">
              <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
            </div>
          </div>
          <img
              src="./send.png"
              alt="Send"
              className="sendButton"
              onClick={handleSend}
              disabled={isCurrentUserBlocked || isReceiverBlocked}
          />
        </div>
      </div>
  );
};

export default Chat;