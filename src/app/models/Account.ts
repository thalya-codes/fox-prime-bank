import mongoose, { Schema } from 'mongoose';

const AccountSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, required: true, default: 1000 },
}, { timestamps: true });

export const Account = mongoose.models.Account || mongoose.model('Account', AccountSchema);
