import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import RefreshTokenModel from '../Models/refreshToken.model';

export const verifyUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['auth-token'] as string;

  try {
    const refreshToken = await RefreshTokenModel.findOne({
      token,
    });

    console.log(refreshToken);

    if (refreshToken === null) {
      res.sendStatus(401);
      return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (error, user) => {
      if (error) {
        res.sendStatus(401);
        return;
      }

      // @ts-ignore
      req.body.user = { login: user.login };

      next();
    });
  } catch (error) {
    res.send(error);
  }
};
