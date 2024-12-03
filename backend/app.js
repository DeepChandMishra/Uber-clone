const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const express=require('express');
const app=express();
const cookieParser=require('cookie-parser')
const connectDb=require('./db/db');
const userRoutes= require('./routes/userRoutes');
const captainRoutes= require('./routes/captainRoutes');


connectDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users',userRoutes);
app.use('/captain',captainRoutes);

module.exports=app;