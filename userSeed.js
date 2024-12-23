
import User from "./models/user.js";
import bcrypt from 'bcrypt'
import connectToDB from "./db/db.js";

const userRegister=async ()=>{
    connectToDB()
    try{
const hashpas=await bcrypt.hash("admin",10)
const newUser=new User({
    name:"Admin",
    email:"admin@gmail.com",
    password:hashpas,
    role:"admin"
})
await newUser.save()
    }
    catch(err)
    {
        console.log(err);
        
    }
}
userRegister()