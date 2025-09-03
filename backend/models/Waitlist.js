const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    default: null
  },
  consent: {
    type: Boolean,
    required: true,
    default: false
  },
  source: {
    type: String,
    enum: ['banner', 'newsletter', 'footer', 'popup'],
    default: 'popup'
  },
  status: {
    type: String,
    enum: ['pending', 'notified', 'converted'],
    default: 'pending'
  },
  notifiedAt: {
    type: Date,
    default: null
  },
  convertedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for efficient queries
waitlistSchema.index({ email: 1 });
waitlistSchema.index({ status: 1 });
waitlistSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Waitlist', waitlistSchema);
