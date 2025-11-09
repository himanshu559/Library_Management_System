import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import {errorMiddleware} from './middlewares/errorMiddleware.js';
import authRouter from './routes/authRouter.js';
import bookRouter from './routes/bookRouter.js';
import borrowRouter from './routes/borrowRouter.js';
import expressFileupload from 'express-fileupload'
import userRouter from "./routes/userRouter.js"
import { notifyUsers } from './services/notifyUsers.js';
//import { removeUnverifiedAccounts } from './services/removeUnverifiedAccounts.js';

export const app = express();
  
app.use(cors({  //cors middleware 
  origin:[process.env.FRONTEND_URL], // allow to access the backend from this url
  methods:['GET','POST','PUT','DELETE'], // allowed methods
  credentials : true // allow cookies to be sent
}))


app.use(cookieParser()); //middleware for cookies 
app.use(express.json()); //middleware for json data
app.use(express.urlencoded({extended:true})); // middleware for form data



app.use(expressFileupload({ // middleware for file upload
  useTempFiles:true,
  tempFileDir:'/tmp/',

})); 

// Sample route

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/borrow', borrowRouter);
app.use('/api/v1/user', userRouter);
// Auth routes
//notifyUsers(); // Call the function to notify users about due dates
notifyUsers();
//removeUnverifiedAccounts();
connectDB();
app.use(errorMiddleware); // Error handling middleware
