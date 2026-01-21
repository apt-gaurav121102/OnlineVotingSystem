import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import Admin from "../models/Admin.js";

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

const nameRegex = /^[A-Za-z\s]{3,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email and password required.' });

    if (!nameRegex.test(name))
      return res.status(400).json({ message: 'Invalid name. Use only letters and spaces (3–50 chars).' });

    if (!emailRegex.test(email))
      return res.status(400).json({ message: 'Invalid email format.' });

    if (!passwordRegex.test(password))
      return res.status(400).json({
        message:
          'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.',
      });

    const Model = role === 'admin' ? Admin : User;
    const exists = await Model.findOne({ email });
    if (exists)
      return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, saltRounds);
    const doc = new Model({ name, email, password: hashed, role });
    await doc.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required.' });

    if (!emailRegex.test(email))
      return res.status(400).json({ message: 'Invalid email format.' });

    const Model = role === 'admin' ? Admin : User;
    const user = await Model.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { id: user._id.toString(), role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
