import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../AxiosInstance";
import { PopUp } from "./PopUp";

export const AddContact = () => {

    const [values, setValues] = useState({
        full_name: '',
        email: '',
        phone_number: '',
    });

    const [errors, setErrors] = useState({
        full_name: false,
        email: false,
        phone_number: false
    })

    const [openModal, setOpenModal] = useState(true);

    const navigate = useNavigate();

    const handleClose = () => {
        setOpenModal(false)
        navigate('/contacts');
    };

    const handleChange = async (prop, v) => {
        setValues({ ...values, [prop]: v });

        if (prop === 'emafull_nameil')
            setErrors({
                ...errors,
                full_name: v.length < 1
            });
        if (prop === 'email')
            setErrors({
                ...errors,
                email: v.length < 1
            });
        if (prop === 'phone_number') {
            setErrors({
                ...errors,
                phone: v?.length !== 10 && v > 0
            });
        }
        if (prop === 'phone_number')
            setErrors({
                ...errors,
                phone_number: v.length < 1
            });
    };

    const addContact = async () => {
        try {
            const response = await instance.post('/contacts', values);
            let successMsg = response.data?.message 
            toast.success(successMsg)
            handleClose();
            clearValues();
            navigate('/contacts', { replace: true });
        } catch (error) {
            console.error(error);
            let errMsg = error.message[0] || "Something went wrong!";
            toast.error(errMsg);
        }
    }

    const clearValues = () => {
        values.full_name = '';
        values.email = '';
        values.phone_number = '';
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.full_name === '') {
            alert("Name is required!");
            return;
        }
        if (values.email === '') {
            alert("Email is required!");
            return;
        }
        if (values.phone_number === '') {
            alert("Phone number is required!");
            return;
        }
        if (values.phone_number.match(/^([+]\d{2})?\d{10}$/gm) == null) {
            alert("Phone number is invalid.");
            return;
        }
        addContact();
    }

    return (
        <>
            <PopUp
                open={openModal}
                close={handleClose}
                type={"Add"}
                change={handleChange}
                submit={handleSubmit}
                values={values}
            />
        </>
    )
}