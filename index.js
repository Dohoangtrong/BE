import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRoute from './routes/auth.js'
import emailRoute from './routes/email.js'
import ticketRoute from './routes/ticket.js'
import abc from './routes/users.js'
import filmRoute from "./routes/film.js"
const app = express();
const PORT = 3000;

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// miderware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/auth", authRoute)
app.use("/email", emailRoute)
app.use("/ticket", ticketRoute)
app.use("/film", filmRoute)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connect()
});
