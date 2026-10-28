import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
lostReportId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Report'
},
foundReportId:{
   type:mongoose.Schema.Types.ObjectId,
    ref:'Report'
},
status:{
    type:String,
    enum:["Active","Resolved", "Closed"],
    default:"Active"
}
},{timestamps:true});

const Match = mongoose.model("Match", matchSchema);
export default Match;