import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const verifyUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['auth-token'] as string;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (error, user) => {
    if (error) {
      res.sendStatus(401);
      return;
    }

    // @ts-ignore
    req.body.user = { login: user.login };

    next();
  });
};
