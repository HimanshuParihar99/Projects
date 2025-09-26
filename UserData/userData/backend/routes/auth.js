import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import 'dotenv/config';
import process from 'process';

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public
router.post(
  '/signup',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6+ characters').isLength({ min: 6 }),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // Check if username is taken
      user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Username is already taken' }] });
      }

      // Create new user
      user = new User({ username, email, password });

      // Save to database
      await user.save();

      // Create JWT
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

export default (router);