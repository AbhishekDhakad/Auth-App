import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { CustomErrorHandler } from "../middlewares/ErrorHandler.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if(!validUser) return next(CustomErrorHandler(404, "User not found"));
    const isValidPassword = bcryptjs.compareSync(password, validUser.password);
    if(!isValidPassword) return next(CustomErrorHandler(401, 'wrong credentials'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true, maxAge: 86400000 }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
