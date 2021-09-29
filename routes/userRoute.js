const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');

router.route('/signup').post(authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/confirm/:confirmationCode').get(authController.confirmUser);



module.exports=router;