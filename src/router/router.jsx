import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "../pages/chat";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import { useCallback, useContext, useEffect, useState } from "react";
import { User } from "../config/context";
import AddFreinds from "../pages/addFreind";

function AppRouter() {

    let myUser = useContext(User);
    
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/chat"  element={myUser ? <ChatPage /> : <Navigate to="/login" />}  />
            <Route path="/friends"  element={myUser ? <AddFreinds /> : <Navigate to="/login" />}  />
            <Route path="/login" element={!myUser ? <LoginPage /> : <Navigate to="/chat" />} />
            <Route path="/signup" element={!myUser ? <SignupPage /> : <Navigate to="/chat" />} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter