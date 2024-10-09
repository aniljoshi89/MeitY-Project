import { registerUser, loginUser, logoutUser, refreshAccessToken, changeUserPassword, getUser } from "../controllers/user.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/signUp").post(upload.none(),registerUser);

router.route("/login").post(upload.none(),loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/change-password").post(verifyJWT, changeUserPassword)
router.route("/get-users").get(getUser);

export default router;
