const jwt = require('jsonwebtoken')

/*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "shh", (err, decoded) => {
      if (err) {
        next({ status: 401, message: `token bad: ${err.message}` });
      } else {
        req.decodedJWT = decoded;
        console.log(req.decodedJWT);
        next();
      }
    });
  } else {
    next({ status: 401, message: "what no token?" });
  }
};

module.exports = {
  restricted
}