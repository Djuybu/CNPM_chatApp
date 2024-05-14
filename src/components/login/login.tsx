import "./login.css"
import {useState} from "react";

const Login= () =>
{
    const [avatar,setAvatar]=useState({
        file:null,
        url:""
    });
    const handleAvatar = e =>{
        if(e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    return(
        <div className="login">
            <div className="item">
                <h2>ĐĂNG NHẬP</h2>
                <form>
                    <input type="text" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Đăng Nhập</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
            <h2>TẠO TÀI KHOẢN MỚI</h2>
            <form>
                <label htmlFor="file" className="label-avatar">
                    <img src={avatar.url || "public/avatar.png"} alt={""}/>
                    Chon Anh Dai Dien
                </label>
                <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar}/>
                <input type="text" placeholder="Username" name="username"/>
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button>Đăng Kí</button>
            </form>
            </div>

        </div>
    )
}

export default Login;