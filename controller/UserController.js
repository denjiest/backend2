import User from "../model/UserModel.js"
import argon2 from "argon2"

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

        res.status(200).json({message:"berhasil membuat akun", data:showdata})
    }catch(error){
        if (error.name === 'SequelizeUniqueConstraintError') {
                const errors = error.errors
         
               const errorList = errors.map(e => {
                 let obj = e.message
                 return obj;
               })
               
               return res.status(400).json({
                 message: errorList.toString()
               })
             }
        // res.status(400).json({message:error.message})
    }
}