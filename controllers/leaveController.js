import Employee from "../models/employee.js"
import Leave from "../models/leave.js"


const addLeave=async(req,res)=>{
    try{
        const { userId,leavetype,startdate,enddate,
            reason}=req.body
            const employee=await Employee.findOne({userId})
        const newleave=new Leave({
            employeeId:employee._id,leavetype,startdate,enddate,
            reason
        })
        await newleave.save()
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

const getLeave = async (req, res) => {
    try {
        const { _id } = req.params; // _id from the request params

        // Try fetching leaves by employeeId (_id in params is assumed to be employeeId)
        let leaves = await Leave.find({ employeeId: _id });

        // If no leaves are found, fetch employee by userId and query leaves again
        if (!leaves||leaves.length === 0) {
            const employee = await Employee.findOne({ userId: _id }); // Find employee by userId
            if (employee) {
                leaves = await Leave.find({ employeeId: employee._id });
            }
        }

        // Return leaves in response
        return res.status(200).json({
            success: true,
            leaves,
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            success: false,
            error: "Error fetching leaves.",
        });
    }
};



const fetchLeave=async (req,res)=>{
    try{
         const leaves=await Leave.find().populate({path:"employeeId",
            populate:[
                {
                    path:'department',
                    select:'dep_name'
                },
                {
                    path:'userId',
                    select:'name'
                }
            ]
         })
          
          res.status(200).json({
            success:true,
            leaves
          })
    }catch(error)
    {
        res.status(500).json({
            success:false,
            error:"kutta error aab gelau leave me leave cancel "
        })
    }
}
const getLeaveDetail = async (req, res) => {
    try {
        const { _id } = req.params;

        // Use findById for fetching a single document by _id
        const leave = await Leave.findById(_id).populate({
            path: "employeeId",
            populate: [
                {
                    path: "department",
                    select: "dep_name",
                },
                {
                    path: "userId",
                    select: "name profileImage", // Use a space for multiple fields
                },
            ],
        });

        // If leave not found, return 404
        if (!leave) {
            return res.status(404).json({
                success: false,
                error: "Leave not found",
            });
        }

        // Respond with the leave details
        res.status(200).json({
            success: true,
            leave,
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            success: false,
            error: "An error occurred while fetching leave details.",
        });
    }
};


const updateLeave=async(req,res)=>{
try{
const {_id}=req.params

const leave=await Leave.findByIdAndUpdate({_id:_id},{status:req.body.status})
if(!leave)
{
return res.status(404).json({
    success:false,
    error:"leave not found"
})
}
return res.status(200).json({
    success:true
})
}
catch(error)
{
   return  res.status(500).json({
        success:false,
        error:"not found"
    })
}
}

export {addLeave,getLeave,fetchLeave,getLeaveDetail,updateLeave}