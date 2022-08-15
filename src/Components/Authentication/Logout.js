import React from "react";
import './Styles/logout.css';``

export const Logout = () => {
    
    const handleLogout = (e) => {
        e.preventDefault();
    }

    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    
    return (
        <div className="logout">
            <h1> Welcome <span className="user__name">{user? user.full_name : ""}</span> </h1>
            {""}
            <button className="logout__button" onClick={(e) => handleLogout(e)}>Logout</button>
        </div>
    )
}
