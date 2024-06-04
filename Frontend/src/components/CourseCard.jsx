import React from 'react';

const CourseCard = ({ title, description }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 m-4 max-w-sm mx-auto">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Learn More
            </button>
        </div>
    );
};

export default CourseCard;
