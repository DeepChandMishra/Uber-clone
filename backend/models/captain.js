const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken')

const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'first name should be min 3 characters long'],
        },
        lastname:{
            type:String,
            minLength:[3,'first name should be min 3 characters long'],
        },},
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            match:[/^\S+@\S+\.\S+$/,'please enter a valid email']
        },
        password:{
            type:String,
            required:true,
            select:false
        },
        socketId:{
            type:String,
        },
        status:{
            type:String,
            enum:['active','inactive'],
            default:'inactive',
        },
        vehicle:{
            color:{
                type:String,
                required:true,
                minLength:[3,'color must be at least 3 char long'],
            },
            plate:{
                type:String,
                required:true,
                minLength:[3,'plate must be 3 character long']
            },
            capacity:{
                type:Number,
                required:true,
                min:[1,'capacity must be at least 1'],
            },
            vehicleType:{
                type:String,
                required:true,
                enum:['car','motorcycle','auto'],
            }
        },
        location:{
            ltd:{
                type:Number,
            },
            lng:{
                type:Number,
            }
        }
    })

captainSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({id:this.id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}

captainSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword= async (password)=>{
    return await bcrypt.hash(password,10);
}
const captainModel=mongoose.model('captain',captainSchema);

module.exports = captainModel;