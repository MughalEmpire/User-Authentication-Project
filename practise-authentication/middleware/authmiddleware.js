const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({message: "NO token, authorization failed"});
}

try {
  const decoded =  jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded.userId;
  next();
} catch (error) {
    console.log('Error: Error message!');
    res.status(401).json({message: "Token is invalid!"});
}