import mongoose from "mongoose";

// function to connect to the mongodb datatbase 
export const connectDB = async () => {
    try{
        mongoose.connection.on("connected",()=>console.log('Database connected'));
        await mongoose.connect(`${process.env.MONGODB_URI}/char-app`);
    }catch(error){
        console.error('Error connecting to database:', error);
    }
}