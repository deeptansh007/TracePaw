import User from '../models/user.model.js'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
export const CreateUser = async (req, res) => {
    try{
        const { name, email, password, phoneNumber } = req.body;
        // Validation 
        if(!name || !email || !password || !phoneNumber ){
            return res.status(404).json({
                message:"Fill all the fields"
            })
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password,10);
        // Find user exist or not 
        const existingUSer = await User.findOne({email});

        if(existingUSer){
            return res.status(400).json({
                message:"User already exist"
            })
        }

        const UserData = await User.create({
            name,
            email,
            password: hashPassword,
            phoneNumber
        })

        const safeUser = await User.findById(UserData.id).select('-password');

        return res.status(201).json({
            message:"User create successful",
            data:safeUser
        })
    }catch (error){
        return res.status(500).json({
            message:"Unexpected server error",
            error:error.message
        })
    }
}

export const updateUser = async (req, res) =>{
    try{
        const { name, email, password, phoneNumber } =req.body;
        const { id } = req.params;
        if(String(req.user.id) !== id){
            return res.status(403).json({
                message:'You cannot update another user account'
            })
        }
     const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;

      if(password){
        updateData.password = await bcrypt.hash(password,10);
      }
        const userUpdate = await User.findByIdAndUpdate(id, updateData,
            {
                returnDocument: 'after',
                runValidators: true
            }
        ).select('-password');

        if(!userUpdate){
            return res.status(404).json({
                message:"Id not found"
            })
        }
        return res.status(200).json({
            message:"Update successful",
            data: userUpdate
        })
    }catch (error){
        return res.status(400).json({
            message:"Unexpected server error",
            error:error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
         if(String(req.user.id)!== id){
            return res.status(403).json({
            message:'You cannot update another user account'
            })
        }
        const userDelete = await User.findByIdAndDelete(id);
       if (!userDelete) { 
        return res.status(404).json({ 
            message: "User ID not found" }); 
        }
        return res.status(200).json({
            message:"User deleted successful",
        })
    }catch(error){
        return res.status(500).json({
            message:"Unexpected server error",
            error:error.message
        })
    }
}

export const searchUser = async (req, res) =>{
    try{
        const { id } = req.params;
       if (String(req.user.id) !== id) {
            return res.status(403).json({
                message: 'You cannot access another user account'
            });
        }
        const search = await User.findById(id).select('-password');;
        if(!search){
            return res.status(404).json({
                message:"User not found"
            })
        }
        return res.status(200).json({
            message:"User found",
            data: search
        })
    }catch(error){
        return res.status(500).json({
            message:"Unexpected server error",
            error:error.message
        })
    }
}

export const userLogin = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Enter email or password"
            })
        }
        const emailCheck = await User.findOne({email});

        if(!emailCheck){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }
        const passwordCheck = await bcrypt.compare(password, emailCheck.password);
        if(!passwordCheck){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }
         if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('JWT secret is not configured');
        }

        const token = jwt.sign({
            id:emailCheck.id,
            email:emailCheck.email
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5m'})

        return res.status(200).json({
            message:"Login successful",
            token,
            user: {
                id: emailCheck._id,
                name: emailCheck.name,
                email: emailCheck.email,
                phoneNumber: emailCheck.phoneNumber
            }
        //    id: emailCheck._id, name: emailCheck.name, email: emailCheck.email,
        //    password:emailCheck.password
        })
    }catch (error){
        return res.status(500).json({
            message:"Unexpected sever error",
            error: error.message
        })
    }
}