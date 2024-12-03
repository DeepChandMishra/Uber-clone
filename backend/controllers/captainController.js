const captainModel = require('../models/captain');
const captainService= require('../services/captainService');
const {validationResult} = require('express-validator');
const blacklistToken=require('../models/blaclistToken');

module.exports.registerCaptain = async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password,vehicle}=req.body;
    const alreadyexist= await captainModel.findOne({email});

    if(alreadyexist){
        return res.status(400).json({message: 'captain already exist'})
    }

    const hashedPassword = await captainModel.hashPassword(password);
    const captain= await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });

    res.status(201).json({captain});    
} 

module.exports.loginCaptain= async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;

    const captain= await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message : 'invalid email or password'});
    }

    const isMatch=await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message : 'invalid email or password'});
    }

    const token=captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,captain});
}

module.exports.getCaptainProfile = async(req,res)=>{
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain=async (req,res)=>{
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistToken.create({token});

    res.status(201).json({message :'logout'})
}