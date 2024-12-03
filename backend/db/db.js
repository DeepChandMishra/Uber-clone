const mongoose=require('mongoose')

function connectDb(){
    mongoose.connect(process.env.DB_CONNECT).then(() => console.log("mongoDB connected"));
}

module.exports=connectDb;