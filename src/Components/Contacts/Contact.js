import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import instance from '../../AxiosInstance';
import { PopUp } from './PopUp';

export const Contact = (props) => {

    const [values, setValues] = useState({
        full_name: '',
        email: '',
        phone_number: '',
    });

    const [errors, setErrors] = useState({
        full_name: false,
        email: false,
        phone_number: false
    });
    const [loading, setIsLoading] = useState(true);

    const [openModal, setOpenModal] = useState(true);

    const navigate = useNavigate();
    const params = useParams();


    const handleClose = () => {
        setOpenModal(false)
        navigate('/contacts');
    };

    useEffect(() => {
        const getContactById = async () => {
            try {
                const response = await instance.get(`/contacts/${params.id}`)
                setValues({ 
                    email: response?.data?.data?.email,
                    phone_number: response?.data?.data?.phone_number,
                    full_name: response?.data?.data?.full_name
                })
                setIsLoading(false);    
            } catch (err) {
                toast.error("Something went wrong")
            }
        }
        getContactById(params.id)
    }, [])

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

    const updateContact = async (id) => {
        try {
            const response = await instance.put(`/contacts/${id}`, values);
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

    const handleSubmit = async (e) => {
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
        await updateContact(params.id);
    }

    const clearValues = () => {
        values.full_name = '';
        values.email = '';
        values.phone_number = '';
    }

    if (loading) {
        return (
            <>
                <h1 className='loading'> Loading.......</h1>
            </>
        )
    } else {
        return (
            <>
                <PopUp
                    open={openModal}
                    close={handleClose}
                    type={"Update"}
                    change={handleChange}
                    submit={handleSubmit}
                    values={values}
                />
            </>
        )
    }
}
