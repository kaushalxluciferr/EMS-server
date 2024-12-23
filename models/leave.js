import mongoose, { Schema } from "mongoose";

const leaveSchema=new Schema({
    employeeId:{
        type:Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    leavetype:{
type:String,
enum:["sick leave","casual leave","annual leave"],
required:true
    },
    startdate:{
type:Date,
required:true
    },
    enddate:{
type:Date,
required:true
    },
    reason:{
type:String,
required:true
    },
    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    },
    appliedAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

const Leave=mongoose.model("Leave",leaveSchema)
export default Leave