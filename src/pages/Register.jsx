import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useStateContext } from '../context/StateContext';

const Register = () => {
    const {setToken,setCurrentUser} = useStateContext()
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [password_confirmation,setPasswordConfirmation] = useState('');
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState(null)

    const register = (e)=>{
        e.preventDefault()
        setErrors(null)
        setLoading(true)
        api.post('/register',{name,email,password,password_confirmation})
        .then(({data})=>{
            setToken(data.token)
            setCurrentUser(data.user)
            setLoading(false)
        })
        .catch((err)=>{
            setLoading(false)
            const {response} = err;
            if(response && response.status==422){
                console.log(response.data.errors);
                setErrors(response.data.errors);
            }
        })
    }

    return (
        <div className="">
            <div className="w-full md:w-[500px] mt-5">
                <form onSubmit={(e)=>register(e)} className='shadow shadow-lg p-3'>
                    <div className="border-b border-gray-900/10">
                        <h2 className="text-3xl text-center text-yellow-500 font-bold leading-7 mb-3">Register</h2>

                        <div className="">
                            <div className="mb-2">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {
                                    errors && errors.name?
                                    <p className='text-red-500 font-bold'>{errors.name[0]}</p> : 
                                    ''
                                }
                            </div>

                            <div className="mb-2">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {
                                    errors && errors.email ?
                                        <p className='text-red-500 font-bold'>{errors.email[0]}</p> :
                                        ''
                                }
                            </div>

                            <div className="mb-2">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        autoComplete="password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {
                                    errors && errors.password ?
                                        <p className='text-red-500 font-bold'>{errors.password[0]}</p> :
                                        ''
                                }
                            </div>

                            <div className="mb-2">
                                <label htmlFor="passwordConfirmation" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="passwordConfirmation"
                                        name="passwordConfirmation"
                                        type="password"
                                        value={password_confirmation}
                                        onChange={(e)=>setPasswordConfirmation(e.target.value)}
                                        autoComplete="password_confirmation"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {
                                    errors && errors.password ?
                                        <p className='text-red-500 font-bold'>{errors.password[0]}</p> :
                                        ''
                                }
                            </div>
                        </div>
                    </div>                         

                    <div className="flex items-center justify-end gap-x-6">
                        <span>Already have an account? <Link to={'/login'} className='text-orange-500'>Login</Link></span>
                        {
                            loading ? 
                                <button
                                    disabled
                                    className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                >
                                    Loading
                                </button>
                                :
                                <button
                                    type="submit"
                                    className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                >
                                    Register
                                </button>
                        }
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;