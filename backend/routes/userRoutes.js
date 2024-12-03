const express=require('express');
const router=express.Router();
const {body}=require('express-validator')
const userController= require('../controllers/userController')
const {authUser}=require('../middleware/authMiddleware');
router.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('name.firstname').isLength({min:3}).withMessage('first name must be min 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be 6 characters long')
],userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password must be 6 characters long')
],userController.loginUser);

router.get('/profile',authUser,userController.getUserProfile);

router.get('/logout',authUser,userController.logoutUser);
module.exports=router;