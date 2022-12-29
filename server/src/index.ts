import express, { Express } from 'express';
import journeyRouter from './Routes/journey.route';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/psw-journey-planner')
  .then(() => console.log('Connected with MongoDB'));

require('dotenv').config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(journeyRouter);
