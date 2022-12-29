import mongoose from 'mongoose';
import { Journey } from '../Types/journey.type';

const JourneySchema = new mongoose.Schema<Journey>({
  id: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  origin: {
    address: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      streetNumber: { type: String, required: true },
    },
    coordinates: {
      longtitude: { type: String, required: true },
      latitude: { type: String, required: true },
    },
  },
  destination: {
    address: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      streetNumber: { type: String, required: true },
    },
    coordinates: {
      longtitude: { type: String, required: true },
      latitude: { type: String, required: true },
    },
  },
});

export default mongoose.model<Journey>('Journey', JourneySchema);
