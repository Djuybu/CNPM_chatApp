import "./chat.css"
import EmojiPicker from "emoji-picker-react";
import {useEffect, useRef, useState} from "react";
const Chat=()=>{
    const[open,setOpen] = useState(false);
    const[text,setText] = useState("");

    const endRef=useRef(null);
    useEffect(()=>{
        endRef.current?.scrollIntoView({behavior:"smooth"});
    },[])
    const handleEmoji = e =>
    {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    }
    return(
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="public/avatar.png" alt=""/>
                    <div className="texts">
                        <span> ng 1</span>
                        <p> xin chao</p>
                    </div>
                </div>

                <div className="icons">
                    <img src="public/phone.png" alt=""/>
                    <img src="public/video.png" alt=""/>
                    <img src="public/info.png" alt=""/>

                </div>

            </div>
            <div className="center">
                <div className="message own">
                    <div className="texts">
                        <p>xin chao</p>
                        <span>time ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="public/avatar.png" alt=""/>
                    <div className="texts">
                        <p>xin chao Đoạn mã này đặt chiều rộng và chiều cao của tất cả các hình ảnh trong class .icons
                            của class .bottom thành 20px, và đặt con trỏ chuột thành kiểu pointer khi di chuyển qua hình
                            ảnh</p>
                        <span>time ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="public/avatar.png" alt=""/>
                    <div className="texts">
                        <img src="https://ishadeed.com/assets/scrollbars/use-case-2.jpg" alt=""/>
                        <p>xin chao</p>
                        <span>time ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="public/avatar.png" alt=""/>
                    <div className="texts">
                        <p>xin chao Đoạn mã này đặt chiều rộng và chiều cao của tất cả các hình ảnh trong class .icons
                            của class .bottom thành 20px, và đặt con trỏ chuột thành kiểu pointer khi di chuyển qua hình
                            ảnh</p>
                        <span>time ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="public/img.png" alt=""/>
                    <img src="public/camera.png" alt=""/>
                    <img src="public/mic.png" alt=""/>
                </div>
                <input type="text"
                       placeholder="Enter message.."
                       value={text}
                       onChange={e => setText(e.target.value)}/>
                <div className="emoji">
                    <img src="public/emoji.png" alt="" onClick={()=>setOpen(prev =>!prev)}/>
                    <div className="picket">
                    <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                 </div>
                <button className="sendButton"> Gửi</button>
            </div>
        </div>
    )
}
export default Chat;