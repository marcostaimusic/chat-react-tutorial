const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  const payload = { uid };

  const token = jwt.sign(payload, process.env.JWTPRIVATEKEY, {
    expiresIn: "24h",
  });

  return token;
};

//from the socket's handshake
const verifyJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWTPRIVATEKEY);
    return [true, uid];
  } catch (err) {
    return [false];
  }
};

module.exports = { generateJWT, verifyJWT };
