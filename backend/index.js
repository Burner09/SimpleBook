import express, { response } from 'express';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import "dotenv/config"

const app =  express();

// Middleware for parsing body
app.use(express.json());

// Middleware for handling cors policy
// option 1, allows all origins with default of cors(*)
app.use(cors());
// option 2 allows custom origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//   })
// )

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('App connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port : ${process.env.PORT}`)
    });
  })
  .catch((error) => {
    console.log(error)
  })