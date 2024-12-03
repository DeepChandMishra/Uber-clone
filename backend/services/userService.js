const userModel=require('../models/user');

module.exports.createUser= async({firstname,lastname,email,password})=>{
    if(!firstname || !email || !password){
        throw new Error('all fields are required');
    }
    const user=userModel.create({name:{
        firstname,
        lastname
    },
    email,
    password
})
return user;
}