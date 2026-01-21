import Candidate from "../models/Candidate.js";

export const createCandidate = async (req, res) => {
  try {
    const c = new Candidate(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCandidates = async (req, res) => {
  try {
    const list = await Candidate.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!candidate) return res.status(404).json({ message: 'Not found' });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
