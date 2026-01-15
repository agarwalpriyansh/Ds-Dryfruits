const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const buildToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name || '' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, adminSecret } = req.body;

    if (!email || !password) {
      return res.status(400).json('Error: email and password are required');
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json('Error: user already exists');
    }

    let finalRole = 'user';
    if (role === 'admin') {
      if (!process.env.ADMIN_SIGNUP_SECRET) {
        return res.status(400).json('Error: admin signup is disabled');
      }
      if (adminSecret !== process.env.ADMIN_SIGNUP_SECRET) {
        return res.status(403).json('Error: invalid admin secret');
      }
      finalRole = 'admin';
    }

    const user = new User({
      name,
      email: email.toLowerCase().trim(),
      password,
      role: finalRole,
    });

    await user.save();
    const token = buildToken(user);
    res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role, name: user.name } });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json('Error: ' + err.message);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json('Error: email and password are required');
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json('Error: invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json('Error: invalid credentials');
    }

    const token = buildToken(user);
    res.json({ token, user: { id: user._id, email: user.email, role: user.role, name: user.name } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json('Error: ' + err.message);
  }
});

// Google Login
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { name, email, sub: googleId, picture } = ticket.getPayload();

    if (!email) {
      return res.status(400).json('Error: Google account validation failed');
    }

    let user = await User.findOne({ email: email.toLowerCase().trim() });

    if (user) {
      // If user exists but doesn't have googleId, update it
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture;
        await user.save();
      }
    } else {
      // Create new user
      // Generate a random password for Google users as fallback
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      
      user = new User({
        name,
        email: email.toLowerCase().trim(),
        password: randomPassword, 
        googleId,
        avatar: picture,
        role: 'user'
      });
      await user.save();
    }

    const jwtToken = buildToken(user);
    res.json({ token: jwtToken, user: { id: user._id, email: user.email, role: user.role, name: user.name, avatar: user.avatar } });

  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(400).json('Error: ' + err.message);
  }
});

module.exports = router;


