import jwt from "jsonwebtoken";

const generateTokenandCookie = (userId, res, req) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000, //ms
      httpOnly: true, //to awaid cross-site scripring attack xss-attack
      sameSite: "strict", // cross site request forgery attack csrf-attacks
      secure: process.env.NODE_ENV !== "development",
    });
  } catch (error) {
    console.log(error);
  }
};

export default generateTokenandCookie;
