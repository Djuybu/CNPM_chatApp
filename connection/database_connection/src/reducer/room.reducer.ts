import { createReducer, createAction, current, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { Room } from "../class/Room";

interface RoomState {
    roomList: Room[];
}

const initialRoomState: RoomState = {
    roomList: [
    ]
}

export const addRoom = createAction<any>('room/addRoom')
const roomReducer = createReducer(initialRoomState, builder => {
    builder.addCase(addRoom, (state, action) => {
        const room = action.payload;
        state.roomList.push(room)
    })
})


export default roomReducer;

