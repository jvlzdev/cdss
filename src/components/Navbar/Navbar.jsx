import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logoImg from '../../assets/doer-logo.png';
import { BiUser, BiSearch, BiShoppingBag } from 'react-icons/bi'
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import { logout } from "../../features/userSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const ref = useRef();
  const navigate = useNavigate();

  // const options = [
  //   { value: 'profile', label: 'Profile' },
  //   { value: 'settings', label: 'Settings' },
  //   { value: 'logout', label: 'Logout' }
  // ];

  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    if (!user) navigate('/login');
  };

  // const selectOption = (option) => {
  //   setSelectedOption(option);
  //   setIsOpen(false);
  // };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  const redirectToDashboard = () => {
    navigate('/admin')
  }

  const redirectToCreateProduct = () => {
    navigate('/new-product')
  }

  return (
    <nav className="bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="hidden md:block w-30">
            <div className="flex items-baseline">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-lg font-bold text-gray-900 transition duration-700 ease-in-out hover:text-gray-500"
              >
                HOME
              </Link>
              <Link
                to="/about"
                className="ml-4 px-3 py-2 rounded-md text-lg font-bold text-gray-900 transition duration-700 ease-in-out hover:text-gray-500"
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                className="ml-4 px-3 py-2 rounded-md text-lg font-bold text-gray-900 transition duration-700 ease-in-out hover:text-gray-500"
              >
                CONTACT
              </Link>
            </div>
          </div>
          <div className="flex items-center select-none pointer-events-none">
            <img src={logoImg} width={100} />
          </div>
          <div className="hidden md:block w-30">
            <div className="ml-10 flex items-baseline">
              <Link
                to="/search"
                className="px-3 py-2 rounded-md text-md font-semibold text-gray-900 transition duration-700 ease-in-out hover:text-gray-500"
              >
                <BiSearch size={18} />
              </Link>
              {/* <Link
                to="/login"
                className="ml-4 px-3 py-2 rounded-md text-md font-semibold text-gray-900 transition duration-700 ease-in-out hover:text-gray-500"
              >
                <BiUser size={18} onClick={handleOnAccountUser} />
              </Link> */}
              <div className="relative ml-3 top-[-6px]" ref={ref}>
                <button
                  type="button"
                  className="inline-flex items-center justify-between text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={toggleDropdown}
                >
                  {/* {selectedOption.label} */}
                  {/* {user?.name.split(' ')[0]} */}
                  <BiUser size={18} />
                  {/* <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.707 14.293a1 1 0 01-1.414 0L5.586 9.172a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
                      clipRule="evenodd"
                    />
                  </svg> */}
                </button>
                {
                  user && <div className={`absolute z-10 right-1 w-36 ${isOpen ? 'block' : 'hidden'} border border-gray-200 rounded-md shadow-md`}>
                    {/* {options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => selectOption(option)}
                    >
                      {option.label}
                    </button>
                  ))} */}

                    {
                      user?.isAdmin && (
                        <>
                          <button
                            key="dashboard"
                            type="button"
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={redirectToDashboard}
                          >
                            Dashboard
                          </button>
                          <button
                            key="create-product"
                            type="button"
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={redirectToCreateProduct}
                          >
                            Create Product
                          </button>
                        </>
                      )
                    }
                    <button
                      key="profile"
                      type="button"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => { }}
                    >
                      Profile
                    </button>
                    <button
                      key="settings"
                      type="button"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => { }}
                    >
                      Settings
                    </button>
                    <button
                      key="logout"
                      type="button"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                }
              </div>
              <Link
                to="/cart"
                className="ml-4 px-3 py-2 rounded-md text-md font-semibold text-gray-900 transition duration-700 ease-in-out hover:text-gray-500"
              >
                <BiShoppingBag size={18} />
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
          >
            Contact
          </Link>
        </div>
      </div> */}
    </nav>
  )
}

export default NavBar