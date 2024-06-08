import ErrorHandler from "./error.js";

const isAdminAuthenticated = async (req, res, next) => {
  const user = req.user;
  // console.log(user);
  if (user.role !== 'admin') {
    return next(new ErrorHandler('User must have admin privileges', 400));
  }

  next();
}

export default isAdminAuthenticated;