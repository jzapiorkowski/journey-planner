import { Coordinates } from './../Utils/forwardGeocode';
import { Address } from './../Types/journey.type';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { v4 as UUID } from 'uuid';
import ForwardGeocode from '../Utils/forwardGeocode';
import JourneyModel from '../Models/journey.model';
import { checkCoordinates } from '../Utils/checkCoordinates';

export const postJourney: RequestHandler = async (
  req: Request<
    any,
    any,
    { originAddress: Address; destinationAddress: Address }
  >,
  res: Response,
  next: NextFunction
) => {
  const { originAddress, destinationAddress } = req.body;

  const originCoords = await ForwardGeocode(originAddress);
  const destinationCoords = await ForwardGeocode(destinationAddress);

  checkCoordinates(originCoords, destinationCoords, res);

  const journeyUuid = UUID();

  await JourneyModel.create({
    id: journeyUuid,
    origin: {
      address: originAddress,
      coordinates: {
        longtitude: (originCoords as Coordinates).longtitude,
        latitude: (originCoords as Coordinates).latitude,
      },
    },
    destination: {
      address: destinationAddress,
      coordinates: {
        longtitude: (destinationCoords as Coordinates).longtitude,
        latitude: (destinationCoords as Coordinates).latitude,
      },
    },
  });

  res.status(201).send({ id: journeyUuid });
};

export const getJourneys: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const journeys = await JourneyModel.find();

  res.send({ journeys });
};

export const getSpecificJourney: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const journey = await JourneyModel.findOne({ id: req.params.journeyId });

  if (journey === null) {
    res.status(404).send('could not find queried journey');
    return;
  }

  res.send(journey);
};

export const updateJourney: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const journey = await JourneyModel.findOne({ id: req.params.journeyId });

  if (!journey) {
    return res.status(400).send('could not find queried journey');
  }

  if (req.body.originAddress) {
    Object.keys(req.body.originAddress).forEach((key) => {
      journey.origin.address[key as keyof Address] =
        req.body.originAddress[key as keyof Address];
    });
  }

  if (req.body.destinationAddress) {
    Object.keys(req.body.destinationAddress).forEach((key) => {
      journey.destination.address[key as keyof Address] =
        req.body.destinationAddress[key as keyof Address];
    });
  }

  const originCoords = await ForwardGeocode(journey.origin.address);
  const destinationCoords = await ForwardGeocode(journey.destination.address);

  checkCoordinates(originCoords, destinationCoords, res);

  journey.origin.coordinates = originCoords as Coordinates;
  journey.destination.coordinates = destinationCoords as Coordinates;

  await JourneyModel.updateOne(
    { id: req.params.journeyId },
    {
      $set: journey,
    }
  );

  res.status(200).send({ id: journey.id });
};
