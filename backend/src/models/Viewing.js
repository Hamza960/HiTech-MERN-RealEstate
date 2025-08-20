import mongoose from 'mongoose';

const viewingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true, index: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
  date: { type: Date, required: true, index: true },
  status: { type: String, enum: ['scheduled', 'completed', 'no-show'], default: 'scheduled', index: true },
  notes: { type: String }
}, { timestamps: true });

viewingSchema.index({ property: 1, client: 1, date: 1 });

export default mongoose.model('Viewing', viewingSchema);
