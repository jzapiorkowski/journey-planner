import { User } from './../Types/user.type';
import mongoose from 'mongoose';
import { Token } from '../Types/token.type';

const RefreshTokenSchema = new mongoose.Schema<Token>({
  token: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
});

export default mongoose.model<Token>('RefreshToken', RefreshTokenSchema);
