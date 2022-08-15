import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../AxiosInstance";
import './Styles/login.css';

export const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false
  })

  const navigate = useNavigate();

  const handleChange = async (prop, v) => {
    setValues({ ...values, [prop]: v });

    if (prop === 'email')
      setErrors({
        ...errors,
        username: v.length < 1
      });
    if (prop === 'password')
      setErrors({
        ...errors,
        password: v.length < 1
      });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response =  await instance.post('/auth/login',values)
      localStorage.setItem("user",JSON.stringify(response.data.data.user))
      localStorage.setItem("token",response.data.data.token)
      toast.success("Logged in successfully")
      navigate('/contacts', {replace: true});
    }catch(error){
      let errorMsg = error.message || "Something went wrong";
      toast.error(errorMsg)
    }
  }

  const handleClick = () => {
    navigate('/register', {replace: true})
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
        <h1> Login Here </h1>
        <input
          type="email"
          name="email"
          autoComplete="off"
          autoFocus="on"
          placeholder="Enter email address"
          value={values.username}
          onChange={(e) => handleChange("username", e.target.value)}
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
      <a className="lgn_to_reg" onClick={() => handleClick()}>Don't have an account</a>
    </div>
  )
}