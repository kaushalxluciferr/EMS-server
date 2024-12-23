import Department from "../models/department.js"
import Employee from "../models/employee.js"
import Leave from "../models/leave.js"



const getSummary=async (req,res)=>{
try{
const totalEmp=await Employee.countDocuments()
const totalDep=await Department.countDocuments()
const totalsal=await Employee.aggregate([
    {$group:{_id:null,totalsalary:{$sum:"$salary"}}}
])

const leaveemp=await Leave.distinct('employeeId')
const leavestatus=await Leave.aggregate([
    {$group:{
        _id:"$status",
        count:{$sum:1}
    }}
])
const leavesummary={
    appliedFor:leaveemp.length,
    approved:leavestatus.find(item=>item._id==="Approved")?.count||0,
    rejected:leavestatus.find(item=>item._id==="Rejected")?.count||0,
    pending:leavestatus.find(item=>item._id==="Pending")?.count||0,
}

return res.status(200).json({
    success:true,
    totalEmp,
    totalDep,
    totalsalary:totalsal[0]?.totalsalary||0,
    leavesummary
})

}catch(error)
{
    console.log(error.message);
    
    return res.status(500).json({
        success:false,
        error:"cannot get summary "
    })
}
}

export {getSummary}