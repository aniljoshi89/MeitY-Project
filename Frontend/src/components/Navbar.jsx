import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from './AuthProvider';
import logo from '../images/logo.jpg';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const { authState, logout } = useAuth();
    const navigate = useNavigate(); // Create navigate instance

    const handleLogout = async () => {
        setIsProfileDropdownOpen(false); 
        await logout(); 
        setIsMenuOpen(false); 
        alert('Successfully logged out.');
        navigate('/'); // Navigate to home page after logout
    };

    return (
        <>
            <nav className='w-full h-16 flex justify-between px-4 items-center bg-white shadow-md'>
                <div className='flex items-center'>
                    <img src={logo} className="w-20 h-auto" alt="Logo" />
                    <div className='font-bold text-indigo-600 ml-2'>Edu-Platform</div>
                </div>
                <div className='hidden md:flex flex-grow mx-4'>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className='hidden md:flex'>
                    <Link to="/" className='mx-[10px] hover:text-indigo-500 cursor-pointer'>Home</Link>
                    <Link to="/about" className='mx-[10px] hover:text-indigo-500 cursor-pointer'>About</Link>
                    <Link to="/contact" className='mx-[10px] hover:text-indigo-500 cursor-pointer'>Contact</Link>
                </div>
                <div className='hidden md:flex items-center'>
                    {authState ? (
                        <div className='relative'>
                            <img
                                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                alt="User"
                                className='w-8 h-8 rounded-full mx-2 cursor-pointer'
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            />
                            {isProfileDropdownOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50'>
                                    <div className='px-4 py-2 text-gray-700'>{authState.user.email}</div>
                                    <Link to="/update-username" className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Update Username</Link>
                                    <Link to="/change-password" className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Change Password</Link>
                                    <Link to="/enrolled-courses" className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Enrolled Courses</Link>
                                    <button
                                        onClick={handleLogout} // Use the handleLogout function
                                        className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/signup"><button className='mx-2 text-white rounded-md bg-blue-500 px-3 py-2 hover:bg-blue-600'>Sign up</button></Link>
                            <Link to="/login"><button className='mx-2 rounded-md px-3 py-2 bg-blue-500 text-white hover:bg-blue-600'>Sign in</button></Link>
                        </>
                    )}
                </div>
                <div className='md:hidden flex items-center'>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-gray-700 focus:outline-none'>
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            {isMenuOpen ? (
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                            ) : (
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className='md:hidden bg-white shadow-md z-50'>
                    <ul className='flex flex-col items-center'>
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className='py-2 hover:text-indigo-500 cursor-pointer'>Home</Link>
                        <Link to="/about" onClick={() => setIsMenuOpen(false)} className='py-2 hover:text-indigo-500 cursor-pointer'>About</Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className='py-2 hover:text-indigo-500 cursor-pointer'>Contact</Link>
                        {authState ? (
                            <>
                                <img
                                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                    alt="User"
                                    className='w-8 h-8 rounded-full my-2 cursor-pointer'
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                />
                                {isProfileDropdownOpen && (
                                    <div className='bg-white shadow-md w-full z-50'>
                                        <ul className='flex flex-col items-center'>
                                            <div className='px-4 py-2 text-gray-700'>{authState.user.email}</div>
                                            <Link to="/update-username" className='block px-4 py-2 text-gray-700 hover:bg-gray-100' onClick={() => setIsProfileDropdownOpen(false)}>Update Username</Link>
                                            <Link to="/change-password" className='block px-4 py-2 text-gray-700 hover:bg-gray-100' onClick={() => setIsProfileDropdownOpen(false)}>Change Password</Link>
                                            <Link to="/enrolled-courses" className='block px-4 py-2 text-gray-700 hover:bg-gray-100' onClick={() => setIsProfileDropdownOpen(false)}>Enrolled Courses</Link>
                                            <button
                                                onClick={handleLogout} // Use the handleLogout function
                                                className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                                            >
                                                Logout
                                            </button>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className='py-2'><button className='text-white rounded-md bg-blue-500 px-3 py-2 w-full'>Sign up</button></Link>
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className='py-2'><button className='rounded-md px-3 py-2 hover:bg-blue-500 w-full'>Sign in</button></Link>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
}

export default Navbar;
