import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const courses = [
    {
        title: "Course 1: Introduction to Programming",
        description: "Learn the basics of programming using Python.",
        image: "https://via.placeholder.com/600x300?text=Course+1"
    },
    {
        title: "Course 2: Advanced JavaScript",
        description: "Deep dive into JavaScript and learn advanced concepts.",
        image: "https://via.placeholder.com/600x300?text=Course+2"
    },
    {
        title: "Course 3: Web Development Basics",
        description: "Understand the fundamentals of web development.",
        image: "https://via.placeholder.com/600x300?text=Course+3"
    }
];

const CourseBanner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="mb-8">
            <Slider {...settings}>
                {courses.map((course, index) => (
                    <div key={index} className="relative">
                        <img src={course.image} alt={course.title} className="w-full h-80 object-cover" />
                        <div className="absolute bottom-0 bg-opacity-50 bg-gray-800 text-white p-4 w-full">
                            <h3 className="text-2xl font-bold">{course.title}</h3>
                            <p>{course.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CourseBanner;
