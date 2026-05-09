const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true, // allow null for OTP users
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true, // important for OTP login users
    },

    profile_pic: String,

    role: {
      type: String,
      enum: ["user", "admin", "owner"],
      default: "user",
    },


    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE",
    },


    isPremium: {
      type: Boolean,
      default: false,
    },

    fcm_token: String,


    refreshToken: {
      type: String,
      default: null,
    },
unique_r8_id: {
    type: String,
    unique: true,
    sparse: true 
  },
  
    otp: {
      type: String,
    },

    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);


// 🔐 HASH PASSWORD
userSchema.pre("save", async function () {
  // If password isn't modified or doesn't exist, just return to move on
  if (!this.isModified("password") || !this.password) return;

  // Otherwise, hash the password
  this.password = await bcrypt.hash(this.password, 10);
});

// COMPARE PASSWORD (helper function)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);