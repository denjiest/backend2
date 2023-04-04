import {
    getAllAkun,
    createAkun
} from "../controller/UserController.js"
import express from "express"

const router = express.Router()

router.get('/user', getAllAkun)
router.post('/user', createAkun)

export default router
