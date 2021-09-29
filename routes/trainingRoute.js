const express=require('express');
const trainingController=require('../controllers/trainingController');
const authMiddleware=require('../middlewares/authMiddleware');
const router=express.Router();


router.route('/my').get(trainingController.getTrainings);
router.route('/').get(trainingController.getAllTrainings);
router.route('/create').post(authMiddleware(["instructor","admin"]),trainingController.createTraining);
router.route('/delete/:slug').delete(trainingController.deleteTrainings);
router.route('/update').post(trainingController.updateTrainings);
router.route('/enroll').post(trainingController.enrollTraining);
router.route('/release').post(trainingController.releaseTraining);


module.exports=router;