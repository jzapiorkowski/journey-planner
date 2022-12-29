import { Journey, Address } from './../Types/journey.type';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { v4 as UUID } from 'uuid';
import ForwardGeocode from '../Utils/forwardGeocode';

const journeys: (Journey & { id: string })[] = [];

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

  if (
    'status' in originCoords &&
    'status' in destinationCoords &&
    originCoords.status === 404
  ) {
    res
      .status(originCoords.status)
      .send(`${originCoords.message} origin and destination`);
    return;
  }

  if ('status' in originCoords && 'status' in destinationCoords) {
    res.status(originCoords.status).send(originCoords.message);
    return;
  }

  if ('status' in originCoords) {
    if (originCoords.status === 404) {
      res.status(originCoords.status).send(`${originCoords.message} origin`);
      return;
    }

    res.status(originCoords.status).send(originCoords.message);
    return;
  }

  if ('status' in destinationCoords) {
    if (destinationCoords.status === 404) {
      res
        .status(destinationCoords.status)
        .send(`${destinationCoords.message} destination`);
      return;
    }

    res.status(destinationCoords.status).send(destinationCoords.message);
    return;
  }

  const journeyUuid = UUID();

  journeys.push({
    id: journeyUuid,
    origin: {
      address: originAddress,
      coordinates: {
        longtitude: originCoords.longtitude,
        latitude: originCoords.latitude,
      },
    },
    destination: {
      address: destinationAddress,
      coordinates: {
        longtitude: destinationCoords.longtitude,
        latitude: destinationCoords.latitude,
      },
    },
  });

  res.status(201).send(JSON.stringify(journeys[journeys.length - 1]));
};

export const getJourneys: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send({ journeys });
};
