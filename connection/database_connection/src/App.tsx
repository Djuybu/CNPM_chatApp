import { configureStore } from "@reduxjs/toolkit";

import { Routes, Route } from "react-router-dom";
import "./styles.css";
import * as io from "socket.io-client";
import image from "../assets/images.png";
import { User } from "./class/User.ts";
import { getUser } from "./database.ts";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import AccountSettings from "./pages/AccountSettings.tsx";
import Chat from "./pages/ChatPage.tsx";
import { Provider } from "react-redux";
import { store } from "./state.ts";

interface Counter {
  value: number;
}

interface UserState {
  isSignedIn: boolean;
}

//Actions
const increaseByAmount = { type: "Increment", payload: 10 };
const user = new User();
export { user };

function App() {
  return (
    // <>{<AccountSettings />}</>
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/AccountSettings" element={<AccountSettings />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
