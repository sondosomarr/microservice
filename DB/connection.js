import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config({});
const connection =()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/socket')
    .then(()=>console.log('DB connected'))
    .catch((err)=>console.error('DB connection error',err));
}

export default connection;