import User from "../model/UserModel.js"

export const getAllAkun = async(req,res)=>{
    try{
        const cari = await User.findAll({

        })
        res.status(200).json({message:"berhasil", data:cari})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

export const createAkun = async(req,res)=>{
    try{
        const buat = await User.create({
            username :req.body.username,
            email:req.body.email
        })
        res.status(200).json({message:"berhasil membuat akun"})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}