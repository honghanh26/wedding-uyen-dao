import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import AdminHome from './admin/AdminHome';
import UserHome from './user/UserHome';

function App() {
    return (
        <Routes>
            <Route path="/*" element={<UserHome />} />
            <Route path="/admin20220925/*" element={<AdminHome />} />
        </Routes>
    );
}

export default App;
