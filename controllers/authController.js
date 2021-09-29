const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const nodemailer=require('../configs/nodemailer.config');
const config=require('../configs/auth.config')

exports.createUser=async(req,res,next)=>{
        try{
            console.log(req.body)
            const token=jwt.sign({email:req.body.email},config.secret);
            let uploadImage;
        if(req.files===null || undefined){
            uploadImage='/default/default-avatar.jpg';
            const user = await User.create({
                ...req.body,
                confirmationCode:token,
                image:uploadImage
            })
            nodemailer.sendConfirmationEmail(
                user.name,
                user.email,
                user.confirmationCode
            )
            res.status(201).send({message:`User was created successfully.A verification link has been sent to ${req.body.email}`});

        }
        else{
            uploadImage=req.files.image;
            let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;
            uploadImage.mv(uploadPath,async()=>{
            const user = await User.create({
                ...req.body,
                confirmationCode:token,
                image:'/uploads/'+uploadImage.name,
               })
               nodemailer.sendConfirmationEmail(
                user.name,
                user.email,
                user.confirmationCode
            )
            })
            
            
        res.status(200).redirect('/');
        }
    }
        catch(err) {
            throw err;
        }
}

exports.loginUser=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,data)=>{
                if(err) throw err;
                if(data){
                    req.session.userID=user._id;
                    return res.status(200).json({data:user});
                }
                else{
                    res.status(400).json({msg:"Invalid credencial"})
                }
            })
        }
        
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.logoutUser=async(req,res,next)=>{
    req.session.destroy();
    res.status(201).json({msg:"logout successfully"})
}

exports.confirmUser=async(req,res,next)=>{
    User.findOne({confirmationCode:req.params.confirmationCode})
    .then((user)=>{
        if(!user){
            return res.status(404).send({ message: "User Not found." });
        }
        user.status="active";
        user.save();
        return res.status(200).send({message:"Confirmation successful"});
    })
}

exports.informationUser=async(req,res,next)=>{
    const user = await User.find({_id:req.session.userID});
    if(!user){
        return res.status(404).send({ message: "User Not found." });
    }
    return res.status(200).render('information',{
        information:user
    })

}