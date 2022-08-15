import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../AxiosInstance";
import './Styles/login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
    const [values, setValues] = useState({
        full_name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        full_name: false,
        email: false,
        password: false
    })

    const navigate = useNavigate();

    const handleChange = async (prop, v) => {
        setValues({ ...values, [prop]: v });

        if (prop === 'email')
            setErrors({
                ...errors,
                email: v.length < 1
            });
        if (prop === 'password')
            setErrors({
                ...errors,
                password: v.length < 1
            });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (values.password === '') {
            alert("Password is required!");
        }
        if (values.email === '') {
            alert("Email is required!");
        }
        if (values.full_name === '') {
            alert("Name is required!");
        }
        await instance.post('/auth/signup', values);
        clearValues();
        toast.success("Register Successfully! Please verify your email.")
        navigate('/login',{replace: true})
    }

    const clearValues = () => {
        values.full_name = '';
        values.email = '';
        values.password = '';
    }

    const handleClick = () => {
        navigate('/login', {replace: true})
      }


    return (
        <div className="login">
            <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
                <h1> Register Here </h1>
                <input
                    type="text"
                    name="fullname"
                    autoComplete="off"
                    placeholder="Enter full name"
                    value={values.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    required
                />
                <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Enter email address"
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                />
                <button type="submit" className="submit__btn" >Login</button>
            </form>
            <a className="lgn_to_reg" onClick={() => handleClick()}>Already have an account</a>
        </div>
    )
}