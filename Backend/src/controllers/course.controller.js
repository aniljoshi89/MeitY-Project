import { Course} from "../models/Course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

export {getCourse};