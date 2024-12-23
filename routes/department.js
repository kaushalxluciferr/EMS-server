import express from 'express'
const router=express.Router()
import authMidlleware from '../middleware/authMiddleware.js'
import { addDepartment,getDepartments,getDepartment,UpdateDepartment,deleteDepartment } from '../controllers/departmentController.js'
router.post('/add',authMidlleware,addDepartment)//here it check the add and then verify user fron authmiddleware and then it goes to add
router.get('/',authMidlleware,getDepartments)//here it check the add and then verify user fron authmiddleware and then it goes to add
router.get('/:id',authMidlleware,getDepartment)//here it check the add and then verify user fron authmiddleware and then it goes to add
router.put('/:id',authMidlleware,UpdateDepartment)
router.delete('/:id',authMidlleware,deleteDepartment)


export default router 