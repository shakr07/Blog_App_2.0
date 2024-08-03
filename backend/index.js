const express=require("express");
const dotenv=require('dotenv').config();
const cors=require('cors');
const authRoutes = require("./routes/authRoutes");
const mongoose =require("mongoose")
const app=express();
const cookieParser=require('cookie-parser')

//database connection
const url = process.env.mongo_URL;
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
connectToMongoDB();

app.use(express.json());

//using the middle ware cookie parser to aloow cookie one host to another
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

app.use('/',authRoutes)

const port=8000;
app.listen(port,()=>{
    console.log("listen to port {8000}");
    
})