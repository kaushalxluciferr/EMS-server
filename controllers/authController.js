
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        console.log("hey s");
        
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "user Not found"
            })

        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({
                success: false,
                error: "password not matched"
            })
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: "10d" })
        res.status(200).json({
            sucess: true,
            token,
            user: { _id: user._id, role: user.role },
        })

    } catch (err) {
       res.status(500).json({
        success:false,
        error:err.message

       })

    }


}

export const verify= (req,res)=>{
return res.status(200).json({
    success:true,
    user:req.user
})
}
