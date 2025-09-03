const express = require('express');
const { body, validationResult } = require('express-validator');
const Waitlist = require('../models/Waitlist');
const { generalLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Validation rules
const waitlistValidation = [
  body('firstName').trim().isLength({ min: 1, max: 50 }).withMessage('First name is required and must be less than 50 characters'),
  body('lastName').trim().isLength({ min: 1, max: 50 }).withMessage('Last name is required and must be less than 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('consent').isBoolean().withMessage('Consent must be accepted'),
  body('source').optional().isIn(['banner', 'newsletter', 'footer', 'popup']).withMessage('Invalid source')
];

// @route   POST /api/waitlist/join
// @desc    Join the waitlist
// @access  Public
router.post('/join', generalLimiter, waitlistValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, phone, consent, source = 'popup' } = req.body;

    // Check if email already exists in waitlist
    const existingEntry = await Waitlist.findOne({ email });
    if (existingEntry) {
      return res.status(400).json({
        success: false,
        message: 'This email is already on our waitlist'
      });
    }

    // Create new waitlist entry
    const waitlistEntry = new Waitlist({
      firstName,
      lastName,
      email,
      phone,
      consent,
      source
    });

    await waitlistEntry.save();

    res.status(201).json({
      success: true,
      message: 'Successfully joined the waitlist!',
      data: {
        id: waitlistEntry._id,
        firstName: waitlistEntry.firstName,
        lastName: waitlistEntry.lastName,
        email: waitlistEntry.email,
        source: waitlistEntry.source,
        joinedAt: waitlistEntry.createdAt
      }
    });
  } catch (error) {
    console.error('Waitlist join error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while joining waitlist'
    });
  }
});

// @route   GET /api/waitlist/stats
// @desc    Get waitlist statistics
// @access  Public
router.get('/stats', generalLimiter, async (req, res) => {
  try {
    const totalCount = await Waitlist.countDocuments();
    const pendingCount = await Waitlist.countDocuments({ status: 'pending' });
    const notifiedCount = await Waitlist.countDocuments({ status: 'notified' });
    const convertedCount = await Waitlist.countDocuments({ status: 'converted' });

    // Get recent signups (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentSignups = await Waitlist.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
      success: true,
      data: {
        total: totalCount,
        pending: pendingCount,
        notified: notifiedCount,
        converted: convertedCount,
        recentSignups
      }
    });
  } catch (error) {
    console.error('Waitlist stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching waitlist statistics'
    });
  }
});

// @route   GET /api/waitlist/check
// @desc    Check if email is on waitlist
// @access  Public
router.get('/check', generalLimiter, async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const entry = await Waitlist.findOne({ email });
    
    res.json({
      success: true,
      data: {
        isOnWaitlist: !!entry,
        entry: entry ? {
          firstName: entry.firstName,
          lastName: entry.lastName,
          email: entry.email,
          source: entry.source,
          status: entry.status,
          joinedAt: entry.createdAt
        } : null
      }
    });
  } catch (error) {
    console.error('Waitlist check error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while checking waitlist status'
    });
  }
});

module.exports = router;
