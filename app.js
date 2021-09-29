const express=require('express');
const path = require('path');
require('dotenv').config()
const session=require('express-session');
const fileUpload = require('express-fileupload');
const ejs=require('ejs');
const mongoose=require('mongoose');
const MongoStore=require('connect-mongo');
const methodOverride = require('method-override');
const userRoute=require('./routes/userRoute');
const pageRoute=require('./routes/pageRoute');
const trainingRoute=require('./routes/trainingRoute');

const app=express();
app.set('view engine', 'ejs');
global.userIN=null;
app.use(methodOverride('_method',{
    methods:['POST','GET']
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const port=3000;
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@yasaremre.swwep.mongodb.net/misfit-db?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('DB Connected Successfuly');
});

//Middlewares
app.use(express.static('public'));
app.use(fileUpload());
app.use(session({
    secret: 'misfit_s',
    resave: false,
    saveUninitialized: true,
    store:MongoStore.create({mongoUrl:`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@yasaremre.swwep.mongodb.net/misfit-db?retryWrites=true&w=majority`})
  }))


//Routes
app.use('*',(req,res,next)=>{
    userIN=req.session.userID;
    next();
})
app.use('/users',userRoute);
app.use('/training',trainingRoute);
app.use('/',pageRoute);

app.listen(port,()=>{
    console.log(`Server ${port} portunda başlatıldı.`);
})
