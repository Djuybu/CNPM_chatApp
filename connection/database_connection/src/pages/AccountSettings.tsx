import { useState } from "react";
import "../assets/style.css";
import { SubmitHandler, useForm } from "react-hook-form";
import downloadJpg from "../assets/download.jpg";
import iconPng from "../assets/download.png";
import "../assets/userStyle.css";
import profilePng from "../assets/profile.png";
import viteSvg from "../assets/javascript.svg";
import "../assets/responsive.css";

type AccountForm = {
  username: string;
  password: string;
  email: string;
  address: string;
  phone: string;
  gender: string;
  birthday: string;
};

function AccountSetting() {
  const onSubmit: SubmitHandler<AccountForm> = (data) => {
    //gửi dữ liệu lên csdl
    console.log(data);
  };

  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AccountForm>();
  return (
    <>
      <span className="mainBg"></span> {/* Use className instead of class */}
      <div className="container">
        {/* Header/Navbar */}
        <header>
          <div className="brandLogo">
            <figure>
              <img
                src={viteSvg} // Adjust path if needed
                alt="logo"
                width="40px"
                height="40px"
              />
            </figure>
            <span>UserProfile</span>
          </div>
        </header>

        {/* User Main-Profile */}
        <section className="userProfile card">
          <div className="profile">
            <figure>
              <img
                src={profilePng} // Adjust path if needed
                alt="profile"
                width="250px"
                height="250px"
              />
            </figure>
          </div>
        </section>

        <section className="work_skills card">
          {/* Edu */}
          <div className="work">
            <h1 className="heading">Education</h1>
            <div className="primary">
              <h1>Đại học Công nghệ</h1>
              <span></span>
              <p>144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
            </div>
            <div className="secondary">
              <h1>Khoa Công nghệ thông tin</h1>
              <span></span>
              <p>
                Phòng 301, Nhà A5, Đại học Công nghệ, 144 Xuân Thủy, Cầu Giấy,
                Hà Nội
              </p>
            </div>
          </div>
        </section>

        {/* User Details Sections */}
        <section className="userDetails card">
          <div className="userName">
            <h1 className="name">Test</h1>
            <div className="map">
              <i className="ri-map-pin-fill ri"></i>
              <span>VietNam</span>
            </div>
            <p>Test IT</p>
          </div>

          <div className="rank">
            <h1 className="heading">Rankings</h1>
            <div className="rating">
              <i className="ri-star-fill rate"></i>
              <i className="ri-star-fill rate"></i>
              <i className="ri-star-fill rate"></i>
              <i className="ri-star-fill rate"></i>
              <i className="ri-star-fill rate underrate"></i>
            </div>
          </div>
        </section>

        <section className="about_card card">
          <div className="tabs">
            <ul>
              <li className="about active">
                <i className="ri-user-3-fill ri"></i>
                <span>About</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contact_Info">
              {isEditing ? (
                <button
                  type="submit"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Save changes
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Edit your profile
                </button>
              )}
              <h1 className="heading">Contact Information</h1>
              <ul>
                <li className="phone">
                  <h1 className="label">Phone:</h1>
                  {isEditing ? (
                    <input
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                    />
                  ) : (
                    <span className="info">0374418204</span>
                  )}
                </li>
                {errors.phone && <div>{errors.phone.message}</div>}
                <li className="address">
                  <h1 className="label">Address:</h1>
                  {isEditing ? (
                    <input {...register("address")} />
                  ) : (
                    <span className="info">Somewhere in Hanoi</span>
                  )}
                </li>
                <li className="email">
                  <h1 className="label">E-mail:</h1>
                  {isEditing ? (
                    <input {...register("email")} />
                  ) : (
                    <span className="info">vnu@uet</span>
                  )}
                </li>
              </ul>
            </div>

            <div className="heading">
              <h1 className="heading">Basic Information</h1>
              <ul>
                <li className="birthday">
                  <h1 className="label">Birthday:</h1>
                  {isEditing ? (
                    <input {...register("birthday")} />
                  ) : (
                    <span className="info">2004</span>
                  )}
                </li>

                <li className="sex">
                  <h1 className="label">Gender:</h1>
                  {isEditing ? (
                    <input type="text" name="" />
                  ) : (
                    <span className="info">Male</span>
                  )}
                </li>

                <li className="sex">
                  <h1 className="label">Username: </h1>
                  {isEditing ? (
                    <input type="text" name="" />
                  ) : (
                    <span className="info">MMD</span>
                  )}
                </li>

                <li className="sex">
                  <h1 className="label">Password:</h1>
                  {isEditing ? (
                    <input type="password" name="" value={12345678} />
                  ) : (
                    <input
                      type="password"
                      name=""
                      id=""
                      value={12345678}
                      disabled
                    />
                  )}
                </li>
              </ul>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default AccountSetting;
