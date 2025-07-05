import { ENV_MONGODB_URI } from '@/constants/envsConstants';
import mongoose from 'mongoose';


if (!ENV_MONGODB_URI) {
  throw new Error("Please define the ENV_MONGODB_URI environment variable.");
}

let cached = (global).mongoose;

if (!cached) {
  cached = (global).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(ENV_MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
