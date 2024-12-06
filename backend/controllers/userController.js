const userModel=require('../models/user');
const userService=require('../services/userService');
const {validationResult}=require('express-validator')
const blacklistToken=require('../models/blaclistToken');

module.exports.registerUser= async (req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message:error});
    }

    const {name,email,password}=req.body;

    const alreadyexist= await userModel.findOne({email});

    if(alreadyexist){
        return res.status(400).json({message: 'user already exist'})
    }

    const hashedPassword= await userModel.hashPassword(password);
    const user= await userService.createUser({
        firstname:name.firstname,lastname:name.lastname,email,password:hashedPassword
    });
    res.status(201).json({user});
}

module.exports.loginUser= async(req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message:error});
    }
    const {email,password}=req.body;
    const user= await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message : 'invalid email or password'});
    }

    const isMatch=await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message : 'invalid email or password'});
    }

    const token=user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,user});
}

module.exports.getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser=async (req,res,next)=>{
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistToken.create({token});

    res.status(200).json({message :'logout'})
}


 