import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: { type: String },
  price: { type: Number, required: true, index: true },
  type: { type: String, enum: ['sale', 'rent'], required: true, index: true },
  location: { type: String, required: true, index: true },
  bedrooms: { type: Number, index: true },
  bathrooms: { type: Number, index: true },
  area: { type: Number, index: true }, // in sqft
  amenities: [{ type: String, index: true }],
  images: [{ type: String }],
  isActive: { type: Boolean, default: true, index: true },
  archivedAt: { type: Date, default: null },
}, { timestamps: true });

// compound index to support common queries
propertySchema.index({ isActive: 1, price: 1, bedrooms: 1, bathrooms: 1, area: 1 });
propertySchema.index({ location: 'text', title: 'text', description: 'text' });

export default mongoose.model('Property', propertySchema);
