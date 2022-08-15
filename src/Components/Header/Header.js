import React, { useEffect, useState } from "react";
import './Styles/header.css';
import { PopUp } from "../Contacts/PopUp";
import { useNavigate } from "react-router-dom";
export const Header = (props) => {
    const user = JSON.parse(localStorage.getItem('user'))
    
    const navigate = useNavigate();

    const redirectToAddContact = () => {
        navigate('/contacts/add', { replace: true })
    }
    
    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate('/login', {replace: true})
    }
    return (
        <>
            <div className="topnav">
                <ul>
                    <li>{`Welcome ${user.full_name}`}</li>
                    <li className="add__contact" onClick={() => redirectToAddContact()}><i class="fa fa-plus">{' Add Contact '}</i></li>
                    <li onClick={() => logout()}><i class="fa fa-sign-out ">{' Sign Out '}</i></li>
                </ul>
            </div>

        </>
    )
}