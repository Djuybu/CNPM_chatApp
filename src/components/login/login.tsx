import "./login.css"

const Login= () =>
{
    return(
        <div className="login">
            <div className="item">
                <h2>Xin Chào</h2>
                <form>
                    <input type="text" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Đăng Nhập</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item"></div>
            <h2>Tạo Tài Khoản Mới</h2>
            <form>
                <input type="file"  id="file"/>
                <input type="text" placeholder="Username" name="username"/>
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button>Đăng Kí</button>
            </form>


        </div>
    )
}

export default Login;