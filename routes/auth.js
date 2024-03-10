import express from 'express'
import {register, login} from '../controllers/AuthController.js'
const router = express.Router()

router.get("/", (req, res) =>{
    res.send("auth")
})
router.post("/register", register)
router.post("/login", login)
router.get("/forgot", (req, res) => {
    res.send("MAMAMA")
})

export default router