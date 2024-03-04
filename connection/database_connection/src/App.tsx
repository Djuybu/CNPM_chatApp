import { Routes, Route } from "react-router-dom";
import "./styles.css";
import image from "../assets/images.png";
import { getUser } from "./database";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App () {
    return(
        <>
            <Routes>
                <Route path="/Signup" element={<Signup/>}/>
                <Route path="/Signin" element={<Signin/>}/>
                <Route path="/" element={<Signin/>}/>
            </Routes>
        </>
    )
}

export default App
