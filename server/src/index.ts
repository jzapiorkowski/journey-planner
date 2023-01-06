import express, { Express } from 'express';
import journeyRouter from './Routes/journey.route';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './Routes/user.route';
import fs from 'fs';
import https from 'https';

const credentials = {
  key: fs.readFileSync('/home/kuba/plik_klucz'),
  cert: fs.readFileSync('/home/kuba/plik_certyfikat'),
};

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/psw-journey-planner')
  .then(() => console.log('Connected with MongoDB'));

require('dotenv').config();

const app: Express = express();
const port = process.env.PORT || 3001;

const httpsServer = https.createServer(credentials, app);

app.use(
  cors({
    origin: 'https://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(journeyRouter);
app.use(userRouter);

httpsServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
