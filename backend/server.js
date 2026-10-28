import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js';
import userRoute from './route/user.route.js';
import reportRouter from './route/report.route.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use('/user', userRoute);
app.use('/api/reports', reportRouter);

const startServer = async ()=>{
try{
    await connectDb();
    app.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`);    
    })
}catch (error){
    console.log(error);
}
}
startServer();
