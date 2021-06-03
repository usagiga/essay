/* eslint-disable */

module.exports = (req, res, next) => {
  let authHeader = req.header("Authorization");
  if (!authHeader.startsWith("Bearer")) {
    return;
  }
  next();
}
