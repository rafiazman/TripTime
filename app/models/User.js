/** @format */
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    minlength: 1,
    unique: true,
    index: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    minlength: 6,
  },
  name: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
