import { verifyUser } from './../Middlewares/authenticate.middleware';
import express from 'express';
import {
  loginUser,
  registerUser,
  getUserData,
  logoutUser,
} from '../Controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.get('/user', verifyUser, getUserData);
userRouter.post('/logout', verifyUser, logoutUser);

export default userRouter;
