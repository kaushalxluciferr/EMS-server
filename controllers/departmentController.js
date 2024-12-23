import Department from "../models/department.js"


const getDepartments=async (req,res)=>{
try{
const departments=await Department.find()
return res.status(200).json({
    success:true,
    departments
})
}catch(error)
{
return req.status(500).json({
    success:false,
     error:"server error"
})
}
}

const addDepartment=async (req,res)=>{
try{
    const {dep_name,description}=req.body
    const newDepartment=new Department({
        dep_name,
        description
    })
    await newDepartment.save()
    return res.status(200).json({
        success:true,
        department:newDepartment       
    })

} catch(error)
{
res.status(500).json({
    success:false,
    error:"server error at add department "
})
}
}

const getDepartment= async (req,res)=>{
try{
    const {id}=req.params
    const department=await Department.findById({_id:id})
    return res.status(200).json({
        success:true,
        department
    })
}
catch(error)
{
    res.status(500).json({
        success:fasle,
        error:"get department server error"
    })
}
}

const UpdateDepartment=async (req,res)=>{
try{
const {id}=req.params;
const {dep_name,description}=req.body
const updateDep=await Department.findByIdAndUpdate({_id:id},{
    dep_name,
    description,
})
return res.status(200).json({
    success:true,
    updateDep,
})
}
catch(error)
{
  
return res.status(500).json({
    success:false,
error:"Edit server error"
})
}
}

const deleteDepartment= async(req,res)=>
{
    try{
        const {id}=req.params;
        const delDep=await Department.findById({_id:id})
        await delDep.deleteOne()
        return res.status(200).json({
            success:true,
            delDep,
        })
        }
        catch(error)
        {
        return res.status(500).json({
            success:false,
        error:"Delete server error"
        })
        }
        
        
}



export {addDepartment,getDepartments,getDepartment,UpdateDepartment,deleteDepartment}