import mongoose, { Schema } from "mongoose";


const salarySchema=new Schema({
    employeeId:{
        type:Schema.Types.ObjectId,
        ref:'Employee',
        required:true
    },
    basicsalary:{
        type:Number,
        required:true
    },
    allowances:{
        type:Number
    },
    deductions:{
        type:Number
    },
    netsalary:{
        type:Number
    },
    paydate:{
        type:Date,
        required:true
    },

    createdAt:{
            type:Date,
            default:Date.now
        },
    updatedAt:{
            type:Date,
            default:Date.now
        },

})

const SalaryM=mongoose.model("Salary",salarySchema)
export default SalaryM