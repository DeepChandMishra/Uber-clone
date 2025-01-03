const express=require('express');
const router=express.Router();
const {body}= require('express-validator');
const captainController=require('../controllers/captainController')
const {authCaptain}=require('../middleware/authMiddleware');

router.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3 character long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('invlaid vehicle type')
],captainController.registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password must be 6 characters long')
],captainController.loginCaptain);

router.get('/profile',authCaptain,captainController.getCaptainProfile);

router.get('/logout',authCaptain,captainController.logoutCaptain);

module.exports=router;