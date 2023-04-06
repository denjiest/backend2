import {
    getAllAkun,
    createAkun,
    updateAkun
} from "../controller/UserController.js"
import { VerifyToken } from "../middleware/Verifytoken.js"
import express from "express"

const router = express.Router()

router.get('/user',VerifyToken, getAllAkun)
router.post('/user', createAkun)
router.put('/user/update_akun', VerifyToken,updateAkun)

export default router
