import { Response } from 'express';
import { Coordinates, ErrorType } from './forwardGeocode';

export const checkCoordinates = async (
  originCoords: Coordinates | ErrorType,
  destinationCoords: Coordinates | ErrorType,
  res: Response
) => {
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
};
