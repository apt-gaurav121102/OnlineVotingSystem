import User from "../models/User.js";
import Candidate from "../models/Candidate.js";
import Vote from "../models/Vote.js";

export const vote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { candidateId, electionId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.hasVoted) return res.status(400).json({ message: 'User already voted' });

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    const vote = new Vote({ voter: userId, candidate: candidateId, election: electionId });
    await vote.save();

    candidate.voteCount = (candidate.voteCount || 0) + 1;
    await candidate.save();

    user.hasVoted = true;
    await user.save();

    res.json({ message: 'Vote recorded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
