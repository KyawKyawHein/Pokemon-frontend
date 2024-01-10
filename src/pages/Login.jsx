import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/StateContext';
import api from '../api';

const Login = () => {
    const { setToken,setCurrentUser } = useStateContext()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null)

    const login = (e)=>{
        e.preventDefault()
        setErrors(null)
        setLoading(true)
        api.post('/login', {email, password})
            .then(({ data }) => {
                console.log(data);
                setToken(data.token)
                setCurrentUser(data.user)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                const { response } = err;
                if (response && response.status == 422) {
                    if(response.data.errors){
                        setErrors(response.data.errors);
                    }else{
                        setErrors(response.data)
                    }
                }
            })
    }

    return (
        <div>
            <div className="w-full md:w-[500px] mt-5">
                <form onSubmit={(e)=>login(e)} className='shadow shadow-lg p-3'>
                    <div className="border-b border-gray-900/10">
                        <h2 className="text-3xl text-center text-yellow-500 font-bold leading-7 mb-3">Login</h2>
                        {
                            errors&& errors.error?
                                <p className='bg-red-500 my-2 text-white p-2 rounded'>{errors.error}</p> :
                                ''
                        }
                        <div className="">
                            <div className="mb-2">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
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
                                        autoComplete="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
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
                        <span>New user? <Link to={'/register'} className='text-yellow-500'>Register here</Link></span>
                        {
                            loading?
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
                                        Login
                                </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;