import mongoose from 'mongoose'

// import connectToDB from '../db/db'
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","employee"],
        required:true
    },
    profileImage:String,
    createAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

// module.exports=mongoose.model('user',userSchema)
const User=mongoose.model("User",userSchema)
export default User