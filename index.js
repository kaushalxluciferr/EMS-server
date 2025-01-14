import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js';
import connectToDB from "./db/db.js"
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js' 
import settingRouter from './routes/setting.js'
import dashRouter from './routes/dashboard.js'
import dotenv from 'dotenv'
import connectCloudinary from './db/cloudinary.js';
dotenv.config()
connectToDB()
connectCloudinary()
const app=express();
app.use(cors());

// app.use(express.static('publics/uploads'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',authRouter)
app.use('/api/department',departmentRouter)
app.use('/api/employee',employeeRouter)
app.use('/api/salary',salaryRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/setting',settingRouter)
app.use('/api/dashboard',dashRouter)

app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT} `);
    
})