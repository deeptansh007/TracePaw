import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
},
name:{
    type:String,
    trim:true
},
reportType:{
    type:String,
    enum:['Lost', 'Found'],
    default:"Lost",
    trim:true
},
color:{
    type:String,
    required:true,
    trim:true,
},
breed:{
    type:String,
    trim:true
},
location:{
    type:String,
    required:true,
    trim:true
},
photo:{
    data:{
        type:Buffer,
        required:true
    },
    contentType:{
        type:String,
        required:true
    }
},
imageEmbedding:{ 
    type: [Number], 
    select: false 
},
description:{
    type:String,
    required:true,
    trim:true
},
status:{
    type:String,
    enum:["Active","Resolved", "Closed"],
    default:"Active"
}
},{timestamps:true})

const Report = mongoose.model("Report", reportSchema);
export default Report;