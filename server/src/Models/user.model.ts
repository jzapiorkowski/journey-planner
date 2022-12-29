import { User } from './../Types/user.type';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<User>({
  login: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<User>('User', UserSchema);
