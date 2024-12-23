import Employee from '../models/employee.js'
import SalaryM from '../models/salary.js'


const addSalary=async(req,res)=>{
try{
const { employeeId,basicsalary,allowances,deductions,
    paydate}=req.body
const totalSalary=parseInt(basicsalary)+parseInt(allowances)-parseInt(deductions)
const newsalary=new SalaryM({
    employeeId,
    basicsalary,
    allowances,
    deductions,
    netsalary:totalSalary,
    paydate
})
await newsalary.save()
return  res.status(200).json({
    success:true,
    
})

}catch(error)
{
    return res.status(500).json({
        success:false,
        error:"cannot be added"
    })
}
}

const getSalary=async (req,res)=>{
try{
    const {_id,role}=req.params
    let salary;
     if(role==="admin")
     {
         salary=await SalaryM.find({employeeId:_id}).populate('employeeId','employeeId')
     }else{
    const employee=await Employee.findOne({userId:_id})
    salary=await SalaryM.find({employeeId:employee._id}).populate('employeeId','employeeId')
}

   return res.status(200).json({
    success:true,
    salary
   })
}
catch(error)
{
    return res.status(500).json({
        success:false,
        error:"not found salary"
    })
}
}


export {addSalary,getSalary}