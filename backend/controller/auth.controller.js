import zod from "zod";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import generateTokenandCookie from "../utils/generattoken.js";

const signupSchema = zod.object({
  fullName: zod.string(),
  userName: zod.string().email(),
  password: zod.string().min(7),
  confirmPassword: zod.string().min(7),
  gender: zod.string().nullable(),
});
export const signUp = async (req, res) => {
  try {
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        error: "enter all fields correctly",
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(411).json({
        error: "password does not match",
      });
    }
    const user = await User.findOne({ userName: req.body.userName });
    if (user) {
      return res.status(404).json({
        error: "user already exists",
      });
    }

    ///Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${req.body.userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${req.body.userName}`;
    const newUser = await User.create({
      userName: req.body.userName,
      password: hashedPassword,
      fullName: req.body.fullName,
      gender: req.body.gender,
      profilePic: req.body.gender == "male" ? boyProfilePic : girlProfilePic,
    });

    //await newUser.save();

    if (newUser) {
      generateTokenandCookie(newUser._id, res);
    }

    res.status(200).json({
      id: newUser._id,
      fullName: newUser.fullName,
      profilepic: newUser.profilePic,
    });
  } catch (error) {
    console.log("error message:", error.message);
    res.status(500).json({
      error: "eror",
    });
  }
};
const loginSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string().min(7),
});
export const logIn = async (req, res) => {
  try {
    const { success } = loginSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        error: "invalid inputs",
      });
    }
    const user = await User.findOne({
      userName: req.body.userName,
    });
    const passCheck = await bcrypt.compare(
      req.body.password,
      user?.password || ""
    );
    //and
    if (!user || !passCheck) {
      return res.status(401).json({ error: "invalid username or password" });
    }
    //this is more ooptimal
    generateTokenandCookie(user._id, res, req);

    res.status(200).json({
      userName: user.userName,
      fullName: user.fullName,
      _id: user.id,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("1", error.message);

    res.status(500).json({
      error: "internal server error",
    });
    console.log("2", error.message);
  }
};

export const logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  try {
    res.status(200).json({ msg: "logged out successfully" });
  } catch (error) {
    // This catch block will never execute because res.cookie and res.status don't throw errors synchronously.

    res.status(500).json({
      error: "internal server error",
    });
    console.log(error);
  }
};
