import User from "../models/UserModel.js"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import fs from "fs"
import db from "../config/Database.js"

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
            const alamat_email = user.email
            const token = jwt.sign({id:user.id, username:user.username, email:user.email}, process.env.TOKEN_RAHASIA, {expiresIn:"60m"})
            const token_decode = jwt.decode(token)
            const token_stringify = JSON.stringify(token)

           fs.writeFile("./token/"+alamat_email+".json",token_stringify,(err)=>{
                if(err)
                throw err
            })

            const name = user.name
            const username = user.username
            const email = user.email
            const waktu = Date.now()
           res.status(200).json({message:"Berhasil Login", data:{name,username,email,token,waktu}})
        }
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

export const Me = async(req,res)=>{
    try{
        const token = req.header("auth-token")
        const token_decode = jwt.decode(token)
        const token_email = token_decode.email

        const cari = await User.findOne({
            where:{
                email : token_email
            },
            attributes:{
                exclude:['password'],
                include:[
                    [db.fn('date_format', db.fn('convert_tz', db.col('createdAt'), '+00:00', '+07:00' ),"%d %M %Y %H:%i:%s"), 'createdAt'],  
                    [db.fn('date_format', db.fn('convert_tz', db.col('updatedAt'), '+00:00', '+07:00'), "%d %M %Y %H:%i:%s"), 'updatedAt'],  
                ]
            }
        })
        res.status(200).json({message:"Berhasil Mencari", data:cari})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}