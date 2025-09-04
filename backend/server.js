import express from "express";
import authroutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";
import mechanicModel from "./models/mechanic.model.js";
import mechanicRoutes from "./routes/mechanic.route.js";

dotenv.config();


let PORT = process.env.PORT || 3000;

const conn = await mongoose.connect(process.env.MONGO_URI);
if(conn.connection.readyState === 1){
    console.log("MongoDB connected");
}

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));

app.use(cookieParser());
app.use('/api/v1/auth', authroutes);
app.use('/api/v1/mechanics', mechanicRoutes);
// app.use('/api/v1/movies' ,protectRoute, movieroutes);

app.listen(PORT , () =>{
    console.log("server is running on port ",PORT);
    
})