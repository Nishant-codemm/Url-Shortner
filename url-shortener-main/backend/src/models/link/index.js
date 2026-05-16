const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  fullUrl: { type: String, required: true },

  slug: { type: String, required: true, unique: true },        // for /abc123
  userSlug: { type: String, unique: true, sparse: true },       // for /u/customslug

  clicks: { type: Number, default: 0 },
  expiredDate: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
  isExpired: { type: Boolean, default: false }
}, { timestamps: true });

const Link = mongoose.model("link", linkSchema);
module.exports = { Link };
