import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            match:/^[a-zA-Z0-9._%=-]+@gmail\.com$/
        },
        password:{
            type:String,
            required:true,
            minlength:[8,"Password must be atleast 8 characters"]
        },
        phone:{
            type:Number,
            required:true,
            trim:true,
            maxlength:[10]
        }
    },{timestamps:true}
)
export const User = mongoose.model("User", userSchema);