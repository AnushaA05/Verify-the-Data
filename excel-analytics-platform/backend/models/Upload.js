const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  userId: {
    type: String, // or mongoose.Schema.Types.ObjectId if you prefer
    required: true,
  },
  name: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Upload", uploadSchema);


