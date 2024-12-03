const userModel=require('../models/user');
const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const blacklistModel=require('../models/captain');
const captainModel = require('../models/captain');

module.exports.authUser= async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'unauthorized'});
    }
    
    const isBlackListed=await blacklistModel.findOne({token:token});

    if (isBlackListed){
        return res.status(401).json({message:'unauthorized'});
    } 

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user= await userModel.findById(decoded.id);

        req.user=user;

        return next();
    } catch (error) {
        return res.status(401).json({message:'unauthorized'})
    }
}

module.exports.authCaptain= async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'unauthorized'});
    }
    
    const isBlackListed=await blacklistModel.findOne({token:token});

    if (isBlackListed){
        return res.status(401).json({message:'unauthorized'});
    } 

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain= await captainModel.findById(decoded.id);

        req.captain=captain;

        return next();
    } catch (error) {
        return res.status(401).json({message:'unauthorized'})
    }
}