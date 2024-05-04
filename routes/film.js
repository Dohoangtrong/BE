import express from 'express'
import {getFilm, insertFilm, getFilmRecommend} from '../controllers/FilmController.js'
import {getListRecommendFilm} from '../controllers/TicketController.js'
const router = express.Router()

router.get("/getFilm", getFilm)
router.post("/createFilm", insertFilm)
router.get("/getFilm1", getListRecommendFilm, getFilmRecommend)

export default router