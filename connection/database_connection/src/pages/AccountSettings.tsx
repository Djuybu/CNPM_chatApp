import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../assets/userStyle.css";
import { changeUserInfo } from "../database";
import 'bootstrap';

type AccountForm = {
  username: string;
  password: string;
  email: string;
  address: string;
  phone: string;
  gender: string;
  birthday: string;
};
let username = "MMD";
let password = "12345678";
let email = "vnu@uet";
let phone = "0123456789";
function AccountSetting() {
  const onSubmit: SubmitHandler<AccountForm> = (data) => {
    //gửi dữ liệu lên csdl
    console.log(data);
    try {
      changeUserInfo(data, (username = "MMD"));
      console.log("Dữ liệu đã được cập nhật thành công!");
      // Thực hiện các hành động khác sau khi cập nhật thành công (nếu cần)
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      // Xử lý lỗi nếu có
    }
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
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css"
        />
        <body>
        <div className="container light-style flex-grow-1 container-p-y">
          <h4 className="font-weight-bold py-3 mb-4">
            Account settings
          </h4>
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
              <div className="col-md-3 pt-0">
                <div className="list-group list-group-flush account-settings-links">
                  <a className="list-group-item list-group-item-action active" data-toggle="list"
                     href="#account-general">General</a>
                  <a className="list-group-item list-group-item-action" data-toggle="list"
                     href="#account-change-password">Change password</a>
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content">
                  <div className="tab-pane fade active show" id="account-general">
                    <div className="card-body media align-items-center">
                      <img src=""
                           alt
                           className="d-block ui-w-80"/>
                      <div className="media-body ml-4">
                        <label className="btn btn-outline-primary">
                          Upload new photo
                          <input type="file" className="account-settings-fileinput"/>
                        </label> &nbsp;
                        <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                        <div className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                      </div>
                    </div>
                    <hr className="border-light m-0"/>
                    <div className="card-body">
                      <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control mb-1" value={username}/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Change Password</label>
                        <input type="text" className="form-control" value={password}/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">E-mail</label>
                        <input type="text" className="form-control mb-1" value={email}/>
                        <div className="alert alert-warning mt-3">
                          <br/>
                          <strong>Your email is not confirmed.</strong>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" value={phone}/>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-change-password">
                    <div className="card-body pb-2">
                      <div className="form-group">
                        <label className="form-label">Current password</label>
                        <input type="password" className="form-control"/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">New password</label>
                        <input type="password" className="form-control"/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Repeat new password</label>
                        <input type="password" className="form-control"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right mt-3">
            <button type="submit" className="btn btn-primary">Save changes</button>
            &nbsp;
            <button type="button" className="btn btn-default">Cancel</button>

          </div>
        </div>

        </body>
      </>
  );
}

export default AccountSetting;
