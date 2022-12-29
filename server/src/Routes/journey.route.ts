import {
  getJourneys,
  getSpecificJourney,
  postJourney,
  updateJourney,
} from './../Controllers/journey.controller';
import express from 'express';

const journeyRouter = express.Router();

journeyRouter.post('/journey', postJourney);
journeyRouter.get('/journeys', getJourneys);
journeyRouter.get('/journey/:journeyId', getSpecificJourney);
journeyRouter.put('/journey/:journeyId', updateJourney);

export default journeyRouter;
