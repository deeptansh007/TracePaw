import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) =>{
    try{
    const authHeader = req.headers.authorization;

    if(!authHeader ||!authHeader.startsWith('Bearer')){
        return res.status(401).json({
            message:"Access denied. Token required"
        })
    }

    // Extract Token
    const token = authHeader.split(' ')[1];

    // Verify Token
    const decode = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    )

    req.user= decode;
    // Allow request to continue
    next();
   }catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
}