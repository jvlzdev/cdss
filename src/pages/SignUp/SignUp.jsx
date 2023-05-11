import React, { useState } from 'react'
import { useSignupMutation } from '../../services/appApi';
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  function handleSignUp(e) {
    e.preventDefault();
    const name = `${firstName} ${lastName}`
    console.log({ name, email, password })
    signup({ name, email, password });
  }

  return (
    <div className='flex justify-center items-center h-fit mx-auto'>
      <form className='w-[50vh]	p-8 bg-slate-100' onSubmit={handleSignUp}>
        <h1 className='text-[3rem] text-center font-bold'>Sign Up</h1>
        <div className="mb-6">
          <label className="block mb-2 text-md font-semibold text-dark-700">First name</label>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} className="text-lg p-4 focus:rounded-none rounded-none bg-transparent border border-gray-500 text-dark-900 placeholder-dark-700 block w-full" />
          {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p> */}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-md font-semibold text-dark-700">Last name</label>
          <input type="text" onChange={(e) => setLastName(e.target.value)} className="text-lg p-4 focus:rounded-none rounded-none bg-transparent border border-gray-500 text-dark-900 placeholder-dark-700 block w-full" />
          {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p> */}
        </div>
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
          <button type="submit" className='w-full block bg-neutral-950 p-6 text-white'>Create account</button>
        </div>
        <div>
          <Link
            to="/login"
            className="mt-5 underline text-lg w-full flex justify-center items-center"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp