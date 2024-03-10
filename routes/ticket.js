import express from 'express'
import {getListRecommendFilm, acb} from '../controllers/TicketController.js'
const router = express.Router()

router.get("/getListRS", getListRecommendFilm)
router.get("/abc", acb)
export default router