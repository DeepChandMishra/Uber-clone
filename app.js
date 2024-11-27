const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const express=require('express');
const app=express();
const connectDb=require('./db/db');
const userRoutes= require('./routes/userRoutes');

connectDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/user',userRoutes);


module.exports=app;