import "./login.css"
import {useState} from "react";
import {toast} from "react-toastify";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../../database/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../database/upload";
const Login= () =>
{
    const [avatar,setAvatar]=useState({
        file:null,
        url:""
    });

    const [loading, setLoading] = useState(false);

    const handleAvatar = e =>{
        if(e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleRegister =  async(e) =>{
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const{username,email,password}=Object.fromEntries(formData);
        const defaultAvatarUrl = "public/avatar.png";

        if (!username || !email || !password)
            return toast.warn("Please enter inputs!");

        try {
            const res = await createUserWithEmailAndPassword(auth,email,password);

            const imgUrl = avatar.file ? await upload(avatar.file) : defaultAvatarUrl;
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                password,
                avatar: imgUrl,
                id: res.user.uid,
                blocker:[]
            });
            await setDoc(doc(db, "userschats", res.user.uid), {
                chats:[],


            });
            toast.success("Đăng Kí Thành Công");
            window.location.reload();

        }
        catch (err)
        {
            console.log(err);
            toast.error(err.message);
        }
        finally {
            setLoading(false);

        }
    }
    const handleLogin = async (e)=>{
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login Success");

        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };



    return(
        <div className="login">
            <div className="item">
                <h2>ĐĂNG NHẬP</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button disabled={loading}>{loading ? "Loading" : "Đăng Nhập"}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
            <h2>TẠO TÀI KHOẢN MỚI</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="file" className="label-avatar">
                    <img src={avatar.url || "public/avatar.png"} alt={""}/>
                    Chọn Ảnh Đại Diện
                </label>
                <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar}/>
                <input type="text" placeholder="Username" name="username"/>
                <input type="text" placeholder="Email" name="email"/>
                <input type="password" placeholder="Password" name="password"/>
                <button disabled={loading}>{loading ? "Loading" : "Đăng Kí"}</button>
            </form>
            </div>

        </div>
    )
}

export default Login;