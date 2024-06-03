import User from "../model/User.js";
import ErrorHandler from "./error.js";
import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return next(new ErrorHandler('User not authorized', 400));
  }

  const decodedId = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(decodedId.id);
  next();
}

export default isAuthenticated;