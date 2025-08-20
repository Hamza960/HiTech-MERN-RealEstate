import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  phone: { type: String },
  message: { type: String },
  interestedProperty: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true, index: true },
  processed: { type: Boolean, default: false, index: true },
}, { timestamps: true });

export default mongoose.model('Client', clientSchema);
