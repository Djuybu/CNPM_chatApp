import { user } from "../App";

const ChatProps = (props: any) => {
  const chats = props.chats;
  //   console.log(chats);

  return (
    <>
      {chats.map((chat: any) => {
        // console.log(chat);

        if (chat.senderId !== user.getId()) {
          return (
            <div className="chat_received">
              <div className="data">{chat.textContent}</div>
            </div>
          );
        } else {
          return (
            <div className="chat_sent">
              <div className="data">{chat.textContent}</div>
            </div>
          );
        }
      })}
    </>
  );
};

export default ChatProps;
