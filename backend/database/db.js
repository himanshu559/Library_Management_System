import mongoose  from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URL  = process.env.MONGODB_URL;

const connectDB = async() => {
     try{
      const conn = await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
   
     console.log(`MongoDB Connected ${conn.connection.host}`);

     }catch(error){
       console.error(error.message);
       process.exit(1);
     }
};

export default connectDB;
