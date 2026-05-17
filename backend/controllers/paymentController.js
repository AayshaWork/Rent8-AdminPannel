const Payment = require('../models/Payment');
const Property = require('../models/Property'); 

exports.submitPaymentProof = async (req, res) => {
  try {
    const { ad_id, amount, plan_type, validity_days } = req.body;
    const userId = req.user.id; // Token se aaya

    // 🚀 FIX 1: Pehle check karo ki ad_id database me hai ya nahi!
    const property = await Property.findOne({ ad_id: ad_id });
    
    if (!property) {
      return res.status(404).json({ 
        status: "error", 
        message: `Ad with ID ${ad_id} not found! Please check ad_id.` 
      });
    }

    // 🚀 FIX 2: Security Check - Kya yeh user usi ad ka owner hai?
    // Agar tera schema me user ka reference 'user_id' hai toh yeh logic zaroor lagana
    /*
    if (property.user_id.toString() !== userId) {
      return res.status(403).json({ 
        status: "error", 
        message: "You can only pay for your own properties!" 
      });
    }
    */

    // File check logic
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ status: "error", message: "At least one payment screenshot is required" });
    }

    // URL creation logic
    const screenshotUrls = req.files.map(file => 
      `http://10.245.248.242:5000/uploads/payments/${file.filename}`
    );

    // Payment DB me save karo
    const newPayment = new Payment({
      user_id: userId,
      ad_id: ad_id,
      amount: Number(amount),
      plan_type: plan_type,
      screenshots: screenshotUrls, 
      validity_days: Number(validity_days),
      payment_status: 'under_review'
    });

    await newPayment.save();

    // Property ka status update karo
    property.status = 'pending_approval';
    await property.save();

    res.status(200).json({
      status: "success",
      message: "Payment proof submitted successfully. Your ad will be live after admin verification.",
      data: {
        ad_id: ad_id,
        ad_status: "pending_approval",
        submitted_at: newPayment.submitted_at,
        uploaded_files_count: req.files.length 
      }
    });

  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ status: "error", message: "Server error while submitting payment" });
  }
};  