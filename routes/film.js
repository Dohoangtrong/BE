import express from 'express'
import {getFilm, insertFilm, getFilmByPosition} from '../controllers/FilmController.js'
import {getListRecommendFilm, listUserNotRecommend} from '../controllers/TicketController.js'
const router = express.Router()

router.get("/getFilm", getFilm)
router.post("/createFilm", insertFilm)
router.get("/getFilm1", getListRecommendFilm, getFilmByPosition)

export default router