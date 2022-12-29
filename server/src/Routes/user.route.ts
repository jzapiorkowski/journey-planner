import { verifyUser } from './../Middlewares/authenticate.middleware';
import express from 'express';
import {
  loginUser,
  registerUser,
  getUserData,
} from '../Controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.get('/user', verifyUser, getUserData);

export default userRouter;
