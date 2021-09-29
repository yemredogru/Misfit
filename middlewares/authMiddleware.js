const User=require('../models/User');

module.exports=(roles)=>{
    return async(req,res,next)=>{
        const user= await User.findOne({_id:req.session.userID});
        const userRole=user.role;
        if(roles.includes(userRole)){
            next();
        }
        else{
            res.status(400).json({msg:"You dont have permission"})
        }
    }
}