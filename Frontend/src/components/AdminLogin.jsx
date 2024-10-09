import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/login', { email, password });

            const data = response.data.data;

            // Check if the data object and required properties exist
            if (data && data.user && data.accessToken && data.refreshToken) {
                if (data.user.isAdmin === true) {
                    // Save tokens and user info in local storage or context
                    login(data.user, data.accessToken);

                    console.log('Stored user:', localStorage.getItem('user'));

                    alert('Admin login successful!');
                    // Navigate to admin dashboard
                    navigate('/admin');
                } else {
                    setError('Access denied. Admins only.');
                }
            } else {
                setError('Unexpected response format from the server.');
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            setError('Invalid email or password.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link
                        to="/login"
                        className="text-blue-500 hover:underline block mt-2"
                    >
                        Switch to User Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
