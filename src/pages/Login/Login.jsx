import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from '../../services/appApi';
import { useSelector } from 'react-redux';

const Login = () => {
  const user = useSelector(state => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    console.log('login', { email, password })
    login({ email, password });
    if (error?.data?.message) navigate('/login')
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  return (
    <div className='flex justify-center items-center h-fit mx-auto'>
      <form className='w-[50vh]	p-8 bg-slate-100' onSubmit={handleLogin}>
        <h1 className='text-[3rem] text-center font-bold'>Login</h1>
        {/* {error && alert(`${error?.data?.message}`)} */}
        <div className="mb-6">
          <label className="block mb-2 text-md font-semibold text-dark-700">Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} className="text-lg p-4 focus:rounded-none rounded-none bg-transparent border border-gray-500 text-dark-900 placeholder-dark-700 block w-full" />
          {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p> */}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-md font-semibold text-dark-700">Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} className="text-lg p-4 focus:rounded-none rounded-none bg-transparent border border-gray-500 text-dark-900 placeholder-dark-700 block w-full" />
          {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p> */}
        </div>
        <div>
          <Link
            to="/login"
            className="my-5 underline text-sm w-full flex justify-start items-center"
          >
            Forgot your password?
          </Link>
        </div>
        <div>
          <button type="submit" disabled={isLoading} className='w-full block bg-neutral-950 p-6 text-white'>Login</button>
        </div>
        <div>
          <Link
            to="/signup"
            className="mt-5 underline text-md w-full flex justify-center items-center"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login