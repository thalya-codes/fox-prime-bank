import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ['SEND', 'RECEIVE', 'DEPOSIT'], required: true },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  targetAccountId: { type: Schema.Types.ObjectId, ref: 'Account' }, 
}, { timestamps: true });


export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
