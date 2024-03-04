import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../styles.css";
import image from "../assets/images.png";
import { getUser } from "../database";
import Signup from "./Signup";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: any = () => {
    getUser(username, password);
  };

  return (
    <>
      <div className="wrapper">
        <div className="header">
          <div className="top">
            <div className="FlexiChat">
              <img src={image} id="logo" alt="FlexiChat" />
            </div>
            <div className="form">
              <form onSubmit={handleSubmit}>
                {" "}
                <div className="input_field">
                  <input  
                    type="text"
                    id="username"
                    placeholder="Phone number, username, or email"
                    className="input"
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                </div>
                <div className="input_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
                <button type="submit" className="btn">
                  <a>Login</a>
                </button>
              </form>
            </div>
            <div className="or">
              <div className="line"></div>
              <p>OR</p>
              <div className="line"></div>
            </div>
            <div className="dif">
              <div className="forgot">
                <a href="#">Forgot password?</a>
              </div>
            </div>
          </div>
          <div className="signup">
            <p>
              Don't have an account?
              <Link to="/Signup"> Sign up</Link>
            </p>
          </div>
        </div>
      </div>
      <Routes >
        <Route path="/Signup" element={<Signup/>}/>
        {/* <Route path="/" element={<Signin />} /> */}
      </Routes>
    </>
  );
}

export default Signin;
