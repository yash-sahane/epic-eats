import ErrorHandler from "../middlewares/error.js";
import User from "../model/User.js";

export const addToCart = async (req, res, next) => {
  try {
    if (req.user) {
      const user = req.user;
      const itemId = req.body.itemId;
      const cartData = user.cartData;

      if (!cartData[itemId]) {
        cartData[itemId] = 1;
      } else {
        cartData[itemId] += 1;
      }

      // user.cartData = cartData;
      // await user.save();

      await User.findByIdAndUpdate(user._id, { cartData });

      return res.status(200).json({
        success: true,
        message: 'Item added to Cart',
        cartData: user.cartData
      })
    } else {
      return next(new ErrorHandler('User not authorized', 400));
    }
  } catch (e) {
    next(e);
  }
}

export const removeFromCart = async (req, res, next) => {
  try {
    if (req.user) {
      const user = req.user;
      const itemId = req.body.itemId;
      const cartData = user.cartData;

      if (!cartData[itemId]) {
        return next(new ErrorHandler('Item not found', 404));
      } else {
        cartData[itemId] -= 1;
        if (!cartData[itemId]) {
          delete cartData[itemId];
        }
      }

      await User.findByIdAndUpdate(user._id, { cartData });

      return res.status(200).json({
        success: true,
        message: 'Item removed from Cart',
        cartData: user.cartData
      })
    } else {
      return next(new ErrorHandler('User not authorized', 400));
    }
  } catch (e) {
    next(e);
  }
}

export const getCartData = async (req, res, next) => {
  try {
    if (req.user) {
      const user = req.user;
      const cartData = user.cartData;

      return res.status(200).json({
        success: 'true',
        cartData
      })
    } else {
      return next(new ErrorHandler('User not authorized', 400));
    }
  } catch (e) {
    next(e);
  }
}