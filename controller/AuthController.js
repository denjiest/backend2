import User from "../model/UserModel.js"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const LoginUser = async (req,res)=>{
    try{
        const user = await User.findOne({
            where:{
                email:req.body.email
            }
        })
        if(!user) return res.status(400).json({message:"User tidak ditemukan"})
        const MatchPassword = await argon2.verify(user.password,  req.body.password)
        if(!MatchPassword) return res.status(400).json({message:"Password yang dimasukan salah"})
        if(user && MatchPassword === true){
            const token = jwt.sign({id:user.id, username:user.username, email:user.email}, process.env.TOKEN_RAHASIA, {expiresIn:"60m"})
            const username = user.username
            const email = user.email
            res.status(200).json({message:"Berhasil Login", data:{username,email,token}})
        }
    }catch(error){
        res.status(400).json({message:error.message})
    }
}