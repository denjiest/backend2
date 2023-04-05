import {LoginUser} from "../controller/AuthController.js"
import express from "express"

const router = express.Router();

router.post('/login', LoginUser)

export default router