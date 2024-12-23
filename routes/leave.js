import express from 'express'
const router=express.Router()
import authMidlleware from '../middleware/authMiddleware.js'
import { addLeave,getLeave,fetchLeave,getLeaveDetail,updateLeave } from '../controllers/leaveController.js'

router.post('/add',authMidlleware,addLeave)//here it check the add and then verify user fron authmiddleware and then it goes to add
router.get('/:_id',authMidlleware,getLeave)//here it check the add and then verify user fron authmiddleware and then it goes to add
router.get("/",authMidlleware,fetchLeave)
router.get("/detail/:_id",authMidlleware,getLeaveDetail)
router.put("/:_id",authMidlleware,updateLeave)
export default router 