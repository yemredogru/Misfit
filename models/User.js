const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');


const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required: 'Password is required',
    },
    image:{
        type:String
    },
    status:{
        type:String,
        enum:['pending', 'active'],
        default:'pending'
    },
    confirmationCode:{
        type:String,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        enum:["user","instructor","admin"],
        default:"user"
    },
    trainings:[

        {type:mongoose.Schema.Types.ObjectId,
        ref:'Training'
        }
    ]
});

UserSchema.pre("save", async function (next) {
    // Check to see if password is modified. If it is, encrypt it. If not, execute next();
    if (!this.isModified("password")) {
        // Finish here
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User=mongoose.model('User',UserSchema);
module.exports=User;