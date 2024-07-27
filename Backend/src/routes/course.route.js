import {Router} from "express";
import { getCourse } from "../controllers/course.controller.js";

const router=Router();

router.route("/").get(getCourse);

export default router;