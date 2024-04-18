import Film from "../models/Film.js";

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

    await newFilm.save();
    res.status(200).send("Film has been update.");
  } catch (err) {
    next(err);
  }
}
