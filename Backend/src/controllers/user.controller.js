import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler (async(req,res)=>{
    //getting user details from frontend
    const { username, email, password} = req.body;

    //validation checking
    if([username, email, password].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }

    // Check if the user already exists
    const existedUser = await User.findOne({
        $or: [{ username: username.toLowerCase() }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    //creating new user entry in dB
    const user = await User.create({
        username,
        email, 
        password,
        username: username.toLowerCase()
    })
    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
   // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    // return res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})
export {registerUser};





