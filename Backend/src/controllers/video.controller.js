// controllers/video.controller.js
import { Video } from '../models/video.model.js';
import { Course } from '../models/course.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Add a video to a course
const addVideoToCourse = asyncHandler(async (req, res) => {
    const { title, description, duration } = req.body;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, 'Course not found');
    }

    const videoFile = req.file;
    const uploadResult = await uploadOnCloudinary(videoFile.path);

    if (!uploadResult) {
        throw new ApiError(500, 'Failed to upload video');
    }

    const newVideo = new Video({
        title,
        videoURL: uploadResult.url,
        description,
        duration,
        views: 0,
    });

    await newVideo.save();
    course.videos.push(newVideo._id);
    await course.save();

    res.status(201).json(new ApiResponse(201, newVideo));
});

export {
    addVideoToCourse,
};
