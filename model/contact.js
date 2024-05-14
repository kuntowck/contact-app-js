const mongoose = require("mongoose");

// membuat schema
const Contact = mongoose.model("Contact", {
  nama: {
    type: String,
    required: true,
  },
  notelp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

module.exports = Contact;