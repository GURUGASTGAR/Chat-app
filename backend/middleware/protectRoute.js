import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "unauthorized:token not provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "unauthorized:invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "user doesnot exist" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(411).json({
      error: "internal Srever error",
    });
  }
};

export default protectRoute;
