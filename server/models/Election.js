import mongoose from "mongoose";

const ElectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Election', ElectionSchema);
