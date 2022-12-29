import { getJourneys } from './../Controllers/journey.controller';
import express from 'express';
import { postJourney } from '../Controllers/journey.controller';

const journeyRouter = express.Router();

journeyRouter.post('/journey', postJourney);
journeyRouter.get('/journeys', getJourneys);

export default journeyRouter;
