import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoute, host } from "../utils/APIRoutes";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import "./Chat.css";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const func1 = async () => {
      if (!localStorage.getItem("causerie-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("causerie-user")));
        setIsLoaded(true);
      }
    };
    func1();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const func2 = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    func2();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <div className="chat_upperBox">
        <div className="chat_container">
          <Contact
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {isLoaded && currentChat === undefined ? (
            <Welcome
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
          ) : currentChat && currentUser ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Chat;
