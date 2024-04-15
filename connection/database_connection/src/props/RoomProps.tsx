import { socket } from "../pages/Chat";

interface RoomProps {
  room: any[]; // Assuming `rooms` is an array of objects
  onRoomIDChange: (roomId: string) => void; // Function to handle room selection
}

const RoomProps: React.FC<RoomProps> = (props: any) => {
  const rooms = props.room;

  const handleRoomSelection = (roomId: string) => {
    props.onRoomIDChange(roomId); // Call the function passed from parent
  };

  return (
    <>
      {rooms.map((room: any) => {
        return (
          <div
            className="room_bar"
            onClick={() => {
              socket.emit("join", room.id);
              handleRoomSelection(room.id);
            }}
          >
            <img src={room.avatar} alt="" />
            <div className="user_name">{room.name}</div>
            <div className="status">Online</div>
          </div>
        );
      })}
    </>
  );
};

export default RoomProps;
