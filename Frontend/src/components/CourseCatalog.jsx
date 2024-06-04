import React from 'react';
import CourseCard from './CourseCard';

const courses = [
    {
        title: "Course 1: Introduction to Programming",
        description: "Learn the basics of programming using Python."
    },
    {
        title: "Course 2: Advanced JavaScript",
        description: "Deep dive into JavaScript and learn advanced concepts."
    },
    {
        title: "Course 3: Web Development Basics",
        description: "Understand the fundamentals of web development."
    }
];

const CourseCatalog = () => {
    return (
        <div className="bg-gray-100 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Course Catalog</h2>
            <div className="flex flex-wrap justify-center">
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        title={course.title}
                        description={course.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseCatalog;
