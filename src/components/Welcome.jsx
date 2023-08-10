import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Contact from "./Contact";
import "./Welcome.css";

const Welcome = ({ contacts, currentUser, changeChat }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked); // Toggle the state when the button is clicked
    // console.log("ok");
    console.log(isButtonClicked);
  };

  return (
    <>
      <Container>
        <div className="button">
          <button
            onClick={handleButtonClick}
            className={isButtonClicked ? "red1" : "blue1"}
          >
            {isButtonClicked ? "Close Chat" : "Open Chats"}
          </button>
        </div>
        <img
          src="https://media.tenor.com/c4k5R8BgYEEAAAAd/mihoyo-genshin.gif"
          alt=""
        />
        <h1>
          Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
        <div
          className={`hidden styles slides chat-container ${
            isButtonClicked ? "active" : ""
          }`}
        >
          {isButtonClicked && (
            <Contact
              contacts={contacts}
              currentUser={currentUser}
              changeChat={changeChat}
            />
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  font-family: "Arizonia", cursive;
  img {
    height: 20rem;
    border-radius: 3rem;
    margin-bottom: 1rem;
  }
  h3 {
    font-family: "Arizonia", cursive;
    margin-top: 1rem;
  }
  span {
    font-family: "Arizonia", cursive;
    color: #4e0eff;
  }
  @media (max-width: 770px) {
    img {
      height: 50vw;
    }
    h3 {
      margin: 0 5px;
      text-align: center;
    }
    h1 {
      text-align: center;
    }
  }
  .button {
    display: none;
  }
  @media (max-width: 770px) {
    .button {
      display: unset;
      text-decoration: none;
      position: fixed;
      top: 1rem;
      left: 1rem;
      button {
        font-size: 17px;
        padding: 0.5rem;
        color: white;
        border: none;
        border-radius: 10px;
        border-bottom: none;
        font-weight: 700;
        font-family: "Arizonia", cursive;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
      }
    }
  }

  .hidden {
    display: none;
  }

  @media (max-width: 770px) {
    .hidden {
      display: revert;
    }
  }
  .red1 {
    background-color: #bf1717;
  }
  .blue1 {
    background-color: #4e0eff;
  }
`;

export default Welcome;
