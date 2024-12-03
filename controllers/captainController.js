const captainModel = require('../models/captain');
const captainService= require('../services/captainService');
const {validationResult} = require('express-validator');

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