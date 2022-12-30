import UserModel from '../Models/user.model';
import { User } from '../Types/user.type';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as UUID } from 'uuid';
import RefreshTokenModel from '../Models/refreshToken.model';
import bcrypt from 'bcrypt';

export const loginUser: RequestHandler = async (
  req: Request<any, any, User>,
  res: Response,
  next: NextFunction
) => {
  const { login, password } = req.body;

  const user = await UserModel.findOne({
    login,
  });

  if (user === null) {
    res.sendStatus(404);
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(403).send({ message: 'login or password is incorrect' });
    return;
  }

  const token = jwt.sign(
    { id: user.id, login: user.login, password: user.password },
    process.env.ACCESS_TOKEN_SECRET || '',
    {
      expiresIn: '3h',
    }
  );

  await RefreshTokenModel.create({
    token,
  });

  res.status(200).send({ token });
};

export const registerUser: RequestHandler = async (
  req: Request<any, any, User>,
  res: Response,
  next: NextFunction
) => {
  const { login, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userUuid = UUID();

  try {
    const user = await UserModel.create({
      id: userUuid,
      login: login,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user.id, login: user.login, password: user.password },
      process.env.ACCESS_TOKEN_SECRET || '',
      {
        expiresIn: '3h',
      }
    );

    await RefreshTokenModel.create({
      token,
    });

    res.json({ token });
  } catch (error) {
    res.status(400).send('user already exists');
  }
};

export const getUserData: RequestHandler = async (
  req: Request<any, any, { user: Partial<User> }>,
  res: Response,
  next: NextFunction
) => {
  const { login } = req.body.user;

  const user = await UserModel.findOne({
    login,
  });

  if (user === null) {
    res.sendStatus(404);
    return;
  }

  res.status(200).send({ login: user.login });
};

export const logoutUser: RequestHandler = async (
  req: Request<any, any, { user: Partial<User> }>,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['auth-token'] as string;

  const deleteResponse = await RefreshTokenModel.deleteOne({
    token,
  });

  if (!deleteResponse.deletedCount) {
    res.sendStatus(400);
    return;
  }

  res.sendStatus(200);
};
