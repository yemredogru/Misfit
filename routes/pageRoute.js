const express=require('express');
const pageController=require('../controllers/pageController');
const accessMiddleware=require('../middlewares/accessMiddleware');
const router=express.Router();
router.route('/').get(pageController.getIndexPage);
router.route('/login').get(pageController.getLoginPage);
router.route('/addTraining').get(accessMiddleware,pageController.getAddTrainingPage);

module.exports=router;