import Stripe from "stripe"
import Order from "../model/Order.js";
import User from "../model/User.js";

export const placeOrder = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { items, amount, address } = req.body.orderData;
    const newOrder = await Order.create({
      userId: req.user._id, items, amount, address
    })
    await User.findByIdAndUpdate(req.user._id, { cartData: {} });

    const lineItems = items.map(item => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name
          },
          unit_amount: item.price * 100 * 80
        },
        quantity: item.quantity
      }
    })

    lineItems.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery Charges'
        },
        unit_amount: 2 * 100 * 80
      },
      quantity: 1
    })

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URI}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URI}/verify?success=false&orderId=${newOrder._id}`
    })

    return res.json({ success: true, message: 'Order placed successfully', orderData: newOrder, session_url: session.url });
  } catch (e) {
    next(e)
  }
}

export const verifyOrder = async (req, res, next) => {
  const { orderId, success } = req.body;

  try {
    if (success === 'true') {
      await Order.findByIdAndUpdate(orderId, { payment: true })
      return res.json({ success: true, message: 'Payment successful' });
    } else {
      await Order.findOneAndDelete(orderId);
      return res.json({ success: false, message: 'Payment unsuccessful' });
    }
  } catch (e) {
    next(e);
  }
}

export const fetchOrders = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const orders = await Order.find({ userId });
    return res.json({
      success: true,
      orderData: orders
    })
  } catch (e) {
    next(e);
  }
}

export const fetchOrdersAdmin = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    return res.json({
      success: true,
      orderData: orders
    })
  } catch (e) {
    next(e);
  }
}

export const updateOrderStatus = async (req, res, next) => {
  const { orderId, status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(orderId, { status });
    return res.json({
      success: true,
      message: 'Order status updated successfully',
      newOrder: order
    })
  } catch (e) {
    next(e);
  }
}