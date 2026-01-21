import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String },
  manifesto: { type: String },
  photoUrl: { type: String },
  voteCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Candidate', CandidateSchema);
