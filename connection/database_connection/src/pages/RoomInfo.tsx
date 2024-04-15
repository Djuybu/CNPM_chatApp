import search from "../assets/search.png";
import bell from "../assets/bell.png";
import officePin from "../assets/office-push-pin.png";
import pallete from "../assets/palette.png";
import group from "../assets/group.png";

function RoomInfo() {
  return (
    <>
      <div className="room_info">
        <img src="../assets/sandworm.jpg" alt="" />
        <div className="room_name">Sandworm</div>
        <div className="active">All members are active</div>
        <div className="button_bar">
          <div className="button_group">
            <img src={search} alt="" />
            <div className="button_description">Search</div>
          </div>
          <div className="button_group">
            <img src={bell} alt="" />
            <div className="button_description">Notification</div>
          </div>
        </div>
        <div className="function_box">
          <div className="function_bar">
            <img src={officePin} alt="" />
            <div className="description">Pinned messages</div>
          </div>
          <div className="function_bar">
            <img src={pallete} alt="" />
            <div className="description">Theme color</div>
          </div>
          <div className="function_bar">
            <img src={group} alt="" />
            <div className="description">Chat members</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomInfo;
