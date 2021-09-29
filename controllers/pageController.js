exports.getIndexPage=(req,res)=>{
    res.status(200).render('index',{
        page_name:'index',
    });
};

exports.getLoginPage=(req,res)=>{
    res.status(200).render('login',{
        page_name:'login',
    })
};
exports.getTrainingsPage=(req,res)=>{
    res.status(200).render('trainings',{
        page_name:'trainings',
    })
};

exports.getAddTrainingPage=(req,res)=>{
    res.status(200).render('addtraining',{
        page_name:'addtraining',
    })
};