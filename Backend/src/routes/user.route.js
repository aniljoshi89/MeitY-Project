import { registerUser } from "../controllers/user.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router();

router.route("/register").post(upload.none(),registerUser)


export default router;
