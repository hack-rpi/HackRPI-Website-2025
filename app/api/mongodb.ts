
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

console.log("Mongo URI:", MONGO_URI);

export async function connectDB(){
  const connectDB = mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection error:", err));
}








/*import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
//import('mongoose');
//const mongoose = require('mongoose')
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI);

const connectDB = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error('MongoDB Connection error: ', err));

export default connectDB;*/