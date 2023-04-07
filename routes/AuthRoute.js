import {LoginUser, Me} from "../controller/AuthController.js"
import express from "express"

import { VerifyToken } from "../middleware/Verifytoken.js";

const router = express.Router();

router.post('/login', LoginUser)
router.get('/me',VerifyToken, Me)

export default router