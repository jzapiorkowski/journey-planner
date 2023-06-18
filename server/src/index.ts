import express, { Express } from 'express';
import journeyRouter from './Routes/journey.route';
import cors from 'cors';
import mongoose from 'mongoose';
import { keycloak } from './keycloak.config';

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/psw-journey-planner')
  .then(() => console.log('Connected with MongoDB'));

require('dotenv').config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(keycloak.middleware());

app.use(journeyRouter);

app.get('/', (req, res) => res.send('api works'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
