import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../assets/userStyle.css";
import { changeUserInfo, changePassword } from "../database";
import { user } from "../App";
import { any } from "prop-types";
import { getAvatarLink } from "../storage";
import { File } from "undici-types";

type AccountForm = {
  username: string;
  avatar: any;
  password: string;
  email: string;
  address: string;
  phone: string;
  gender: string;
  birthday: string;
};

function AccountSetting() {
  const onGeneralSubmit: SubmitHandler<AccountForm> = async (data) => {
    if (file) {
      data.avatar = file;
      data.avatar = await getAvatarLink(file);
    } else {
      data.avatar = "";
    }
    //gửi dữ liệu lên csdl
    try {
      changeUserInfo(data, user.getId());
    } catch (error) {
      console.log(error);
    }
  };

  const onPasswordSubmit: SubmitHandler<AccountForm> = (data) => {
    console.log("Password: ", data.password);
    changePassword(data.password, user.getId());
  };

  const [file, setFile] = useState();
  const [formType, setFormType] = useState("general");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AccountForm>({
    defaultValues: {
      username: user.getUsername(),
      address: user.getAddress(),
      email: user.getEmail(),
      password: user.getPassword(),
      phone: user.getPhone(),
      gender: user.getGender(),
    },
  });
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css"
      />
      <div className="container light-style flex-grow-1 container-p-y">
        <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
        <div className="card overflow-hidden">
          <form
            className="row no-gutters row-bordered row-border-light"
            onSubmit={
              formType === "general"
                ? handleSubmit(onGeneralSubmit)
                : handleSubmit(onPasswordSubmit)
            }
          >
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <a
                  className="list-group-item list-group-item-action active"
                  data-toggle="list"
                  href="#account-general"
                >
                  General
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-change-password"
                >
                  Change password
                </a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="account-general"
                  onClick={() => {
                    setFormType("general");
                  }}
                >
                  <div className="card-body media align-items-center">
                    <img src="" alt="123" className="d-block ui-w-80" />
                    <div className="media-body ml-4">
                      <label className="btn btn-outline-primary">
                        Upload new photo
                        <input
                          {...register("avatar")}
                          type="file"
                          className="account-settings-fileinput"
                          onChange={(e: any) => {
                            setFile(e.target.files[0]);
                          }}
                        />
                      </label>{" "}
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-default md-btn-flat"
                      >
                        Reset
                      </button>
                      <div className="text-light small mt-1">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </div>
                    </div>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        {...register("username")}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">E-mail</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        {...register("email")}
                      />
                      <div className="alert alert-warning mt-3">
                        <br />
                        <strong>Your email is not confirmed.</strong>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("phone")}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("address")}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("gender")}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="account-change-password"
                  onClick={() => {
                    setFormType("password");
                  }}
                >
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label">Current password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New password</label>
                      <input
                        type="password"
                        className="form-control"
                        {...register("password")}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Repeat new password</label>
                      <input type="password" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right mt-3">
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
              &nbsp;
              <button type="button" className="btn btn-default">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountSetting;
