import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import SetAvatar from "./pages/SetAvatar";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/setAvatar" element={<SetAvatar/>}/>
        <Route exact path="/" element={<Chat/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
