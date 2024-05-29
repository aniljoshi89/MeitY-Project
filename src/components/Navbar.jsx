import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <div className='hidden md:flex'>
                    <Link to="/signup"><button className='mx-2 text-white rounded-md bg-blue-500 px-3 py-2 hover:bg-blue-600'>Sign up</button></Link>
                    <Link to="/login"><button className='mx-2 rounded-md px-3 py-2 bg-blue-500 text-white hover:bg-blue-600'>Sign in</button></Link>
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
                <div className='md:hidden bg-white shadow-md'>
                    <ul className='flex flex-col items-center'>
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className='py-2 hover:text-indigo-500 cursor-pointer'>Home</Link>
                        <Link to="/about" onClick={() => setIsMenuOpen(false)} className='py-2 hover:text-indigo-500 cursor-pointer'>About</Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className='py-2 hover:text-indigo-500 cursor-pointer'>Contact</Link>
                        <Link to="/signup" onClick={() => setIsMenuOpen(false)} className='py-2'><button className='text-white rounded-md bg-blue-500 px-3 py-2 w-full'>Sign up</button></Link>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className='py-2'><button className='rounded-md px-3 py-2 hover:bg-blue-500 w-full'>Sign in</button></Link>
                    </ul>
                </div>
            )}
        </>
    );
}

export default Navbar;
