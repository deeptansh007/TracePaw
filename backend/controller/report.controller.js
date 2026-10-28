import Report from '../models/report.model.js';

export const createReport = async (req, res)=>{
    try{
        const { name, reportType, color, breed, location, description } = req.body;
        if(!reportType || !color || !location || !description){
            return res.status(400).json({
                message:"Please fill all required details"
            })
        }
        // Check upload file
        if(!req.file){
           return res.status(400).json({
                message:'Please upload a pet photo'
            })
        }
        const report = await Report.create({
            name, reportType, color, breed, location, description,
            photo:{
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        })
        return res.status(201).json({
            message:"Report created successful",
            reportId: report._id
        })
    }catch(error){
        return res.status(500).json({
            message:"Unexpected server error",
            error:error.message
    })
    }
}