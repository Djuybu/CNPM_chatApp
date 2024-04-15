import { Routes, Route } from "react-router-dom";
import "./styles.css";
import * as io from "socket.io-client";
import image from "../assets/images.png";
import { User } from "./User.tsx";
import { getUser } from "./database";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AccountSettings from "./pages/AccountSettings";
import Chat from "./pages/Chat.tsx";

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
//Reducer

function App() {
  return (
    // <>{<AccountSettings />}</>
    <>
      <Routes>
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/" element={<Signin />} />
        <Route path="/AccountSettings" element={<AccountSettings />} />
      </Routes>
    </>
  );
}

export default App;
