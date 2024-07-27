

import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  OTP: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // Expires in 5 minutes
});

const OtpModel = mongoose.model('Otp', otpSchema);

export default OtpModel;