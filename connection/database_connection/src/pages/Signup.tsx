import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import image from "../assets/images.png";
import {addUser } from "../database";
import Signin from "./Signin";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit: any = (event: any) => {
    console.log("Hi");
    event.preventDefault();
    console.log("pass", password)
    addUser({
      username: username,
      email: email,
      password: password,
      address: address,
      birthday: birthday,
      gender: gender 
    })
  };

  return (
    <>
      <div className="wrapper">
        <div className="header">
          <div className="top">
            <div className="FlexiChat">
              <img src={image} id="logo" alt="FlexiChat" />
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div className="input_field">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
              <div className="input_field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="input_field">
                <input
                  type="Address"
                  placeholder="Address"
                  className="input"
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </div>
              <div className="input_field">
                <div className="input_field">
                  Birthday
                </div>
                <div className="input_field">
                  <input
                    type="date"
                    placeholder="Birthday"
                    className="input"
                    onChange={(event) => {
                      setBirthday(event.target.value);
                    }}
                  />
                </div>
                <select id="Gender" name="Gender" className="input" required
                onChange={(event) => setGender(event.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="input_field">
                <input
                  type="Password"
                  placeholder="Password"
                  className="input"
                  onChange={(event) => {setPassword(event.target.value)} }
                />
              </div>
              <div className="input_field">
                <input
                  type="Password"
                  placeholder="Confirm Password"
                  className="input"
                  onChange={(event) => {setConfirmPassword(event.target.value)}}
                />
              </div>
              <button type="submit" className="btn">
                Sign Up
              </button>
              <div className="or">
                <div className="line"></div>
                <p>OR</p>
                <div className="line"></div>
              </div>
              <div className="signup">
                <p>
                  You already have an account?
                  <Link to={"/Signin"}>Log in</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
