import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import axios from 'axios';

const CourseCatalog = () => {
    const [courses, setCourse] = useState([]);
    useEffect(() => {
      const getCourse = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/v1/course");
          setCourse(res.data.data.course);
        } catch (error) {
          console.log(error);
        }
      };
      getCourse();
    }, []);

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
                            key={course._id}
                            title={course.title}
                            description={course.description}
                            courseId={course._id}
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
