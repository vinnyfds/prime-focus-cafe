const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// OAuth success handler
const handleOAuthSuccess = async (req, res) => {
  try {
    const user = req.user;
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${token}&success=true`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth success handler error:', error);
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?success=false&error=server_error`;
    res.redirect(redirectUrl);
  }
};

// OAuth failure handler
const handleOAuthFailure = (req, res) => {
  const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?success=false&error=auth_failed`;
  res.redirect(redirectUrl);
};

// Google OAuth routes
router.get('/google', authLimiter, passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/api/oauth/failure' }),
  handleOAuthSuccess
);

// Facebook OAuth routes
router.get('/facebook', authLimiter, passport.authenticate('facebook', {
  scope: ['email']
}));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/api/oauth/failure' }),
  handleOAuthSuccess
);

// LinkedIn OAuth routes
router.get('/linkedin', authLimiter, passport.authenticate('linkedin', {
  scope: ['r_liteprofile', 'r_emailaddress']
}));

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/api/oauth/failure' }),
  handleOAuthSuccess
);

// OAuth failure route
router.get('/failure', handleOAuthFailure);

// Get OAuth URLs for frontend
router.get('/urls', (req, res) => {
  res.json({
    success: true,
    data: {
      google: '/api/oauth/google',
      facebook: '/api/oauth/facebook',
      linkedin: '/api/oauth/linkedin'
    }
  });
});

module.exports = router;
