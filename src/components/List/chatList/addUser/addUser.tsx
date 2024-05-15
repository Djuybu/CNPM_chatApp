import "./addUser.css"

const AddUser = () => {
    return (
        <div className="addUser">

            <form>
                <input type="text" placeholder="Username" name="username"/>
                <button>Search</button>

            </form>
            <div className="user">
                <div className="detail">
                    <img src="../../../../../public/avatar.png" alt=""/>
                    <span> User 1</span>
                </div>
                <button> Add USer</button>
            </div>
        </div>
    )

}

export default AddUser