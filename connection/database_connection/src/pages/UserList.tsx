import userImage from "../assets/bc3164193f40e047fc9ba13860c74b5a.webp"
import sandWorm from "../assets/sandworm.jpg"

function UserList () {
    return (
        <>
          <div className="user_list">
            <div className="user_bar">
              <img src={userImage} alt="" />
              <div className="user_name">Mac Minh Duy</div>
            </div>
            <div className="search_bar">
              <img src="../assets/search.png" alt="" />
              <input type="text" name="" id="" placeholder="Search for user" />
            </div>
            <div className="room_bar">
              <img src={sandWorm} alt="" />
              <div className="user_name">Sandworm</div>
              <div className="status">Online</div>
            </div>
          </div>
        </>
    );
}

export default UserList