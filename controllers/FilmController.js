import Film from "../models/Film.js";
import {addExtraRowToCSV, check_name_in_csv, getDataByUserName } from "../utils/FilmProcess.js"

export const getFilm = async (req,res,next)=>{
  try {
    const searchTerm = req.query.movie;
    const regex = new RegExp(`${searchTerm}`, 'i');
    const film = await Film.find({ name: { $regex: regex } });
    res.status(200).json(film);
  } catch (err) {
    next(err);
  }
}

// const check = await check_name_in_csv("1")
// await getDataByUserName('abc')
// .then(data => {
//     console.log(data); // Dữ liệu từ trường "film" với userName là "abc"
// })
// .catch(error => {
//     console.error('Đã xảy ra lỗi:', error);
// });

export const getFilmRecommend = async (req, res, next) => {
  try {
    const lis = req.list_recommend;
    let filmsList = null;
    try {
      const jsonArray = JSON.parse(lis);
      const filmsName = jsonArray.map(item => String(item.name.trim())); 
      filmsList = await Film.find({ name: { $in: filmsName } });
    } catch (error) {
      console.error('Lỗi phân tích cú pháp JSON:', error);
    }
    res.status(200).json(filmsList);
  } catch (err) {
    next(err);
  }
};

export const insertFilm = async (req,res,next)=>{
  try {
    const newFilm = new Film({
      name:req.body.name,
      date:req.body.date,
      img: req.body.img,
      category: req.body.category,
      duration: req.body.duration,
      director: req.body.director,
      description: req.body.description,
    });
    addExtraRowToCSV(req.body.name,req.body.category)
    await newFilm.save();
    res.status(200).send("Film has been update.");
  } catch (err) {
    next(err);
  }
}
