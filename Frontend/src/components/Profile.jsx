import React from 'react';
import { useAuth } from './AuthProvider';

const Profile = () => {
    const { authState } = useAuth();

    if (!authState) {
        return null;
    }

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p>Email: {authState.user.email}</p>
            {/* Add more profile details here */}
        </div>
    );
};

export default Profile;
