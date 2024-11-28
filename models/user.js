const mongoose=require('mongoose');
const jwt =require('jsonwebtoken');
const bcrypt= require('bcrypt');
const userSchema=new mongoose.Schema({
    name:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'first name must have min 3 characters'],
        },
        lastname:{
            type:String,
        minlength:[3,'last name must have min 3 characters'],
        }
    },
    email:{
        type: String,
        required:true,
        unique:true,
        minlength:[5,"email must be min 5 characters long"]
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketID:{
        type:String
    }
});

userSchema.methods.generateAuthToken= function(){
    const token=jwt.sign({id:this.id},process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
}

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword= async (password)=>{
    return await bcrypt.hash(password,10);
}

const userModel=mongoose.model('user',userSchema);

module.exports=userModel;