import express from 'express';
import {createReport} from '../controller/report.controller.js'
import upload from '../middleware/upload.middleware.js';

const reportRouter= express.Router();

// upload report

reportRouter.post('/',upload.single('photo'), createReport);

export default reportRouter;