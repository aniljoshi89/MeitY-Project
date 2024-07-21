import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';

const courses = [
    {
        id: 1,
        title: "Course 1: Introduction to Programming",
        description: "Learn the basics of programming using Python."
    },
    {
        id: 2,
        title: "Course 2: Advanced JavaScript",
        description: "Deep dive into JavaScript and learn advanced concepts."
    },
    {
        id: 3,
        title: "Course 3: Web Development Basics",
        description: "Understand the fundamentals of web development."
    }
    // Add more courses as needed
];

const CourseCatalog = () => {
    const navigate = useNavigate();

    const handleSeeMore = () => {
        navigate('/all-courses');
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-8">Course Catalog</h2>
                <div className="flex flex-wrap justify-center">
                    {courses.slice(0, 3).map((course) => (
                        <CourseCard
                            key={course.id}
                            title={course.title}
                            description={course.description}
                            courseId={course.id}
                        />
                    ))}
                </div>
                <button
                    onClick={handleSeeMore}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    See More
                </button>
            </div>
        </div>
    );
};

export default CourseCatalog;
