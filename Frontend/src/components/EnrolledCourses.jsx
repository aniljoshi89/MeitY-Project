import React from 'react';
import CourseCard from './CourseCard';

// Hardcoded enrolled courses for demonstration
const enrolledCourses = [
    {
        id: 1,
        title: "Introduction to Programming",
        description: "Learn the basics of programming using Python."
    },
    {
        id: 2,
        title: "Advanced JavaScript",
        description: "Deep dive into JavaScript and learn advanced concepts."
    },
    {
        id: 3,
        title: "Web Development Basics",
        description: "Understand the fundamentals of web development."
    }
];

const EnrolledCourses = () => {
    return (
        <div className="bg-gray-100 py-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-8">Enrolled Courses</h2>
                <div className="flex flex-wrap justify-center">
                    {enrolledCourses.length > 0 ? (
                        enrolledCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                title={course.title}
                                description={course.description}
                                courseId={course.id}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600">You are not enrolled in any courses yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnrolledCourses;