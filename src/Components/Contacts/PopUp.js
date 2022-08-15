import React, { useEffect } from "react";
import './Styles/popup.css';

export const PopUp = (props) => {
    // console.log("props value ",props)
    if (props.open) {
        return (
            <>
                <div id="contact-popup" className="contact__popup">
                    <div class="contact__content">
                        <span className="close" onClick={() => props.close()}>&times;</span>
                        
                        <form className="form-container">
                            <h1 className="form-title">{props.type+` Contact`}</h1>

                            <label htmlFor="full_name"><b>Full Name</b></label>
                            <input 
                                type="text" 
                                placeholder="Enter full name" 
                                name="full_name" 
                                value={props.values.full_name}
                                autoComplete="off"
                                onChange={(e) => props.change("full_name", e.target.value)}
                                required 
                            />

                            <label htmlFor="email"><b>Email</b></label>
                            <input 
                                type="email" 
                                placeholder="Enter Email" 
                                name="email"
                                value={props.values.email}
                                autoComplete="off"
                                onChange={(e) => props.change("email", e.target.value)} 
                                required 
                            />

                            <label htmlFor="phone_number"><b>Phone Number</b></label>
                            <input 
                                type="text" 
                                placeholder="Enter phone number" 
                                name="phone_number"
                                value={props.values.phone_number}
                                autoComplete="off" 
                                onChange={(e) => props.change("phone_number", e.target.value)} 
                                required 
                            />

                            <button type="submit" className="btn" onClick={(e) => props.submit(e)}>{props.type}</button>
                        </form>
                    </div>
                </div>
            </>
        );
    } else {
        return (<></>);
    }
}