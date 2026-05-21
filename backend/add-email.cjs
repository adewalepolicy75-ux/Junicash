const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  `const bcrypt = require('bcryptjs');`,
  `const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const otpStore = {};

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'JuniCash Email Verification',
    html: '<div style="font-family:sans-serif;max-width:400px;margin:0 auto;padding:2rem;background:#f5f3ff;border-radius:16px"><h2 style="color:#6d28d9">JuniCash</h2><p>Your verification code is:</p><h1 style="font-size:2.5rem;letter-spacing:0.2em;color:#0a0a0f;background:#ffffff;padding:1rem;border-radius:12px;text-align:center">' + otp + '</h1><p style="color:#9ca3af;font-size:0.85rem">This code expires in 10 minutes.</p></div>'
  });
};`
);

server = server.replace(
  `app.post('/api/auth/signup', async (req, res) => {`,
  `app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 };
    await sendOTP(email, otp);
    res.json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const stored = otpStore[email];
    if (!stored) return res.status(400).json({ message: 'No OTP found. Please request again.' });
    if (Date.now() > stored.expires) return res.status(400).json({ message: 'OTP expired. Please request again.' });
    if (stored.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    delete otpStore[email];
    res.json({ message: 'OTP verified' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/signup', async (req, res) => {`
);

fs.writeFileSync('server.js', server);
console.log('done');
