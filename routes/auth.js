import express from 'express'
import {register, login, forgotPassword} from '../controllers/AuthController.js'
import {saveToken} from '../controllers/UserController.js'
import { sendEmailAuth } from '../controllers/EmailController.js'
const router = express.Router()

router.get("/", (req, res) =>{
    res.send("auth")
})
router.post("/register", register)
router.post("/login", login)
router.get("/forgot", (req, res) => {
    res.send("MAMAMA")
})

router.post("/forgotPass", sendEmailAuth, saveToken)
export default router