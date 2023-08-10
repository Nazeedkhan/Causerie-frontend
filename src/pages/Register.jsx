import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [backgroundColor, setBackgroundColor] = useState("#131324");
  const [color, setColor] = useState("#131324");

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = generateRandomColor();
      setBackgroundColor(randomColor);
      setColor(randomColor);
    }, 1000); // Change color every 5 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);


  useEffect(() => {
    if (localStorage.getItem("causerie-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      //   console.log("inside validation");
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("causerie-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password & Confirm password should be same.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error(
        "Password should be equal or greater than 6 characters",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div
        className="registerContainer"
        style={{ backgroundColor, transition: "background-color 2s ease-in-out" }}
      >
        <form
          className="register_form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="registerBrands">
            <img className="registerImg" src="https://64.media.tumblr.com/c1f8849fefffd8f2c54220cd48ff5469/53828a39d1e162b1-a4/s500x750/ce7c7e36524587bb3c404fde19309c6e7ec354d3.png" alt="Logo" />
            <h1 className="registerH1">Welcome</h1>
          </div>
          <input
          style={{ color, transition: "color 2s ease-in-out"}}
            className="register_input"
            type="text"
            placeholder="Enter your username here..."
            name="username"
            onChange={(e) => handleChange(e)}
          />

          <input
          style={{ color, transition: "color 2s ease-in-out"}}
            className="register_input"
            type="email"
            placeholder="Enter your email here..."
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
          style={{ color, transition: "color 2s ease-in-out"}}
            className="register_input"
            type="password"
            placeholder="Enter your password..."
            name="password"
            autoComplete="on"
            onChange={(e) => handleChange(e)}
          />
          <input
          style={{ color, transition: "color 2s ease-in-out"}}
            className="register_input"
            type="password"
            placeholder="Confirm your password..."
            name="confirmPassword"
            autoComplete="on"
            onChange={(e) => handleChange(e)}
          />

          <button style={{ backgroundColor, transition: "background-color 2s ease-in-out" }} className="register_button" type="submit">
            Create User
          </button>
          <span className="register_span">
            Already have an account?
            <Link style={{ color, transition: "color 2s ease-in-out"}}  className="register_link" to="/login">
              {" "}
              Login Here
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
