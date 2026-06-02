import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ error: "Email exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  res.json({
    user,
    token: generateToken(user._id)
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "Not found" });

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) return res.status(401).json({ error: "Wrong password" });

  res.json({
    user,
    token: generateToken(user._id)
  });
};
