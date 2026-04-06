import mongoose from "mongoose";
import { MONGO_URI } from "./index.js";

const connectDB = async () => {

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }

}

export default connectDB;