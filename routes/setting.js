import express from 'express'
const router=express.Router()
import authMidlleware from '../middleware/authMiddleware.js'
import { changepass } from '../controllers/settingController.js'

router.put('/change-password',authMidlleware,changepass)//here it check the add and then verify user fron authmiddleware and then it goes to add


export default router 