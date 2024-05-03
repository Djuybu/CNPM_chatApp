import { createReducer, createAction, current, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { Room } from "../class/Room";

interface ActiveRoomState {
    activeRoom: Room;
}

const initialRoomState: ActiveRoomState = {
    activeRoom: new Room(["123"], "abc", "def","ghik", "huhu", [])
}

export const changeActiveRoom = createAction<Room>('activeRoom/changeActiveRoom')
const activeRoomReducer = createReducer(initialRoomState, builder => {
    builder.addCase(changeActiveRoom, (state, action) => {
        const newRoom =action.payload;
        state.activeRoom = newRoom;
    })
})

export default activeRoomReducer