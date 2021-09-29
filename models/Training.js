const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const slugify=require('slugify');

const TrainingSchema=new Schema({
    name:{
        type:String,
        required: "Training name is required"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    trainingDay:{
        type:Date,
        min:Date.now,
        required: "Training day is required"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    slug:{
        type: String,
        unique: true,
    }
});

TrainingSchema.pre('validate',function(next){
    this.slug=slugify(this.name+"-"+(this.trainingDay).getUTCDate()+"-"+((this.trainingDay).getUTCMonth()+1),{
        lower:true,
        strict:true
    })
    next();
});

const Training=mongoose.model('Training',TrainingSchema);
module.exports = Training;
