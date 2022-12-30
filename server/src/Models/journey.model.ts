import mongoose from 'mongoose';
import { Journey } from '../Types/journey.type';

const JourneySchema = new mongoose.Schema<Journey>({
  userLogin: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  origin: {
    place_name: { type: String, required: true },
    address: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      streetNumber: { type: String, required: false },
    },
    coordinates: {
      longtitude: { type: String, required: true },
      latitude: { type: String, required: true },
    },
  },
  destination: {
    place_name: { type: String, required: true },
    address: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      streetNumber: { type: String, required: false },
    },
    coordinates: {
      longtitude: { type: String, required: true },
      latitude: { type: String, required: true },
    },
  },
});

export default mongoose.model<Journey>('Journey', JourneySchema);
