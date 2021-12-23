const jwt = require("jsonwebtoken");
let secret = "secret";
const jwtEncoder = (encodeObject = {}, expireIn = "1h") => {
  return jwt.sign({ ...encodeObject }, secret, {
    expiresIn: expireIn,
    algorithm: "RS256",
  });
};

const jwtDecoder = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { decoded, success: true };
  } catch (err) {
    return { err, success: false };
  }
};

module.exports = {
  jwtEncoder,
  jwtDecoder,
};
