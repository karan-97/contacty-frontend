import React from "react";
import { Login } from "./Components/Authentication/Login";
import './App.css';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Register } from "./Components/Authentication/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactList } from "./Components/Contacts/ContactList";
import { PrivateRoute } from './PrivateRoute';
import { Header } from "./Components/Header/Header";
import { AddContact } from "./Components/Contacts/AddContact";
import { Contact } from "./Components/Contacts/Contact";

export const App = (props) => {
    const auth = localStorage.getItem("token");
    const location = useLocation();
    return (
        <>
            {
                (location.pathname !== "/login") && (location.pathname !== "/register") && (location.pathname !== "/")
                    ? <Header />
                    : ""
            }
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/contacts"
                    element={
                        <PrivateRoute auth={auth}>
                            <ContactList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/contacts/add"
                    element={
                        <PrivateRoute auth={auth}>
                            <AddContact />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/contacts/:id"
                    element={
                        <PrivateRoute auth={auth}>
                            <Contact />
                        </PrivateRoute>
                    }
                />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}