import { user } from "../App";

const ChatProps = (props: any) => {
  const chats = props.chats;
  //   console.log(chats);

  return (
    <>
      {chats.map((chat: any) => {
        if (chat.sender !== user.getUsername()) {
          return (
            <div className="chat_received">
              <div className="data">{chat.content}</div>
            </div>
          );
        } else {
          return (
            <div className="chat_sent">
              <div className="data">{chat.content}</div>
            </div>
          );
        }
      })}
    </>
  );
};

export default ChatProps;
