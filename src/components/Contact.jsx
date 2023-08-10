import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./Contact.css";

const Contact = ({ contacts, currentUser, changeChat}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      <Container className={`ok`}>
        <div className="brand">
          <img
          className="imgsmall"
            src="https://pnghq.com/wp-content/uploads/free-png-images-paimon-png-download.png"
            alt="logo"
          />
          <h3>Causerie</h3>
        </div>
        <div className="contacts">
          {contacts?.map((contact, index) => {
            const usernameColor = generateRandomColor();
            return (
              <div
                key={index}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                  className="imgsmall"
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3 style={{ color: usernameColor }}>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
            
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;

  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    border-bottom: 1px solid grey;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      font-family: "Arizonia", cursive;
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: black;
      min-height: 4rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          font-family: "Arizonia", cursive;
          color: white;
        }
      }
      &:hover {
        background-color: white;
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        font-family: "Arizonia", cursive;
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
  @media (max-width: 770px) {
    .chat_container {
      height: 100vh;
      width: 100vw;
      background-color: #00000076;
      display: grid;
      grid-template-columns: 0% 100%;
    }
  
    .contacts {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      gap: 0.8rem;
      height: 53vh;
    }
    .imgsmall{
      margin-bottom: 0;
    }
  }

`;

export default Contact;
