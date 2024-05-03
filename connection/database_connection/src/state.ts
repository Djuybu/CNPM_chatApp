import { configureStore } from '@reduxjs/toolkit'
import  roomReducer  from "./reducer/room.reducer";
import activeRoomReducer from './reducer/activeRoom.reducer';
import chatReducer from './reducer/chat.reducer'

export const store = configureStore({
  reducer: { room: roomReducer, activeRoom: activeRoomReducer, chat: chatReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['activeRoom/changeActiveRoom', 'chat/addChat'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['activeRoom.activeRoom', 'chat.addChat', 'payload.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['activeRoom', 'chat'],
    },  
  })
})

// Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch