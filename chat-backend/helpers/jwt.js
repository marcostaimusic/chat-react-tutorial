const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  const payload = { uid };

  const token = jwt.sign(payload, process.env.JWTPRIVATEKEY, {
    expiresIn: "24h",
  });

  return token;
};

module.exports = { generateJWT };
