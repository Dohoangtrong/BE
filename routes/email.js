import express from 'express'
import {sendEmail, sendEmailAuth} from '../controllers/EmailController.js'
import {saveToken} from '../controllers/UserController.js'
const router = express.Router()

router.post("/send", sendEmail)
router.post("/sendToken", sendEmailAuth, saveToken)

export default router