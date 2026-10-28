import Match from '../models/match.model'
import Report from '../models/report.model';

export const matchDetail = async (req, res)=>{
    try{
        const {lostReportId,foundReportId,status} = req.params;

        if(!lostReportId || ! foundReportId){
            return res.status(404).json({
                message:"No match found"
            })
        }
        
        if(Report.status ==="Active"){
             
        }

        return res.status(200).json({
            match
        });
    }catch(error){
        return res.status(500).json({
        message:"Unexpected server error",
        error:error.message
        })
    }
}