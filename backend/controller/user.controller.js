import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    if (!filteredUsers) {
      res.status(400).json({
        error: "first one here",
      });
    }
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("getuser:", error.message);
  }
};
