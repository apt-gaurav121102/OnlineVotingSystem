import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
  voter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Vote', VoteSchema);
