import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true  
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['student', 'professor', 'admin'],
    default: 'student'
  },

  resetPasswordToken: {
    type: String,
    default: null
  },

  resetPasswordExpires: {
    type: Date,
    default: null
  }
});

export default mongoose.model('User', userSchema);