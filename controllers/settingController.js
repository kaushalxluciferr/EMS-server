import User from "../models/user.js"
import bcrypt from 'bcrypt'
const changepass=async (req,res)=>{
try{
const{userId,oldpass,newpass,confirmpass}=req.body

const user =await User.findById({_id:userId})
if(!user)
{
    res.status(404).json({
        success:false,
        error:"user Not found"
    })
}
const match=await bcrypt.compare(oldpass,user.password)
if(!match)
{
    return res.status(404).json({
        success:false,
        error:"password not matched"
    })
}
const hashpas=await bcrypt.hash(newpass,10)
const newUSer=await User.findByIdAndUpdate({_id:userId},{password:hashpas})
res.status(200).json({
    success:true
})

}catch(error)
{
    res.status(500).json({
        success:false,
        error:"password change nae velo"
    })
}

}

export {changepass}