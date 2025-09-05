import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();

export const connectDB = async ()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
      
        console.log(`connected to mongodb ${con.connection.host}`);
         
    } catch (error) {
        console.log('error in connecting to mongodb' , error.message);
        process.exit(1);
        
    }
}

