const Training=require('../models/Training');
const User=require('../models/User');

exports.createTraining=async(req,res,next)=>{
    try{
        const training= await Training.create({
            name:req.body.name,
            trainingDay:(req.body.trainingDay),
            user:req.session.userID,
        });
        res.status(201).json(training)
    }
    catch(error){
        res.status(400).send(error);
    }
}

exports.getAllTrainings=async(req,res,next)=>{
    try{
        const trainings=await Training.find();
        res.status(200).render('trainer',{trainings:trainings});
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.getTrainings=async(req,res,next)=>{
    try{
        const trainings = await Training.find({user:req.session.userID});
        res.status(200).render('trainer',{information: trainings});
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.updateTrainings=async(req,res,next)=>{
    try{
        const training=await Training.findOne({slug:req.params.slug});
        training.name=req.body.name;
        training.trainingDay=req.body.trainingDay;
        training.user=req.session.userID;
        training.save();
        res.status(200).send(training);

    }
    catch(err){
        res.status(400).send(err);
    }
}

exports.deleteTrainings=async(req,res,next)=>{
        try{
            const training=await Training.findOneAndRemove({slug:req.params.slug});
        const training_id=training._id;
        console.log(training_id);
        const user=await User.findOne({_id:req.session.userID});
        await user.trainings.pull({_id:training_id});
        await user.save();
        res.status(200).json({msg:"Training was deleted successfully"})
        }
        catch (err){
            res.status(400).json({msg:err})
        }
    

}

exports.enrollTraining=async(req,res,next)=>{
    try{
        const user = await User.findById(req.session.userID);
        await user.trainings.push({_id:req.body.training_id});
        await user.save();
        res.status(200).json({msg:`${user.trainings}`})
    }
    catch(err){
        res.status(400).send(err);
    }
}

exports.releaseTraining=async(req,res,next)=>{
    try{
        const user = await User.findById(req.session.userID);
        await user.trainings.pull({_id:req.body.training_id});
        await user.save();
        res.status(200).json({msg:`${user.trainings||"release successfully"}`})
    }
    catch(err){
        res.status(400).send(err);
    }
}