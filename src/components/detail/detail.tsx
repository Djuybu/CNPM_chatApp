import "./detail.css"

const Detail = () => {
    return (
        <div className="detail">
            <div className="user">
                <img src="public/avatar.png" alt=""/>
                <h2>VI tri1</h2>
                <p>Vi tri 2 </p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="public/arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="public/arrowDown.png" alt=""/>
                    </div>

                    <div className="photos">


                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://ishadeed.com/assets/scrollbars/use-case-2.jpg" alt=""/>
                                <span>photo</span>
                            </div>

                            <img src="public/download.png" className="icon"/>
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://ishadeed.com/assets/scrollbars/use-case-2.jpg" alt=""/>
                                <span>photo</span>
                            </div>

                            <img src="public/download.png" className="icon"/>
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://ishadeed.com/assets/scrollbars/use-case-2.jpg" alt=""/>
                                <span>photo</span>
                            </div>

                            <img src="public/download.png" className="icon"/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="public/arrowDown.png" alt=""/>
                    </div>
                </div>
                <button> Chan nguoi dung</button>
                <button className="logout"> Logout</button>

            </div>
        </div>
    )
}

export default Detail;