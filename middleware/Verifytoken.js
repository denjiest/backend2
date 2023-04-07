import jwt from "jsonwebtoken"
import User from "../model/UserModel.js"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config();

export const VerifyToken = async(req,res,next)=>{
    try{
        const token = req.header("auth-token")
        if(!token) return res.status(400).json({message:"Header untuk token masih kosong !"})
        const token_decode = jwt.decode(token)
        const token_email = token_decode.email
        const readfile = fs.readFileSync("./token/"+token_email+".json","utf-8",(err,data)=>{
        })
        const readfile_parse = JSON.parse(readfile)

        if(token === readfile_parse){
            const verifikasi = jwt.verify(token, process.env.TOKEN_RAHASIA)
            if(!verifikasi) return res.status(400).json({message:"Akses ditolak, silahkan login terlebih dahulu"})
             req.user = verifikasi
             next()
        }else{
            res.status(400).json({message:"Token tidak valid, silahkan login ulang"})
        }
    }catch(error){
        if(error.message === "jwt expired"){
            res.status(400).json({message:"masa berlaku token sudah habis, silahkan login ulang"})
        }
    }
}