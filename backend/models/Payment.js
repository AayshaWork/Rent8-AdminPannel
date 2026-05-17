const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ad_id: { type: String, required: true },
  amount: Number,
  plan_type: String, // "Standard" ya "Double"
  screenshots: [String],
  validity_days: Number,
  payment_status: { type: String, default: 'under_review' },
  submitted_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);