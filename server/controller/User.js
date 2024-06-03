import validator from "validator";
import User from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ErrorHandler from "../middlewares/error.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler(`User doesn't exists`, 404));
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(new ErrorHandler(`Invalid Credentials`, 401));
    }
    return res.json({
      success: true,
      message: 'User loggedin successfully',
      token: createToken(user._id)
    })
  } catch (e) {
    console.log(e);
    next(e)
  }
}

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler(`User already exists`, 400));
    } else {
      if (!validator.isEmail(email)) {
        return next(new ErrorHandler(`Email is not valid`, 400));

      } else if (password.length < 8) {
        return next(new ErrorHandler(`Please Enter strong password`, 400));
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      user = User.create({
        name, email, password: hashedPass
      })

      if (user) {
        return res.json({
          success: true,
          message: "User successfully registered",
          token: createToken(user._id)
        })
      } else {
        return next(new ErrorHandler(`Something went wrong`, 400));
      }
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
}

export { login, register };