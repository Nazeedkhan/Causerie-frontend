import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [backgroundColor, setBackgroundColor] = useState("#131324");
  const [color, setColor] = useState("#131324");

  const [values, setValues] = useState({
    username: "",
    password: "",
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
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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
    const { password, username } = values;
    if (password === "") {
      toast.error("Email & Password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Email & Password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="login_container" style={{ backgroundColor, transition: "background-color 2s ease-in-out" }}>
        <form className="login_form" onSubmit={(event) => handleSubmit(event)}>
          <div className="login_brands">
            <h1 className="login_h1">Hello, user</h1>
            <img
              className="login_img"
              src="https://media.tenor.com/iiPEGggldpgAAAAi/paimon-genshin-impact-paimon-emergency-food.gif"
              alt="Logo"
            />
          </div>
          <input
          style={{ color, transition: "background-color 2s ease-in-out" }}
            className="login_input"
            type="text"
            placeholder="Enter your username..."
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />

          <input
          style={{ color, transition: "background-color 2s ease-in-out" }}
            className="login_input"
            type="password"
            placeholder="Enter your password..."
            name="password"
            autoComplete="on"
            onChange={(e) => handleChange(e)}
          />

          <button style={{ backgroundColor, transition: "background-color 2s ease-in-out" }} className="login_button" type="submit">
            Login
          </button>
          <span className="login_span">
            Don't have an account?
            <Link style={{ color, transition: "color 2s ease-in-out"}}  className="login_link" to="/register">
              {" "}
              Register Here
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
