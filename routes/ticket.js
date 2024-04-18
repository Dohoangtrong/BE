import express from 'express'
import {getListRecommendFilm, listUserNotRecommend} from '../controllers/TicketController.js'
const router = express.Router()

router.get("/getListRS", getListRecommendFilm)
router.get("/abc", listUserNotRecommend)

export default router