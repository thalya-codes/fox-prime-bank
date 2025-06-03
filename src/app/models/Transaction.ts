import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  nature: { type: String, enum: ['TRANSFER'], required: true },
  direction: { type: String, enum: ['INCOMING', 'OUTGOING'], required: true },
  description: { type: String, required: false },
  
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  senderName: { type: String, required: true },
  
  receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
  receiverName: { type: String },
  
}, { timestamps: true });


export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
