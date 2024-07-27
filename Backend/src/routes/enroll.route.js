import { Router } from 'express';
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { enrollUser } from '../controllers/enroll.controller.js';

const router = Router();

router.route("/enroll").post(verifyJWT, enrollUser);

export default router