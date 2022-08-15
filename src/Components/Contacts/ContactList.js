import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import instance from '../../AxiosInstance';
import { PopUp } from './PopUp';
import './Styles/table.css'

export const ContactList = () => {

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0);
    const [deleted, setDeleted] = useState(false);

    const navigate = useNavigate();

    const LIMIT = 10;

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleEdit = async(id) => {
        navigate(`/contacts/${id}`);
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete the contact!") == true) {
            deleteContact(id)
        } else {
            console.info("cancelled");
        }
    }

    useEffect(() => {
        getAllContacts();
    }, [currentPage,deleted])


    const getAllContacts = async () => {
        try {
            let CONTACTS_API = `contacts?page=${currentPage}&limit=${LIMIT}`
            const response = await instance.get(CONTACTS_API);
            setTableData(response?.data?.data);
            setTotalRecords(response?.data?.meta?.total_records);
            setLoading(false);
            if(deleted){
                setDeleted(false)
            }
        } catch (error) {
            console.error(error.message)
            toast.error("Something went wrong");
        }
    }

    const deleteContact = async (id) => {
        let CONTACTS_API = `contacts/${id}`
        try {
            const response = await instance.delete(CONTACTS_API);
            setDeleted(true);
            toast.success("Contact removed successfully")
        } catch (error) {
            console.error(error.message)
            toast.error("Something went wrong");
        }
    }

    if (loading) {
        return (
            <>
                <h1 className='loading'> Loading.......</h1>
            </>
        )
    } else {
        return (
            <div className='table__container'>
                <table>
                    <tbody>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th> Edit </th>
                            <th> Delete </th>
                        </tr>
                        {tableData.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.full_name}</td>
                                    <td>{val.email}</td>
                                    <td>{val.phone_number}</td>
                                    <td>
                                        <button className='edit__btn' value={val.id} onClick={() => handleEdit(val.id)}>
                                            <i class="fa fa-pencil"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button className='del__btn' value={val.id} onClick={() => handleDelete(val.id)}>
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='pagination__button'>
                    <button className='previous__btn' onClick={(e) => handlePrevious()} disabled={(currentPage === 0)}>
                        Previous
                    </button>
                    <button className='next__btn' onClick={(e) => handleNext()} disabled={((currentPage+1) * LIMIT) > totalRecords}>
                        Next
                    </button>
                </div>
            </div>
        );
    }

}