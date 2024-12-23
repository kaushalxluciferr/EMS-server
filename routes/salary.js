import express from 'express'
const router=express.Router()
import authMidlleware from '../middleware/authMiddleware.js'
import { addSalary,getSalary } from '../controllers/salaryController.js'

router.post('/add',authMidlleware,addSalary)//here it check the add and then verify user fron authmiddleware and then it goes to add
router.get('/:_id/:role',authMidlleware,getSalary)

// router.get('/',authMidlleware,getDepartments)//here it check the add and then verify user fron authmiddleware and then it goes to add

export default router 