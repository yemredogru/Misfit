const User=require('../models/User');

module.exports=async(req,res,next)=>{
    if(req.session.userID===undefined ||null || ""){
        res.redirect('/');
    }
    else{
            const user=User.find({_id:req.session.userID});
            if(user){
                next();
            }
            else{
                res.redirect('/');
            }
        };
}