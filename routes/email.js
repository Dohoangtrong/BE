import express from 'express'
import {sendEmail, sendEmailAuth} from '../controllers/EmailController.js'
const router = express.Router()

router.post("/send", sendEmail)
router.post("/authEmail", sendEmailAuth)
export default router