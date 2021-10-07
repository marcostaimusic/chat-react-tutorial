const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise(() => {
    const payload = { uid };

    jwt.sign(payload, process.env.JWTPRIVATEKEY);
  });
};

module.exports = { generateJWT };
