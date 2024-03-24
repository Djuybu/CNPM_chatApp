import { Routes, Route, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import "../styles.css";
import image from "../assets/images.png";
import { getUser } from "../database"; // Assuming getUser handles data fetching
import Signup from "./Signup";

type FormFields = {
  email: string;
  password: string;
};

function Signin() {
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);  
    } catch (error) {
      setError("root", {
        message: "The email or password is invalid",
      })
    }

  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "macminhduy2004@gmail.com",
      password: "1234567d",
    }
  });

  return (
    <>
      <div className="wrapper">
        <div className="header">
          <div className="top">
            <div className="FlexiChat">
              <img src={image} id="logo" alt="FlexiChat" />
            </div>
            <div className="form" onSubmit={handleSubmit(onSubmit)}>
              <form>
                <div className="input_field">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      validate: (value) => {
                        if (!value.includes("@"))
                          return "Email must include '@'";
                      },
                    })}
                    type="text"
                    id="email"
                    placeholder="email"
                    className="input"
                  />
                </div>
                {errors.email && <div>{errors.email.message}</div>}
                <div className="input_field">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      validate: (value) => {
                        if (value.length < 8)
                          return "Password must be at least 8 characters long";
                      },
                    })}
                    type="password"
                    placeholder="Password"
                    className="input"
                  />
                </div>
                {errors.password && <div>{errors.password.message}</div>}
                <button disabled={isSubmitting} type="submit" className="btn">
                  {isSubmitting ? "..." : "Login"}
                </button>
                {errors.root && <div>{errors.root.message}</div>}
              </form>
            </div>
            {/* ... rest of your code */}
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default Signin;
