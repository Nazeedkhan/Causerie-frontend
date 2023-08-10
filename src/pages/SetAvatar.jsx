import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import "./SetAvatar.css";

const SetAvatar = () => {
  const [backgroundColor, setBackgroundColor] = useState("#131324");
  const [color, setColor] = useState("#131324");

  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
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
    const setting = async () => {
      if (!localStorage.getItem("causerie-user")) {
        navigate("/login");
      }
    };
    setting();
  }, []);

  const setProfilePicture = async () => {
    console.log("entered");
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("causerie-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      console.log(data);

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("causerie-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  const fetchData = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      try {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      } catch (error) {
        console.error("Error fetching image:", error);
      }

      await new Promise((resolve) => setTimeout(resolve, 2500));
    }
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="avatar_container_1">
          <h1 className="avatar_container_1_h1">Please wait...</h1>
          <h1 className="avatar_container_1_h1">Avatars are loading...</h1>
          <img
            src="https://static.demilked.com/wp-content/uploads/2016/06/gif-animations-replace-loading-screen-10.gif"
            alt="loader"
            className="avatar_loader"
          />
        </div>
      ) : (
        <div className="avatar_container">
          <div className="avatar_title-container">
            <h1 className="avatar_h1">
              Pick an avatar as your profile picture
            </h1>
          </div>
          <div className="avatar_avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar_avatar ${
                    selectedAvatar === index ? "avatar_selected" : ""
                  }`}
                >
                  <img
                    className="avatar_img"
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <a href="/setAvatar">
            <button
              style={{
                backgroundColor,
                transition: "background-color 2s ease-in-out",
              }}
              className="avatar_submit-btn2"
            >
              Change Avatars
            </button>
          </a>
          <button onClick={setProfilePicture} className="avatar_submit-btn">
            Set as Profile Picture
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SetAvatar;
