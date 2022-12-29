import {
  getJourneys,
  getSpecificJourney,
} from './../Controllers/journey.controller';
import express from 'express';
import { postJourney } from '../Controllers/journey.controller';

const journeyRouter = express.Router();

journeyRouter.post('/journey', postJourney);
journeyRouter.get('/journeys', getJourneys);
journeyRouter.get('/journey/:journeyId', getSpecificJourney);

export default journeyRouter;
