import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import axios from 'axios';

const AllCourses = () => {
    const [courses, setCourse] = useState([]);
    useEffect(() => {
      const getCourse = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/v1/course");
          console.log(res.data.data.course);
          setCourse(res.data.data.course);
        } catch (error) {
          console.log(error);
        }
      };
      getCourse();
    }, []);
    return (
        <div className="bg-gray-100 py-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-8">All Courses</h2>
                <div className="flex flex-wrap justify-center">
                    {courses.map((course) => (
                        <CourseCard
                            key={course._id}
                            title={course.title}
                            description={course.description}
                            courseId={course._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllCourses;
