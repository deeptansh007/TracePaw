import mongoose from 'mongoose'

export const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongo DB connected");
    }catch(error){
        console.log("Error in DB connection");
        console.log(error.message);
        process.exit(1);
    }
}