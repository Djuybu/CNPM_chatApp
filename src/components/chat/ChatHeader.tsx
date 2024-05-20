// File: ChatHeader.jsx

import React from "react";

class ChatHeader extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <div className="top">
                <div className="user">
                    <img src={user?.avatar || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{user?.username}</span>
                        <p></p>
                    </div>
                </div>
                <div className="icons">
                    <a href="https://linen-spiritual-frost.glitch.me/?room=room-vn-1-1EUIHDWVF3-1715704252781" target="_blank" rel="noopener noreferrer">
                        <img src="./phone.png" alt="" /> {/* điều hướng khi ấn vào ảnh */}
                    </a>
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
        );
    }
}

export default ChatHeader;