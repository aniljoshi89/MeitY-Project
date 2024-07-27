import { asyncHandler } from "../utils/asyncHandler.js";

const enrollUser = asyncHandler(async(req, res)=>{
    const enrollEntry={}
    return res.status(201).json(
        new ApiResponse(200,enrollEntry)
    )
})

export {enrollUser};