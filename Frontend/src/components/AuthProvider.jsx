import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const user = localStorage.getItem('user');
        try {
            return accessToken && refreshToken && user ? { user: JSON.parse(user), accessToken, refreshToken } : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    });

    const login = (user, accessToken, refreshToken) => {
        setAuthState({ user, accessToken, refreshToken });
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = async () => {
        if (!authState || !authState.accessToken) {
            console.warn('No user is currently logged in.');
            return;
        }

        try {
            await axios.post('http://localhost:8000/api/v1/users/logout', {}, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            setAuthState(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Error during logout: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
