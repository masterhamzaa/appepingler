const jwt = require("jsonwebtoken");
require("dotenv").config()

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.json({ err: "Token Not Found" });
    console.log("Token not found");
    return;
  }
  jwt.verify(token,process.env.decodekey, (err, payload) => {
    if (err) {
      return res.json({ err: "Token Not Match" });
    } else {
      req.payload = payload;
      next();
    }
  });
};


module.exports = { verifyToken };
