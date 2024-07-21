import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/login', {
                email: formData.email,
                password: formData.password
            });
            const { user, token } = response.data.data;
            console.log(response);
            login(user, token);
            alert('Login successful!');
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error during login: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
                </form>
                <div className="text-center mt-4">
                    <Link 
                        to="/forgot-password" 
                        className="text-blue-500 hover:underline block mt-2"
                    >
                        Forgot Password?
                    </Link>
                    <Link 
                        to="/signup" 
                        className="text-blue-500 hover:underline block mt-2"
                    >
                        New User? Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
