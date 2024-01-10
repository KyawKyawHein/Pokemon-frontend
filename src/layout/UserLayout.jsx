import React, { useEffect } from 'react';
import { useStateContext } from '../context/StateContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

const UserLayout = () => {
    const {token} = useStateContext();
    const nav = useNavigate();
    useEffect(()=>{
        if (!token) {
            nav('/login')
        }
    },[token])
    
    return (
        <>
            <Nav/>
            <Outlet/>
        </>
    )
}

export default UserLayout;