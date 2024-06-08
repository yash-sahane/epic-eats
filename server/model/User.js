import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cartData: {
    type: Object,
    default: {}
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { minimize: false });

export const User = mongoose.model('user', userSchema);

export default User;