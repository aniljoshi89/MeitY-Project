import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VideoCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { video } = location.state || {};

    if (!video) {
        return <div className="text-white">No video data available.</div>;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-full w-full relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => navigate(-1)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <h2 className="text-2xl font-bold mb-4">{video.title}</h2>
                <p className="text-gray-700 mb-4">{video.description}</p>
                <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
                    <video className="absolute inset-0 w-full h-full" controls>
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
