const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(401).json({ ok: false, msg: "No token provided" });
    }
    const { uid } = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.uid = uid;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

module.exports = validateJWT;
