import { Routes, Route } from "react-router-dom";
import "./styles.css";
import image from "../assets/images.png";
import { getUser } from "./database";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AccountSettings from "./pages/AccountSettings";
interface User {
    name: string,
    password: string,
    email: string
}

interface Counter {
    value: number,
}

interface UserState {
    isSignedIn: boolean
}

//Actions
const increaseByAmount = {type: "Increment", payload: 10}

//Reducer


function App () {
    return(
        <>
            <AccountSettings></AccountSettings>
        </>
        // <>
        //     <Routes>
        //         <Route path="/Signup" element={<Signup/>}/>
        //         <Route path="/Signin" element={<Signin/>}/>
        //         <Route path="/" element={<Signin/>}/>
        //     </Routes>
        // </>
    )
}

export default App
