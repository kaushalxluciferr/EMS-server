import User from "../models/user.js";
import bcrypt from "bcrypt";
import Employee from "../models/employee.js";
import {v2 as cloudinary} from 'cloudinary'
// Function to store the picture in the file

const addEmployee = async (req, res) => {
    try {
        
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalstatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        const imageFile=req.file

        const imageUpload=await cloudinary.uploader.upload(imageFile.path)


        // Check if the email is already registered
        const user = await User.findOne({ email });
        if (user) {
            return res.status(300).json({
                success: false,
                error: "HEY DUDE, YOU HAVE ALREADY REGISTERED",
            });
        }

        // Hash the password
        const hashpas = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashpas,
            role,
            profileImage: req.file ? imageUpload.secure_url: "",
        });
        const saveUser = await newUser.save();

        // Create a new employee
        const newEmployee = new Employee({
            userId: saveUser._id,
            employeeId,
            dob,
            gender,
            maritalstatus,
            designation,
            department,
            salary,
        });
        await newEmployee.save();


        return res.status(200).json({
            success: true,
            error: "Created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Failed to store Employee",
        });
    }
};
const getEmployee=async (req,res)=>{
try{
    const employees=await Employee.find().populate("userId").populate("department")
    return res.status(200).json({
        success:true,
        employees
    })

}catch(error)
{
    return res.status(500).json({
        success:true,
        error:"bhag sar error aab gelau"
    })
}
}


const deleteEmp=async(req,res)=>{
    const {_id}=req.params

    try{
const userdelete=await Employee.findById(_id)
const deluser=await User.findById(userdelete.userId._id)
if(!userdelete)
    {
        return res.status(404).json({
            success:false,
            error:"user not found"
        })
        
    }
    await userdelete.deleteOne()
    await deluser.deleteOne()

return res.status(200).json({
    success:true,
    error:"deleted successfully",
    userdelete,
    deluser
})
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

const viewEmployee = async (req, res) => {
    const { _id } = req.params;

    try {
        let employee
         employee = await Employee.findById(_id)
            .populate("userId",{password:0})
            .populate("department");


        if (!employee) {
            employee = await Employee.findOne({userId:_id})
            .populate("userId",{password:0})
            .populate("department");
        }

        return res.status(200).json({
            success: true,
            employee,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Failed to fetch employee details",
        });
    }
};



const updateEmployee=async (req,res)=>{
    try{
    const {_id}=req.params

    const {name,maritalstatus,designation,department,salary}=req.body
    const employee=await Employee.findById({_id:_id})
    if(!employee)
    {
        return res.status(404).json({
            success:false,
            error:"employee not found"
        })
    }
    const user=await User.findById({_id:employee.userId})
    if(!user)
    {
        return res.status(404).json({
            success:false,
            error:"user not found"
        })
    }
    const updateuser=await User.findByIdAndUpdate({_id:employee.userId},{name})
    const updateemp=await Employee.findByIdAndUpdate({_id:_id},{
        maritalstatus,designation,salary,department
    })
if(!updateuser||!updateemp)
{
    return res.status(404).json({
        success:false,
        error:"cannot be updated"
    })
}
else{
    return res.status(200).json({
        success:true,
        error:"updated successfuly"
    })
}
}catch(error)
{
    return res.status(500).json({
        success:false,
        error:"vak re Update me error abb gelau "
    })
}
}

const fetchEmployeesByDepId=async (req,res)=>{
    const { _id } = req.params;
    try {
        const employees = await Employee.find({department:_id})
     
        return res.status(200).json({
            success: true,
            employees,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Failed to fetch employee dep details",
        });
    }
}

export { addEmployee,getEmployee,deleteEmp,viewEmployee,updateEmployee,fetchEmployeesByDepId };
