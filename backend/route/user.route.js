import { CreateUser, updateUser, deleteUser, searchUser, userLogin } from "../controller/user.controller.js";
import express from 'express'
import {auth} from '../middleware/auth.middleware.js'

const userRoute = express.Router();

// Create User
userRoute.post('/addData', CreateUser);

// Update User
userRoute.put('/:id/update',auth, updateUser);

// Delete User
userRoute.delete('/:id', auth,deleteUser);

// Search User
userRoute.get('/:id/search',auth, searchUser);

// userLogin
userRoute.post('/login', userLogin)
export default userRoute;
