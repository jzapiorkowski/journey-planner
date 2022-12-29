import { verifyUser } from '../Middlewares/authenticate.middleware';
import {
  getJourneys,
  getSpecificJourney,
  postJourney,
  updateJourney,
  deleteJourney,
} from './../Controllers/journey.controller';
import express from 'express';

const journeyRouter = express.Router();

journeyRouter.post('/journey', verifyUser, postJourney);
journeyRouter.get('/journeys', verifyUser, getJourneys);
journeyRouter.get('/journey/:journeyId', verifyUser, getSpecificJourney);
journeyRouter.put('/journey/:journeyId', verifyUser, updateJourney);
journeyRouter.delete('/journey/:journeyId', verifyUser, deleteJourney);

export default journeyRouter;
