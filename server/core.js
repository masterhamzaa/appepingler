const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.json({ err: "Token Not Found" });
    console.log("Token not found");
    return;
  }

  jwt.verify(token, "open", (err, payload) => {
    if (err) {
      return res.json({ err: "Token Not Match" });
    } else {
      req.payload = payload;
      next();
    }
  });
};


module.exports = { verifyToken };
