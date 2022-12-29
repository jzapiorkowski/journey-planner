import express, { Express, Request, Response } from 'express';
import journeyRouter from './Routes/journey.route';
const cors = require('cors');

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
