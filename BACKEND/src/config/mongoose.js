import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let URL=process.env.MONGO_URI;


//connect to db
async function connectDb(){
    try{
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");

    }catch(e){
        console.log(e);
    }
}

export default connectDb;