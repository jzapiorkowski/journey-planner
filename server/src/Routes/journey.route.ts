import { keycloak } from '../keycloak.config';
import {
  getJourneys,
  getSpecificJourney,
  postJourney,
  updateJourney,
  deleteJourney,
  getAllJourneys,
} from './../Controllers/journey.controller';
import express from 'express';

const journeyRouter = express.Router();

journeyRouter.post(
  '/journey',
  keycloak.protect((token) => token.hasRealmRole('journeys')),
  postJourney
);
journeyRouter.get(
  '/journeys',
  keycloak.protect((token) => token.hasRealmRole('journeys')),
  getJourneys
);
journeyRouter.get(
  '/alljourneys',
  keycloak.protect((token) => token.hasRealmRole('admin')),
  getAllJourneys
);
journeyRouter.get(
  '/journey/:journeyId',
  keycloak.protect((token) => token.hasRealmRole('journeys')),
  getSpecificJourney
);
journeyRouter.put(
  '/journey/:journeyId',
  keycloak.protect((token) => token.hasRealmRole('journeys')),
  updateJourney
);
journeyRouter.delete(
  '/journey/:journeyId',
  keycloak.protect((token) => token.hasRealmRole('journeys')),
  deleteJourney
);

export default journeyRouter;
