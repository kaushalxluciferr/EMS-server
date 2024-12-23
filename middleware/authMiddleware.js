
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
const verifyUser= async (req,res,next)=>
{
    try{
        const token = req.headers['authorization'].split(' ')[1]; // Optional chaining
        
        if (!token) {
            return res.status(404).json({
                success: false,
                error: "Token not found"
            });
        }
const decoded=jwt.verify(token,process.env.JWT_KEY)
if(!decoded)
{
    return res.status(401).json({
        success:false,
        error:"not matched"
    })
}
const user=await User.findById({_id:decoded._id}).select('-password')
if(!user)
{
return res.status(404).json({
    success:false,
    error:"no user is matched"
})
}
req.user=user
next();
    } catch(error)
    {
return res.status(500).json({
    success:false,
    error:"server side eeror"
})
    }
   
}

export default verifyUser
