const mongoose=require('mongoose');

const blacklistToken=new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expores:86400
    }
});
const blackListModel=mongoose.model('BlacklistToken',blacklistToken);

module.exports = blackListModel;
