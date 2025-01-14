import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addEmployee,getEmployee,viewEmployee,updateEmployee,fetchEmployeesByDepId, deleteEmp } from "../controllers/employeeController.js";
import upload from "../db/multer.js";
const router = express.Router();

// Route to add a new employee
router.post(
    "/add",
    authMiddleware, // Verify user
    upload.single("image"), // Handle file upload
    addEmployee // Controller logic for adding an employee
);
router.get('/',authMiddleware,getEmployee)
router.delete("/delete/:_id",authMiddleware,deleteEmp)
router.get('/:_id',authMiddleware,viewEmployee)
router.put('/:_id',authMiddleware,updateEmployee)
router.get('/department/:_id',authMiddleware,fetchEmployeesByDepId)

export default router;
