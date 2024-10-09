// controllers/course.controller.js
import { Course } from '../models/course.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get all courses
const getCourse=asyncHandler(async(req,res)=>{
    const course=await Course.find();
    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {course},
            "course fetched successfully"
        )
    );

    if(!course){
        throw new ApiError(500,"course not found");
    }
})

// Add a new course
const addCourse = asyncHandler(async (req, res) => {
    const { title, description, courseDuration, startDate, endDate } = req.body;
    const newCourse = new Course({ title, description, courseDuration, startDate, endDate });
    await newCourse.save();
    res.status(201).json(new ApiResponse(201, newCourse));
});

// Get course by ID
const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.courseId).populate('videos');
    if (!course) {
        throw new ApiError(404, 'Course not found');
    }
    res.json(new ApiResponse(200, course));
});

export {
    getCourse,
    addCourse,
    getCourseById,
};
