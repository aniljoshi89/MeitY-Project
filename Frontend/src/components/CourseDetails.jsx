import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const courseData = {
    "66a4b320f0e4f58bc53b3aae": {
        title: "Introduction to Programming",
        banner: "https://via.placeholder.com/1200x400?text=Programming",
        description: "Learn the basics of programming using Python. This course is designed to introduce you to fundamental programming concepts, including variables, control structures, functions, and more.",
        summary: "This course covers fundamental programming concepts using Python. It is suitable for beginners who want to get started with programming.",
        duration: "6 weeks",
        startDate: "2024-08-01",
        endDate: "2024-09-12",
        lectures: [
            { id: 1, title: "Introduction to Python", url: "https://www.example.com/video1.mp4", description: "Learn the basics of Python programming.", thumbnail: "https://via.placeholder.com/640x360?text=Video+1" },
            { id: 2, title: "Variables and Data Types", url: "https://www.example.com/video2.mp4", description: "Understand Python variables and data types.", thumbnail: "https://via.placeholder.com/640x360?text=Video+2" },
            { id: 3, title: "Control Structures", url: "https://www.example.com/video3.mp4", description: "Learn about loops and conditionals in Python.", thumbnail: "https://via.placeholder.com/640x360?text=Video+3" },
            { id: 4, title: "Functions", url: "https://www.example.com/video4.mp4", description: "Dive into Python functions and their usage.", thumbnail: "https://via.placeholder.com/640x360?text=Video+4" },
            { id: 5, title: "Modules and Packages", url: "https://www.example.com/video5.mp4", description: "Learn about modules and packages in Python.", thumbnail: "https://via.placeholder.com/640x360?text=Video+5" },
            { id: 6, title: "File Handling", url: "https://www.example.com/video6.mp4", description: "Understand how to handle files in Python.", thumbnail: "https://via.placeholder.com/640x360?text=Video+6" }
        ]
    },
    
    "66a4b320f0e4f58bc53b3aaf": {
        title: "Advanced JavaScript",
        banner: "https://via.placeholder.com/1200x400?text=Programming",
        description: "Deep dive into JavaScript with a focus on advanced topics such as asynchronous programming, ES6 features, and advanced DOM manipulation. This course is ideal for those with a basic understanding of JavaScript who want to enhance their skills.",
        summary: "This course explores advanced JavaScript concepts including asynchronous programming, promises, and ES6 features. It is suited for intermediate developers.",
        duration: "8 weeks",
        startDate: "2024-09-01",
        endDate: "2024-10-26",
        lectures: [
            { id: 7, title: "Advanced JavaScript", url: "https://www.example.com/video7.mp4", thumbnail: "https://via.placeholder.com/640x360" },
            { id: 8, title: "JavaScript and the DOM", url: "https://www.example.com/video8.mp4", thumbnail: "https://via.placeholder.com/640x360" },
            { id: 9, title: "Event Handling", url: "https://www.example.com/video9.mp4", thumbnail: "https://via.placeholder.com/640x360" },
            { id: 10, title: "Asynchronous JavaScript", url: "https://www.example.com/video10.mp4", thumbnail: "https://via.placeholder.com/640x360" },
            { id: 11, title: "JavaScript Promises", url: "https://www.example.com/video11.mp4", thumbnail: "https://via.placeholder.com/640x360" },
            { id: 12, title: "ES6 Features", url: "https://www.example.com/video12.mp4", thumbnail: "https://via.placeholder.com/640x360" }
        ]
    },
    "66a4b320f0e4f58bc53b3ab0": {
        title: "Web Development Basics",
        banner: "https://via.placeholder.com/1200x400?text=Programming",
        description: "This course introduces HTML, CSS, and basic JavaScript concepts. Learn how to build responsive websites, apply modern web design practices, and understand fundamental web development technologies.",
        summary: "An introductory course to web development covering HTML, CSS, and JavaScript. Ideal for beginners looking to start their journey in web development.",
        duration: "5 weeks",
        startDate: "2024-07-15",
        endDate: "2024-08-18",
        lectures: [
            { id: 13, title: "HTML Basics", url: "https://www.example.com/video13.mp4", thumbnail: "https://via.placeholder.com/640x360" },
            { id: 14, title: "CSS Basics", url: "https://res.cloudinary.com/dqjsecd29/video/upload/v1722279835/2278095-hd_1920_1080_30fps_xzyukt.mp4", thumbnail: "https://via.placeholder.com/640x360" },
            { id: 15, title: "Responsive Design", url: "https://www.example.com/video15.mp4", thumbnail: "https://via.placeholder.com/640x360" },
            { id: 16, title: "Flexbox and Grid", url: "https://www.example.com/video16.mp4", thumbnail: "https://via.placeholder.com/640x360" },
            { id: 17, title: "JavaScript in Web Development", url: "https://www.example.com/video17.mp4", thumbnail: "https://via.placeholder.com/640x360" },
            { id: 18, title: "Introduction to React", url: "https://www.example.com/video18.mp4", thumbnail: "https://via.placeholder.com/640x360" }
        ]
    }
};

const CourseDetail = () => {
    const { courseId } = useParams();
    const course = courseData[courseId] || {};
    const navigate = useNavigate();
    const [isEnrolled, setIsEnrolled] = useState(false); // State to manage enrollment status

    const handleLectureClick = (video) => {
        navigate(`/video/${video.id}`, { state: { video } });
    };

    const handleEnroll = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/enroll`, { courseId });
            if (response.status === 200) {
                setIsEnrolled(true);
                alert('You have successfully enrolled in the course!');
            }
        } catch (error) {
            console.error('Error enrolling in course:', error);
            alert('There was an error enrolling in the course. Please try again later.');
        }
    };

    return (
        <div className="bg-gray-100 py-8 px-4">
            <div className="relative">
                <img
                    src={course.banner}
                    alt={`${course.title} Banner`}
                    className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 rounded-t-lg"></div>
                <div className="relative max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-[-4rem]">
                    <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    <div className="flex flex-col sm:flex-row mb-6">
                        <div className="flex-1 mb-4 sm:mb-0">
                            <h4 className="text-lg font-semibold">Course Duration:</h4>
                            <p className="text-gray-600">{course.duration}</p>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold">Start Date:</h4>
                            <p className="text-gray-600">{new Date(course.startDate).toLocaleDateString()}</p>
                            <h4 className="text-lg font-semibold mt-2">End Date:</h4>
                            <p className="text-gray-600">{new Date(course.endDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-6">{course.summary}</p>
                    {!isEnrolled && (
                        <button
                            onClick={handleEnroll}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-blue-600 transition-colors"
                        >
                            Enroll in Course
                        </button>
                    )}
                    <div className="flex flex-col">
                        {course.lectures && course.lectures.map((lecture) => (
                            <div
                                key={lecture.id}
                                className="mb-4 cursor-pointer p-4 border-b border-gray-200 transition-colors duration-300 hover:bg-blue-600 hover:text-white"
                                onClick={() => handleLectureClick(lecture)}
                            >
                                <h3 className="text-xl font-semibold">{lecture.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
