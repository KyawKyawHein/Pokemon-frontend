import React, { useState } from 'react';
import Logo from "../assets/img/logo.jpg";
import api from '../api';
import { useStateContext } from '../context/StateContext';

const Nav = () => {
    const {setToken,setCurrentUser} = useStateContext()
    const [loading,setLoading] = useState(false);
    const logout = ()=>{
        if(confirm("Do you really want to logout?")){
            setLoading(true);
            api.post('/logout').then(({ data }) => {
                setToken(null)
                setCurrentUser(null)
                console.log(data)
                setLoading(false)
            })
        }
    }
    return (
        <>
            <nav className='p-2 flex items-center shadow shadow-lg'>
                <img src={Logo} alt="logo" className='m-auto' width={"150px"} />
                <div className="text-end mr-3">
                    <button onClick={logout} className='bg-red-500 text-white p-1 rounded px-2'>{loading? 'Loading':'Logout'}</button>
                </div> 
            </nav>
        </>
    );
}

export default Nav;