import jwt from "jsonwebtoken"
import User from "../model/UserModel.js"
import dotenv from "dotenv"

dotenv.config();

export const VerifyToken = async(req,res,next)=>{
    try{
        const token = req.header("auth-token")
        if(!token) return res.status(400).json({message:"header masih koosng"})

    const verifikasi = jwt.verify(token, process.env.TOKEN_RAHASIA)
    if(!verifikasi) return res.status(400).json({message:"Akses ditolak, silahkan login terlebih dahulu"})

    req.user = verifikasi

    next()
    }catch(error){
        res.status(400).json({message:error.message})
    }
}