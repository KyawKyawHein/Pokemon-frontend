import React, { useEffect } from 'react';
import { useStateContext } from '../context/StateContext';
import { Outlet, useNavigate } from 'react-router-dom';

const GuestLayout = () => {
    const {token} = useStateContext()
    const nav= useNavigate()
    useEffect(() => {
        if (token) {
            nav('/')
        }
    }, [token])
   
    return (
        <div className='min-h-screen flex justify-center items-center'>
        <Outlet/>
        </div>
    )
}

export default GuestLayout;