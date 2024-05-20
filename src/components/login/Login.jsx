import React, { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
    signInWithPopup,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth, db, googleProvider } from "../../lib/firebase";
import {collection, doc, getDocs, query, setDoc, where} from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

 const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    // VALIDATE INPUTS
    if (!username || !email || !password)
      return toast.warn("Hãy điền đầy đủ thông tin!");
    if (!avatar.file) {
      toast.warn("Hãy chọn ảnh đại diện");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return;
    }

    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return toast.warn("Username đã tồn tại");
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Tạo tài khoản thành công");
        window.location.reload();

    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);


    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Đăng Nhập Thành Công");
                  window.location.reload();
    } catch (err) {
      console.log(err);
    toast.info("TOÀN BỘ DATABASE ĐÃ ĐƯỢC RESET ĐỂ SỬA LỖI, VUI LÒNG TẠO TÀI KHOẢN MỚI!");
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
    const handleGoogleLogin = async () => {
        setLoading(true); // Đặt loading state trước khi bắt đầu đăng nhập bằng Google
        try {
            // Đăng nhập bằng Google Popup
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", user.email));
            const querySnapshot = await getDocs(q);

            // Nếu người dùng chưa tồn tại, thêm mới vào cơ sở dữ liệu
            if (querySnapshot.empty) {
                const newUser = {
                    username: user.email || "Unknown",
                    email: user.email,
                    avatar: user.photoURL || "", // Ảnh đại diện từ Google
                    id: user.uid,
                    blocked: [],
                };
                // Thêm người dùng mới vào cơ sở dữ liệu
                await setDoc(doc(db, "users", user.uid), newUser);
                // Thêm chat mới cho người dùng
                await setDoc(doc(db, "userchats", user.uid), { chats: [] });
            }

            // Đăng nhập thành công, tải lại trang để cập nhật giao diện
            toast.success("Đăng nhập bằng Google thành công.");
            window.location.reload();
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false); // Dừng loading sau khi hoàn thành quá trình đăng nhập
        }
    };
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        const emailInput = document.querySelector('input[name="email"]');
        const email = emailInput.value;

        if (!email) {
            toast.warn("Vui lòng nhập email để đặt lại mật khẩu.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Check your gmail");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };
  return (
    <div className="login">
        <div className="item">
            <h2>FLEXI CHAT WELCOME BACK</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Email" name="email"/>
                <input type="password" placeholder="Password" name="password"/>
                <button disabled={loading}>{loading ? "Loading" : "Đăng Nhập"}</button>
                <a href="#" className="forgot" onClick={handlePasswordReset}>Quên mật khẩu</a>

            </form>

            <button type="button" className="login-with-google-btn" onClick={handleGoogleLogin}>
                Đăng nhập bằng Google
            </button>


        </div>
        <div className="separator"></div>
        <div className="item">
            <h2>Đăng Kí</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="file" className="label-avatar">
                    <img src={avatar.url || "./avatar.png"} alt={""}/>
                    Chọn Ảnh Đại Diện
                </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Đăng Kí"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
