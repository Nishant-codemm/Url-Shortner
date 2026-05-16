const mongoose = require("mongoose");

const clickSchema = mongoose.Schema(
  {
    linkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "link",
      required: true,
    },
    referrer: { type: String },
    deviceType: { type: String, required: true },
    browser: { type: String, required: true },
    geo: {
      range: Array,
      country: String,
      region: String,
      ll: Array,
    },
    os: { type: String, required: true },
    ipHash: { type: String, required: true },
  },
  { timestamps: true }
);

const Click = mongoose.model("click", clickSchema);

module.exports = { Click };
