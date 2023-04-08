import User from "../models/UserModel.js"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

export const getAllAkun = async(req,res)=>{
    try{
        const cari = await User.findAll({
            attributes:{exclude:['password']}
        })
        res.status(200).json({message:"berhasil", data:cari})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

export const createAkun = async(req,res)=>{
    if(req.body.name === "" || req.body.name === null) 
    return res.status(400).json({message:"Nama harus diisi"})
    if(req.body.username === "" || req.body.username === null) 
    return res.status(400).json({message:"Username harus diisi"})
    if(req.body.email === "" || req.body.email === null)
    return res.status(400).json({message:"Email harus diisi"})
    if(req.body.password === "" || req.body.password === null)
    return res.status(400).json({message:"password harus diisi"}) 
    try{
        const {confPassword} = req.body
        if(confPassword === null) return res.status(400).json({message:"Confirm Password harus diisi"})
        if(req.body.password !== confPassword) return res.status(400).json({message:"Password dan Confirm Password tidak sama"})
        const hashpassword = await argon2.hash(req.body.password)
        
        const buat = await User.create({
            name:req.body.name,
            username :req.body.username,
            email:req.body.email,
            password:hashpassword
        })

        const showdata = await User.findOne({
            where:{
                email:req.body.email
            },
            attributes:{exclude:['password']}
        })
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS,
            }
          });
      
          const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject:"Register Berhasil",
            // text:"Register Berhasil akun yang bernama "+req.body.name+"",
            html: '<h1>Halo!</h1><p>Selamat Registrasi atas nama <b>'+req.body.name+'</b> Berhasil, anjay lu bro!.</p><p>Semoga bermanfaat!</p><p>Salam <br>Jimbroy</p>'
          };
          
      
          transporter.sendMail(mailOptions);

        res.status(200).json({message:"berhasil membuat akun", data:showdata})

    //Handling Error 
    }catch(error){
        if (error.name === 'SequelizeUniqueConstraintError') {
                const errors = error.errors
         
               const errorList = errors.map(e => {
                const coba = e.message
                // return coba;
                const error_name = "Nama Sudah ada"
                const error_username = "Username sudah ada"
                const error_email = "Email sudah ada"
                if(coba === "username must be unique")
                 return error_username;
                else if (coba === "email must be unique")
                return error_email;
                else if( coba === "name must be unique")
                return error_name;
               })
               
               return res.status(400).json({
                 message: errorList.toString()
               })
             }else{
                res.status(400).json({message:error.message})
             }
    }
}

export const updateAkun = async(req,res)=>{
    try{
        const token = req.header("auth-token")
        const token_decode = jwt.decode(token)
        const token_email = token_decode.email

        const user = await User.findOne({
            where:{
                email:token_email
            }
        })

        let hashPassword;
        if(req.body.password === "" || req.body.password === null){
            hashPassword = user.password
        }else{
            hashPassword = await argon2.hash(req.body.password);
        }

        if(!req.file){
        const update = await User.update({
            name:req.body.name,
            username:req.body.username,
            password:hashPassword
        },{
            where:{
                email:token_email
            }
        })
        const cari = await User.findOne({
            where:{
                email:token_email
            }
        })
        res.status(200).json({message:"Berhasil Update Akun", data:cari})
    }else{
        const update = await User.update({
            name:req.body.name,
            username:req.body.username,
            password:hashPassword,
            image: req.file.path.replace("\\","/")
        },{
            where:{
                email:token_email
            }
        })
        const cari = await User.findOne({
            where:{
                email:token_email
            }
        })
        res.status(200).json({message:"Berhasil Update Akun", data:cari})
    }
    }catch(error){
        if(error.name === "SequelizeUniqueConstraintError"){
            const errors = error.errors
            res.status(400).json({message:errors})
        }else{
            res.status(400).json({message:error.message})
        }
    }
}