import { registerUser, loginUser, refreshAccessToken } from "../controllers/user.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/signUp").post(upload.none(),registerUser);

router.route("/login").post(upload.none(),loginUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
