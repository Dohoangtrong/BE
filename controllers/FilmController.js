import Film from "../models/Film.js";
import fs from 'fs';

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

export const getFilmByPosition = async (req, res, next) => {
  try {
    const lis = req.list_recommend;
    try {
      const jsonArray = JSON.parse(lis);
      for (const film of jsonArray) {
        const id = film.id;
        const similarity = film.similarity;
        const name = film.name;
        console.log(`ID: ${id}, Similarity: ${similarity}, Name: ${name}`);
      }
    } catch (error) {
      console.error('Lỗi phân tích cú pháp JSON:', error);
    }
    const id = req.query.id;
    const films = await Film.find().skip(id-1).limit(1);
    const filmByPosition = films[0];
    res.status(200).json(filmByPosition);
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

const addExtraRowToCSV = (name, genres) => {
  fs.readFile('movies.csv', 'utf8', (err, data) => {
    if (err) {
      console.error('Lỗi khi đọc tệp CSV:', err);
      return;
    }
    const rows = data.trim().split('\n');
    const lastRow = rows.length;
    
    const extraRow = `${lastRow},${name},"${genres.join('|')}"\n`;
    fs.appendFileSync('movies.csv', extraRow);
  });
}