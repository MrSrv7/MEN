import { compare, genSalt, hash } from "bcryptjs";
import UserModel from "../models/userModel";
import constants from "../constants.json";
import { sign } from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName)
      return res
        .status(417)
        .json({ error: constants.server.error.requiredFieldMissing });

    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser)
      return res
        .status(409)
        .json({ error: constants.db.user.userAlreadyExists });

    const totalUser = await UserModel.find();
    if (process.env.ENV === "DEVELOPMENT" && totalUser.length > 4) {
      return res.status(403).json({ error: constants.db.limit });
    }
    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    const newUser = new UserModel({
      email,
      password: passwordHash,
      fullName,
    });

    const savedUser = await newUser.save();
    const token = sign(
      { id: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: constants.auth.expiresIn,
      }
    );
    return res.status(201).json({
      msg: constants.db.user.regUser,
      token,
      savedUser: {
        id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: constants.server.error.unexpected,
      info: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(417)
        .json({ error: constants.server.error.requiredFieldMissing });

    const user = await UserModel.findOne({ email: email });
    if (!user)
      return res.status(404).json({ error: constants.mongodb.user.noUser });

    const isMatch = await compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ error: constants.server.error.invalidCredentials });

    const token = sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: constants.auth.expiresIn,
      }
    );
    res.status(200).json({
      info: constants.db.user.loginUser,
      token,
      user: {
        id: user._id,
        "Full Name": user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const allUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    if (allUsers.length > 0)
      return res
        .status(200)
        .json({ info: "Users fetched Successfully", allUsers });
    if (allUsers.length <= 0)
      return res.status(404).json({ info: "No Users Found" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const myAccount = async (req, res) => {
  try {
    if (req.user) {
      const myAccount = await UserModel.findById(req.user.id);
      if (myAccount) return res.status(200).json({ info: myAccount });
      if (!myAccount)
        return res.status(404).json({ error: constants.mongodb.user.noUser });
    }
  } catch (err) {
    return res.status(500).json({
      error: constants.server.error.unexpected,
      info: err.message,
    });
  }
};
