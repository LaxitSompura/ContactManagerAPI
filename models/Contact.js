// models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true, index: true },
  email: { type: String, required: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/] },
  phone: { type: String, trim: true },
  address1: { type: String, trim: true },
  address2: { type: String, trim: true },
  province: { type: String, trim: true },
  postcode: { type: String, trim: true },
  country: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
