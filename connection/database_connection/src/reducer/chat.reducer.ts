import { createReducer, createAction, current, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { Chat } from "../class/Chat";

interface ChatState {
    chatList: Chat[];
}

const initialChatState: ChatState = {
    chatList: []
}

export const addChat = createAction<any>('chat/addChat')
export const clearChat = createAction<any>('chat/clearChat')

const chatReducer = createReducer(initialChatState, builder => {
    builder.addCase(addChat, (state, action) => {
        const chat = action.payload;
        state.chatList.push(chat)
    })
    .addCase(clearChat, (state) => {
        state.chatList = []
    })
})

export default chatReducer