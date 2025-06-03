import mongoose, { Schema } from 'mongoose';

export type TUser  =  {
  fullName: string;
  birthDate: Date;
  email: string;
  password: string;
  refreshToken: string | null;
  _id: string;
  acceptTerm: boolean
} & Document


const UserSchema = new Schema<TUser>({
  fullName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, default: null },
  acceptTerm: { type: Boolean, required: true, default: null },
});

export default mongoose.models.User || mongoose.model<TUser>('User', UserSchema);
