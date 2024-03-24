import react from "react"

function chatWindow() {
    return (
        <>
          <div className="chat_window">
                <div className="chat_header">
                    <div className="room_bar">
                        <img src="../assets/sandworm.jpg" alt="">
                        <div className="user_name">Sandworm</div>
                        <div className="status">Online</div>
                    </div>
                    <div className="icon_bar">
                        <img src="../assets/phone-call.png"></img>
                        <img src="../assets/video-camera.png"></img>
                    </div>
                </div>
                <div className="chat_body">
                    <div className="chat_sent">
                        <div className="data">I am not your Messiah!</div>
                    </div>
                    <div className="chat_received">
                        <img src="../assets/stilgar-dune.jpg" alt=""/>
                        <div className="data">The Madhi is too humble to call him Madhi</div>
                    </div>
                </div>
                <div className="chat_bar">
                    <div className="button_bar">
                        <img src="../assets/menu-burger.png" alt="">
                        <img src="../assets/picture.png" alt="">
                    </div>
                    <input type="text" placeholder="Aa"/>
                    <img src="../assets/paper-plane-top.png" alt=""/>
                </div>
            </div>  
        </>
    )
}

export default chatWindow