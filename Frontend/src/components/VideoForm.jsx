// components/VideoForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const VideoForm = ({ courseId, onVideoAdded }) => {
    const { authState } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [error, setError] = useState('');

    const handleAddVideo = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videoFile', videoFile);

        try {
            const response = await axios.post(`/api/admin/courses/${courseId}/videos`, formData, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            onVideoAdded(response.data);
            setTitle('');
            setDescription('');
            setVideoFile(null);
            setError('');
        } catch (error) {
            console.error('Error adding video:', error);
            setError('Failed to add video. Please try again.');
        }
    };

    return (
        <div className="video-form bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Video to Course</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
                type="text"
                placeholder="Video Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            ></textarea>
            <input
                type="file"
                accept="video/*"
                onChange={e => setVideoFile(e.target.files[0])}
                className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            />
            <div className="flex justify-center">
                <button onClick={handleAddVideo} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Add Video</button>
            </div>
        </div>
    );
};

export default VideoForm;
