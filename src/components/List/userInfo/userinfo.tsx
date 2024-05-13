import "./userinfo.css"
const UserInfo = () => {
    return (
        <div className="userInfo">
            <div className="user">
                <img src="public/avatar.png" alt="" />
                <h2>xin chao</h2>

            </div>
            <div className="icons">
                <img src="public/more.png" alt="" />
                <img src="public/video.png" alt="" />
                <img src="public/edit.png" alt="" />
            </div>
        </div>
    )
}

export default UserInfo;