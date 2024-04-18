import express from 'express'
import {getFilm, insertFilm} from '../controllers/FilmController.js'
const router = express.Router()

router.get("/getFilm", getFilm)
router.post("/createFilm", insertFilm)

export default router