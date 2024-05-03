const jwt = require('jsonwebtoken')
const User = require('../auth/auth-model')
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
        next({ status: 401, message: "token invalid" });
      } else {
        req.decodedJWT = decoded;
        console.log(req.decodedJWT);
        next();
      }
    });
  } else {
    next({ status: 401, message: "token required" });
  }
};

const validUsernameAndPassword = async (req, res, next) => {
  const { username, password } = req.body

  const existing = await User.findBy({ username })
  if(existing) {
    next({ status: 401, message: 'username taken'})
  } else if ((!username || !password) || (!username && !password)) {
    next({ status: 401, message: 'username and password required'})
  } else {
    next()
  }
}

module.exports = {
  restricted,
  validUsernameAndPassword
}