import { CreateUser, updateUser, deleteUser, searchUser, userLogin } from "../controller/user.controller.js";
import express from 'express'

const userRoute = express.Router();

// Create User
userRoute.post('/addData', CreateUser);

// Update User
userRoute.put('/:id/update', updateUser);

// Delete User
userRoute.delete('/:id', deleteUser);

// Search User
userRoute.get('/:id/search', searchUser);

// userLogin
userRoute.post('/login', userLogin)
export default userRoute;
