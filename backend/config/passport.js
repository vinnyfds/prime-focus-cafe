const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/oauth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ 
      $or: [
        { email: profile.emails[0].value },
        { oauthId: profile.id, oauthProvider: 'google' }
      ]
    });

    if (user) {
      // Update OAuth info if not set
      if (!user.oauthProvider) {
        user.oauthProvider = 'google';
        user.oauthId = profile.id;
        user.profilePicture = profile.photos[0]?.value;
        await user.save();
      }
      return done(null, user);
    }

    // Create new user
    user = new User({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      oauthProvider: 'google',
      oauthId: profile.id,
      profilePicture: profile.photos[0]?.value,
      isEmailVerified: true, // OAuth emails are pre-verified
      consent: true // Assume consent for OAuth users
    });

    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/oauth/facebook/callback",
  profileFields: ['id', 'emails', 'name', 'picture']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ 
      $or: [
        { email: profile.emails[0].value },
        { oauthId: profile.id, oauthProvider: 'facebook' }
      ]
    });

    if (user) {
      // Update OAuth info if not set
      if (!user.oauthProvider) {
        user.oauthProvider = 'facebook';
        user.oauthId = profile.id;
        user.profilePicture = profile.photos[0]?.value;
        await user.save();
      }
      return done(null, user);
    }

    // Create new user
    user = new User({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      oauthProvider: 'facebook',
      oauthId: profile.id,
      profilePicture: profile.photos[0]?.value,
      isEmailVerified: true, // OAuth emails are pre-verified
      consent: true // Assume consent for OAuth users
    });

    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// LinkedIn OAuth Strategy
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "/api/oauth/linkedin/callback",
  scope: ['r_liteprofile', 'r_emailaddress']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ 
      $or: [
        { email: profile.emails[0].value },
        { oauthId: profile.id, oauthProvider: 'linkedin' }
      ]
    });

    if (user) {
      // Update OAuth info if not set
      if (!user.oauthProvider) {
        user.oauthProvider = 'linkedin';
        user.oauthId = profile.id;
        user.profilePicture = profile.photos[0]?.value;
        await user.save();
      }
      return done(null, user);
    }

    // Create new user
    user = new User({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      oauthProvider: 'linkedin',
      oauthId: profile.id,
      profilePicture: profile.photos[0]?.value,
      isEmailVerified: true, // OAuth emails are pre-verified
      consent: true // Assume consent for OAuth users
    });

    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;
