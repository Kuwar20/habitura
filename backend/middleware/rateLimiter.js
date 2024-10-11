const rateLimit = require('express-rate-limit');

// Rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, 
  message: 'Too many login attempts from this IP, please try again after 15 minutes.',
  handler: (req, res, next, options) => {
    console.log(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json({ error: options.message });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for signup
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, 
  message: 'Too many signup attempts from this IP, please try again later.',
  handler: (req, res, next, options) => {
    console.log(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json({ error: options.message });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter, signupLimiter };
